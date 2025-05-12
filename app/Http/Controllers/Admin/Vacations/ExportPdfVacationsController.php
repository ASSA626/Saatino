<?php

namespace App\Http\Controllers\Admin\Vacations;

use App\Http\Controllers\Controller;
use App\Services\Admin\Exports\VacationsExports\ExportPdfVacationsService;
use Illuminate\Http\Request;
use Spatie\LaravelPdf\PdfBuilder;

class ExportPdfVacationsController extends Controller
{
    public function __construct(
        protected ExportPdfVacationsService $reportService
    ){}

    public function generateVacationsReport(int $user_id, ?string $start_date = null, ?string $end_date = null): PdfBuilder
    {
        return $this->reportService->exportVacationReport($user_id, $start_date, $end_date);
    }
}
