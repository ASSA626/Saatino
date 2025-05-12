<?php

namespace App\Http\Controllers\Admin\Clocks;

use App\Http\Controllers\Controller;
use App\Services\Admin\Exports\ClocksExport\ExportPdfClocksService;
use Spatie\LaravelPdf\PdfBuilder;

class ExportPdfClocksController extends Controller
{
    public function __construct(
        protected ExportPdfClocksService $reportService
    ){}

    public function generateTimesheetReport(int $user_id, ?string $start_date, ?string $end_date): PdfBuilder
    {
        return $this->reportService->exportClocksReport($user_id, $start_date, $end_date);
    }
}
