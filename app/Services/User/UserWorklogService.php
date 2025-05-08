<?php

namespace App\Services\User;

use App\Models\Clock;
use App\Models\Worklog;
use App\Repositories\User\UserWorklogRepository;
use App\Services\Service;
use Exception;

class UserWorklogService extends Service
{
    public function __construct(
        protected UserWorklogRepository $worklogRepository,
        protected UserClockService      $clockService
    ) {}

    /**
     * Add a new worklog entry
     *
     * @param int $clockId The clock ID
     * @param int $projectId The project ID
     * @param int $timeValue Time value in minutes
     * @return Worklog
     * @throws Exception When time value exceeds remaining clock time
     */
    public function addWorklog(int $clockId, int $projectId, int $timeValue): Worklog
    {
        $clock = Clock::query()->findOrFail($clockId);
        $remainingTime = $this->clockService->getRemainingTime($clock);

        if ($timeValue > $remainingTime) {
            throw new Exception('Time value exceeds remaining clock time.');
        }

        $worklog = $this->worklogRepository->create([
            'clock_id' => $clockId,
            'project_id' => $projectId,
            'time_value' => $timeValue,
        ]);

        $clock->updateWorklogStatus();

        return $worklog;
    }

    /**
     * Remove a worklog entry and update a related clock
     *
     * @param Worklog $worklog The worklog to remove
     */
    public function removeWorklog(Worklog $worklog): void
    {
        $clock = $worklog->clock;
        $this->worklogRepository->delete($worklog);
        $this->clockService->getRemainingTime($clock);
        $clock->updateWorklogStatus();
    }
}
