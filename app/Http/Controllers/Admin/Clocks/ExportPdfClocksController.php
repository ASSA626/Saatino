<?php

namespace App\Http\Controllers\Admin\Clocks;

use App\Http\Controllers\Controller;

class ExportPdfClocksController extends Controller
{
    public function __construct(
        protected \App\Services\Admin\Exports\Clocks\ExportPdfClocksService $reportService
    ){}

    public function generateTimesheetReport(): void
    {
        $this->reportService->exportClocksReport(1);
    }
}
