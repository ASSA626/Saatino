<?php

namespace App\Http\Controllers\Admin\Vacations;

use App\Http\Controllers\Controller;
use App\Services\Admin\Exports\VacationsExports\ExportPdfVacationByIdService;
use App\Services\Admin\Exports\VacationsExports\ExportPdfVacationsService;
use Illuminate\Http\Request;
use Spatie\LaravelPdf\PdfBuilder;

class ExportPdfVacationsController extends Controller
{
    public function __construct(
        protected ExportPdfVacationsService $exportPdfVacationsService,
        protected ExportPdfVacationByIdService $exportPdfVacationByIdService
    ){}

    public function generateVacationsReport(int $user_id, ?string $start_date = null, ?string $end_date = null): PdfBuilder
    {
        return $this->exportPdfVacationsService->exportVacationsReport($user_id, $start_date, $end_date);
    }

    public function generateVacationReportById(int $vacation_id): PdfBuilder
    {
        return $this->exportPdfVacationByIdService->exportVacationReport($vacation_id);
    }
}
