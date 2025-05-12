<?php

namespace App\Repositories\Admin\Exports\ClocksExport;

use App\Models\Clock;
use Illuminate\Database\Eloquent\Collection;

class ExportPdfClocksRepository
{
    public function getClocksExportData(int $userId, string $startDate, string $endDate): Collection
    {
        return Clock::query()->where('user_id', $userId)
            ->whereDate('created_date', '>=', $startDate)
            ->whereDate('created_date', '<=', $endDate)
            ->orderBy('created_date')
            ->orderBy('start_clock')
            ->select([
                'id',
                'user_id',
                'start_clock',
                'left_clock',
                'time_value',
                'clock_type',
                'created_date'
            ])
            ->get();
    }
}
