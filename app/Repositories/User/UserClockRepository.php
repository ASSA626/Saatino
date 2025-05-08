<?php

namespace App\Repositories\User;

use App\Models\Clock;
use Illuminate\Support\Collection;

class UserClockRepository
{
    /**
     * Create clock record
     */
    public function create(array $data): Clock
    {
        return Clock::query()->create($data);
    }

    /**
     * Update clock record
     */
    public function update(Clock $clock, array $data): Clock
    {
        $clock->update($data);
        return $clock;
    }

    /**
     * Find clocks by user ID
     *
     * @param int $userId User ID
     * @param bool $latest Whether to return only the latest record
     * @param array $relations Relations to an eager load
     * @return Collection
     */
    public function findByUser(int $userId, bool $latest = true, array $relations = ['worklog.project']): Collection
    {
        $query = Clock::query()->where('user_id', $userId);

        if (!empty($relations)) {
            $query->with($relations);
        }

        if ($latest) {
            $clock = $query->latest()->first();
            return $clock ? collect([$clock]) : collect();
        }

        return $query->get();
    }
}
