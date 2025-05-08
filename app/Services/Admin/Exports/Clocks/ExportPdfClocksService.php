<?php

namespace App\Services\Admin\Exports\Clocks;

use App\Actions\VacationReportDataAction;
use App\Helper\CurrentJalaliMonth;
use App\Helper\DateConverterHelper;
use App\Services\Admin\Users\UsersManageService;
use App\Repositories\Admin\Exports\Clocks\ExportPdfClocksRepository;
use Carbon\Carbon;
use Hekmatinasser\Verta\Verta;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ExportPdfClocksService
{
    public function __construct(
        protected ExportPdfClocksRepository $exportPdfClocksRepository,
        protected UsersManageService        $usersManageService,
        protected VacationReportDataAction  $vacationReportDataAction,
    ){}

    public function exportClocksReport(int $userId, ?string $startDate = null, ?string $endDate = null)
    {
        [$startDate, $endDate] = $this->resolveDateRange($startDate, $endDate);
        $startGeo = DateConverterHelper::shamsi_to_miladi($startDate);
        $endGeo = DateConverterHelper::shamsi_to_miladi($endDate);

        $user = $this->usersManageService->getUserById($userId);
        $clocks = $this->exportPdfClocksRepository
            ->getClocksExportData($userId, $startGeo, $endGeo)
            ->groupBy(fn($item) => Carbon::parse($item->created_date)->format('Y-m-d'));

        $report = $this->prepareReportData($clocks, $startGeo, $endGeo);
        $projectReport = $this->projectWorklog($clocks);
        $vacationReport = $this->vacationReportDataAction->execute($userId, $startDate, $endDate);

        dd($user, $report, $startDate, $endDate, $projectReport, $vacationReport);
        // return $this->generatePdf($user, DateConverterHelper::miladi_to_shamsi($startDate), DateConverterHelper::miladi_to_shamsi($endDate), $report);
    }

    protected function resolveDateRange(?string $start, ?string $end): array
    {
        if (!$start || !$end) {
            $jalali = CurrentJalaliMonth::getCurrentMonth();
            $start = $jalali['start_date'];
            $end = $jalali['end_date'];
        }
        return [$start, $end];
    }

    protected function prepareReportData(Collection $clocksByDate, string $startDate, string $endDate): array
    {
        $reportData = [];
        $period = new \DatePeriod(new \DateTime($startDate), new \DateInterval('P1D'), (new \DateTime($endDate))->modify('+1 day'));
        foreach ($period as $date) {
            $dateStr = $date->format('Y-m-d');
            $dayClocks = $clocksByDate[$dateStr] ?? collect();

            $reportData[] = $this->generateDayEntry($dateStr, $dayClocks);
        }
        return $reportData;
    }

    protected function generateDayEntry(string $geoDate, Collection $dayClocks): array
    {
        $verta = Verta::parse($geoDate);
        $jalaliDate = $verta->format('Y/m/d');
        $dayName = $verta->formatWord('l');

        $entry = [
            'date' => $jalaliDate,
            'day' => $dayName,
            'first_entry' => '00:00',
            'first_exit' => '00:00',
            'second_entry' => '00:00',
            'second_exit' => '00:00',
            'total_hours' => '00:00',
        ];

        if ($dayClocks->isNotEmpty()) {
            $sorted = $dayClocks->sortBy('start_clock')->values();

            if ($sorted->get(0)) {
                $entry['first_entry'] = substr($sorted[0]->start_clock, 0, 5);
                $entry['first_exit'] = substr($sorted[0]->left_clock, 0, 5);
            }

            if ($sorted->get(1)) {
                $entry['second_entry'] = substr($sorted[1]->start_clock, 0, 5);
                $entry['second_exit'] = substr($sorted[1]->left_clock, 0, 5);
            }

            $totalMinutes = $dayClocks->sum('time_value');
            $entry['total_hours'] = sprintf('%02d:%02d', floor($totalMinutes / 60), $totalMinutes % 60);
        }

        return $entry;
    }

    protected function projectWorklog(Collection $clocks): array
    {
        $clockIds = $clocks->flatten()->pluck('id')->toArray();

        if (empty($clockIds)) {
            return [];
        }

        $worklogs = DB::table('worklogs')
            ->select('worklogs.project_id', 'projects.title as project_name', DB::raw('SUM(worklogs.time_value) as total_time'))
            ->join('projects', 'worklogs.project_id', '=', 'projects.id')
            ->whereIn('worklogs.clock_id', $clockIds)
            ->groupBy('worklogs.project_id', 'projects.title')
            ->get();

        $result = [];
        foreach ($worklogs as $worklog) {
            $totalMinutes = (int)$worklog->total_time;
            $formattedTime = sprintf('%02d:%02d', floor($totalMinutes / 60), $totalMinutes % 60);
            $result[$worklog->project_name] = $formattedTime;
        }

        return $result;
    }
}
