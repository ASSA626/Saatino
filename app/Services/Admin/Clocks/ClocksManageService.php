<?php

namespace App\Services\Admin\Clocks;

use App\Helper\CurrentJalaliMonth;
use App\Helper\DateConverterHelper;
use App\Models\Clock;
use App\Repositories\Admin\Clocks\ClocksRepository;
use App\Repositories\Admin\Clocks\WorklogsRepository;
use App\Services\Service;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;

class ClocksManageService extends Service
{
    public function __construct(
        protected ClocksRepository   $clockRepository,
        protected WorklogsRepository $worklogRepository
    ){}

    public function getAllClockUserPaginate(int $user_id, int $perPage = 10, ?array $filters = []): LengthAwarePaginator
    {
        if (!empty($filters['start_date'])) {
            $filters['start_date'] = DateConverterHelper::shamsi_to_miladi($filters['start_date']);
            $filters['end_date'] = DateConverterHelper::shamsi_to_miladi($filters['end_date']);
        }
        return $this->clockRepository->getAllClockUserPaginate($user_id, $perPage, $filters);
    }

    public function findClock(int $id): ?Clock
    {
        return $this->clockRepository->findClock($id);
    }

    public function createClockWithWorklogs(array $clockData, array $worklogs): Clock
    {
        return DB::transaction(function () use ($clockData, $worklogs) {
            $clockData['created_date'] = DateConverterHelper::shamsi_to_miladi($clockData['created_date']);
            $clock = $this->clockRepository->createClock($clockData);

            foreach ($worklogs as $key => $worklog) {
                $worklogs[$key]['clock_id'] = $clock->id;
            }

            $this->worklogRepository->createMany($worklogs);

            return $clock->load('worklog.project');
        });
    }

    public function updateClockWithWorklogs(int $clockId, array $clockData, array $worklogs): ?Clock
    {
        return DB::transaction(function () use ($clockId, $clockData, $worklogs) {
            $clockData['created_date'] = DateConverterHelper::shamsi_to_miladi($clockData['created_date']);
            $updatedClock = $this->clockRepository->updateClock($clockId, $clockData);

            if (!$updatedClock) {
                return null;
            }

            $this->worklogRepository->deleteByClockId($clockId);

            foreach ($worklogs as $key => $worklog) {
                $worklogs[$key]['clock_id'] = $clockId;
            }

            $this->worklogRepository->createMany($worklogs);

            return $updatedClock->fresh(['worklog.project']);
        });
    }

    public function deleteClock(int $clockId): bool
    {
        return DB::transaction(function () use ($clockId) {
            $clock = $this->clockRepository->findClock($clockId);

            if (!$clock) {
                return false;
            }

            return $this->clockRepository->deleteClock($clockId);
        });
    }

    public function reportClock(int $userId, ?array $filters = []): array
    {
        if (!empty($filters['start_date'])) {
            $filters['start_date'] = DateConverterHelper::shamsi_to_miladi($filters['start_date']);
            $filters['end_date'] = DateConverterHelper::shamsi_to_miladi($filters['end_date']);
        } else {
            $dateRange = CurrentJalaliMonth::getCurrentMonth();
            $filters['start_date'] = DateConverterHelper::shamsi_to_miladi($dateRange['start_date']);
            $filters['end_date'] = DateConverterHelper::shamsi_to_miladi($dateRange['end_date']);
        }

        $clocks = $this->clockRepository->getClocksMonthlyReport($userId, $filters);
        $totalTimeValue = $this->clockRepository->calculateTotalTimeValue($clocks);

        return [
            'total_time' => $totalTimeValue,
            'start_date' => $filters['start_date'],
            'end_date' => $filters['end_date'],
        ];
    }
}
