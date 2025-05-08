<?php

namespace App\Services\User;

use App\Models\Clock;
use App\Repositories\User\UserClockRepository;
use App\Services\Service;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

class UserClockService extends Service
{
    public function __construct(
        protected UserClockRepository $clockRepository
    ){}

    public function startClock(int $userId): Clock
    {
        return $this->clockRepository->create([
            'user_id' => $userId,
            'start_clock' => Carbon::now()->format('H:i:s'),
            'created_date' => now()->format('Y-m-d')
        ]);
    }

    public function endClock(int $userId): Clock
    {
        $clocks = $this->findByUser($userId, true);
        $clock = $clocks->first();

        if (!$clock || $clock->left_clock) {
            throw new Exception('No active clock found or already ended.');
        }

        $clock = $this->clockRepository->update($clock, [
            'left_clock' => Carbon::now()->format('H:i:s'),
        ]);

        $clock->calculateTimeValue();

        return $clock;
    }

    public function getRemainingTime(Clock $clock): int
    {
        $worklogs = $clock->worklog instanceof Collection
            ? $clock->worklog->sum('time_value')
            : 0;

        $timeValue = is_numeric($clock->time_value) ? (int)$clock->time_value : 0;

        return max($timeValue - $worklogs, 0);
    }

    public function findByUser(int   $userId, bool  $latest = true, array $relations = ['worklog.project']): SupportCollection
    {
        return $this->clockRepository->findByUser($userId, $latest, $relations);
    }

    /**
     * Get the latest clock for a user
     *
     * @param int $userId
     * @param array $relations
     * @return Clock|null
     */
    public function getLatestClock(int $userId, array $relations = ['worklog.project']): ?Clock
    {
        $clocks = $this->findByUser($userId, true, $relations);
        return $clocks->first();
    }

    public function getUserAllClocks(int $userId, array $relations = ['worklog.project']): Collection
    {
        $clocks = $this->clockRepository->findByUser($userId, false, $relations);

        return $clocks instanceof Collection ? $clocks : new Collection();
    }
}
