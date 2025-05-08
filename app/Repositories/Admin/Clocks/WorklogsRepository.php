<?php

namespace App\Repositories\Admin\Clocks;


use App\Models\Worklog;
use Illuminate\Support\Collection;

class WorklogsRepository
{
    public function getWorklogsExportData(array $clockIds): Collection
    {
        return Worklog::query()->whereIn('clock_id', $clockIds)->with('project')->get();
    }

    public function createMany(array $worklogs): Collection
    {
        return collect($worklogs)->map(function ($worklog) {
            return Worklog::query()->create($worklog);
        });
    }

    public function deleteByClockId(int $clockId): bool
    {
        return Worklog::query()->where('clock_id', $clockId)->delete();
    }
}
