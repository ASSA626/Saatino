<?php

namespace App\Services\Admin\Exports\VacationsExports;

use App\Actions\VacationReportDataAction;
use App\Helper\CurrentJalaliMonth;
use App\Helper\DateConverterHelper;
use App\Repositories\Admin\Exports\VacationsExport\ExportPdfVacationsRepository;
use App\Services\Admin\Users\UsersManageService;
use App\Services\Service;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;
use Spatie\Browsershot\Browsershot;
use Spatie\LaravelPdf\Enums\Format;
use Spatie\LaravelPdf\PdfBuilder;
use function Spatie\LaravelPdf\Support\pdf;

class ExportPdfVacationsService extends Service
{
    public function __construct(
        protected UsersManageService $usersManageService,
        protected VacationReportDataAction  $vacationReportDataAction,
        protected ExportPdfVacationsRepository $exportPdfVacationsRepository
    ){}

    public function exportVacationsReport(int $userId, ?string $startDate = null, ?string $endDate = null): PdfBuilder
    {
        $dateRange = $this->getDateRange($startDate, $endDate);

        $startDateGregorian = $dateRange['start_date'];
        $endDateGregorian = $dateRange['end_date'];

        $format = 'a4';
        $user = $this->usersManageService->getUserById($userId);

        $vacations_data = $this->exportPdfVacationsRepository->getVacationsExportData($userId, $startDateGregorian, $endDateGregorian);
        $vacations_report = $this->vacationReportDataAction->execute($userId, $startDateGregorian, $endDateGregorian);

        return $this->generatePdf($user, $startDateGregorian, $endDateGregorian, $vacations_data, $vacations_report, $format);
    }

    protected function getDateRange(?string $startDate = null, ?string $endDate = null): array
    {
        if (!$startDate || !$endDate) {
            $currentMonth = CurrentJalaliMonth::getCurrentMonth();

            $startDate = $currentMonth['start_date'];
            $endDate = $currentMonth['end_date'];
        }

        $startDateGregorian = DateConverterHelper::shamsi_to_miladi($startDate);
        $endDateGregorian = DateConverterHelper::shamsi_to_miladi($endDate);

        return [
            'start_date' => $startDateGregorian,
            'end_date' => $endDateGregorian
        ];
    }

    protected function generatePdf($user, string $start_date, string $end_date, Collection $vacations, array $vacation_report, string $format): PdfBuilder
    {
        $pdf_name = ($start_date.$end_date.$user->name.Str::random(5) . '.pdf');
        return pdf()->view('pdf.vacations-report', compact('user', 'start_date', 'end_date', 'vacations', 'vacation_report', 'format'))
            ->withBrowsershot(function (Browsershot $browsershot) {
                $browsershot->noSandbox();
                $browsershot->setChromePath("C:\Users\win 10\.cache\puppeteer\chrome\win64-132.0.6834.110\chrome-win64\chrome.exe");
            })
            ->format($format === 'a4' ? Format::A4 : Format::A5)
            ->name($pdf_name)
            ->download();
    }
}
