<?php

namespace App\Services\Admin\Exports\VacationsExports;

use App\Actions\VacationReportDataAction;
use App\Helper\CalculateTimeDiff;
use App\Services\Admin\Users\UsersManageService;
use App\Services\Admin\Vacations\VacationManageService;
use App\Services\Service;
use Illuminate\Support\Str;
use Spatie\Browsershot\Browsershot;
use Spatie\LaravelPdf\Enums\Format;
use Spatie\LaravelPdf\PdfBuilder;
use function Spatie\LaravelPdf\Support\pdf;

class ExportPdfVacationByIdService extends Service
{
    public function __construct(
        protected VacationManageService $vacationManageService,
        protected UsersManageService $usersManageService,
        protected VacationReportDataAction $vacationReportDataAction
    ){}

    public function exportVacationReport(int $vacationId): PdfBuilder
    {
        $vacationData = $this->vacationManageService->getVacationById($vacationId);
        $user = $this->usersManageService->getUserById($vacationData->user_id);
        $vacationReport = $this->vacationReportDataAction->execute($user->id);
        $vacationDuration = $this->calculateVacation($vacationData);

        return $this->generatePdf($user, $vacationData, $vacationReport, $vacationDuration);
    }

    protected function calculateVacation($vacation): float|int|string
    {
        return CalculateTimeDiff::calculate($vacation->start_date, $vacation->end_date);
    }

    protected function generatePdf($user, $vacation, array $reportVacation, string|float|int $duration): PdfBuilder
    {
        $pdf_name = (' فرم مرخصی '.$user->name.$vacation->created_at.Str::random(2) . '.pdf');
        return pdf()->view('pdf.vacation-report', compact('user', 'vacation', 'reportVacation', 'duration'))
            ->withBrowsershot(function (Browsershot $browsershot) {
                $browsershot->noSandbox();
                $browsershot->setChromePath("C:\Users\win 10\.cache\puppeteer\chrome\win64-132.0.6834.110\chrome-win64\chrome.exe");
            })
            ->format(Format::A5)
            ->name($pdf_name)
            ->download();
    }
}
