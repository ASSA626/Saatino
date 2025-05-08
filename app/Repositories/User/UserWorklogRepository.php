<?php

namespace App\Repositories\User;

use App\Models\Worklog;
use Illuminate\Database\Eloquent\Collection;

class UserWorklogRepository
{
    /*
     * create worklog record
     */
    public function create(array $data): Worklog
    {
        return Worklog::query()->with('project')->create($data);
    }

    /*
     * delete worklog record
     */
    public function delete(Worklog $worklog): void
    {
        $worklog->delete();
    }

    /*
     * getByClockId worklog record
     */
    public function getByClockId(int $clockId): Collection
    {
        return Worklog::query()->with('project')->where('clock_id', $clockId)->get();
    }
}
