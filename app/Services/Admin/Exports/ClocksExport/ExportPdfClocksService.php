<?php

namespace App\Services\Admin\Exports\ClocksExport;

use App\Actions\VacationReportDataAction;
use App\Helper\DateConverterHelper;
use App\Services\Admin\Users\UsersManageService;
use App\Repositories\Admin\Exports\ClocksExport\ExportPdfClocksRepository;
use App\Services\Service;
use Carbon\Carbon;
use Hekmatinasser\Verta\Verta;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Spatie\Browsershot\Browsershot;
use Spatie\LaravelPdf\Enums\Format;
use function Spatie\LaravelPdf\Support\pdf;
use Spatie\LaravelPdf\PdfBuilder;

class ExportPdfClocksService extends Service
{
    public function __construct(
        protected ExportPdfClocksRepository $exportPdfClocksRepository,
        protected UsersManageService        $usersManageService,
        protected VacationReportDataAction  $vacationReportDataAction,
    ){}

    public function exportClocksReport(int $userId, ?string $startDate = null, ?string $endDate = null): PdfBuilder
    {
        $format = 'a4';
        $user = $this->usersManageService->getUserById($userId);
        $clocks = $this->exportPdfClocksRepository
            ->getClocksExportData($userId, $startDate, $endDate)
            ->groupBy(fn($item) => Carbon::parse($item->created_date)->format('Y-m-d'));

        $report = $this->prepareReportData($clocks, $startDate, $endDate);
        $projectReport = $this->projectWorklog($clocks);
        $vacationReport = $this->vacationReportDataAction->execute($userId, $startDate, $endDate);
        return $this->generatePdf($user, $startDate, $endDate, $report, $projectReport, $vacationReport, $format);
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
            $hoursDecimal = round($totalMinutes / 60, 1);

            $result[] = [
                'project' => $worklog->project_name,
                'time' => $hoursDecimal
            ];
        }

        return $result;
    }

    protected function generatePdf($user, string $start_date, string $end_date, array $reports, array $projects, array $vacations, string $format): PdfBuilder
    {
        $pdf_name = ($start_date.$end_date.$user->name.Str::random(5) . '.pdf');
        return pdf()->view('pdf.clock-report', compact('user', 'start_date', 'end_date', 'reports', 'projects', 'vacations', 'format'))
            ->withBrowsershot(function (Browsershot $browsershot) {
                $browsershot->noSandbox();
                $browsershot->setChromePath("C:\Users\win 10\.cache\puppeteer\chrome\win64-132.0.6834.110\chrome-win64\chrome.exe");
            })
            ->format($format === 'a4' ? Format::A4 : Format::A5)
            ->name($pdf_name)
            ->download();
    }
}
