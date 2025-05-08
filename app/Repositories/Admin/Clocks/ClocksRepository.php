<?php

namespace App\Repositories\Admin\Clocks;

use App\Helper\DateConverterHelper;
use App\Models\Clock;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ClocksRepository
{
    public function getAllClockUserPaginate(int $user_id, int $perPage = 10, ?array $filters = []): LengthAwarePaginator
    {
        return Clock::query()
            ->where('user_id', $user_id)
            ->with(['user', 'worklog'])
            ->when(!empty($filters['start_date']) && !empty($filters['end_date']), function ($query) use ($filters) {
                $query->whereBetween('created_date', [$filters['start_date'], $filters['end_date']]);
            })
            ->when(!empty($filters['clock_type']), function ($query) use ($filters) {
                $query->where('clock_type', $filters['clock_type']);
            })
            ->when(!empty($filters['worklogs_type']), function ($query) use ($filters) {
                $query->where('worklog_status', $filters['worklogs_type']);
            })
            ->orderBy('created_date', 'desc')
            ->paginate($perPage);
    }

    public function getClocksMonthlyReport(int $userId, string $startDate, string $endDate): Collection
    {
        return Clock::query()->where('user_id', $userId)
            ->whereBetween('created_date', [$startDate, $endDate])
            ->get();
    }

    public function findClock(int $id): ?Clock
    {
        return Clock::query()
            ->with(['user', 'worklog.project'])
            ->find($id);
    }

    public function createClock(array $data): Clock
    {
        return Clock::query()
            ->create($data);
    }

    public function updateClock(int $clockId, array $data): ?Clock
    {
        $clock = $this->findClock($clockId);

        if (!$clock) {
            return null;
        }

        $clock->update($data);
        return $clock;
    }

    public function deleteClock(int $clockId): bool
    {
        $clock = $this->findClock($clockId);

        if (!$clock) {
            return false;
        }

        return $clock->delete();
    }

    public function calculateTotalTimeValue($clocks): int
    {
        return $clocks->sum('time_value');
    }
}
