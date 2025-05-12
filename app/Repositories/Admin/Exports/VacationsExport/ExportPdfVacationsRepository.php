<?php

namespace App\Repositories\Admin\Exports\VacationsExport;

use App\Models\Clock;
use App\Models\Vacation;
use Illuminate\Database\Eloquent\Collection;

class ExportPdfVacationsRepository
{
    public function getVacationsExportData(int $userId, string $startDate, string $endDate): Collection
    {
        return Vacation::query()->where('user_id', $userId)
            ->whereDate('created_at', '>=', $startDate)
            ->whereDate('created_at', '<=', $endDate)
            ->orderBy('created_at')
            ->get();
    }
}
