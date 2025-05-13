<?php

namespace App\Services\Admin\Vacations;

use App\Helper\DateConverterHelper;
use App\Models\Vacation;
use App\Repositories\Admin\Vacations\VacationsRepository;
use App\Services\Service;
use Illuminate\Pagination\LengthAwarePaginator;

class VacationManageService extends Service
{
    public function __construct(
        protected VacationsRepository $vacationsRepository
    ){}

    public function getAllVacations(int $perPage = 10, ?array $filters = []): LengthAwarePaginator
    {
        if (!empty($filters['start_date'])) {
            $filters['start_date'] = DateConverterHelper::shamsi_to_miladi($filters['start_date']);
            $filters['end_date'] = DateConverterHelper::shamsi_to_miladi($filters['end_date']);
        }
        return $this->vacationsRepository->getAllVacations($perPage, $filters);
    }

    public function getVacationById(int $vacation_id): Vacation
    {
        return $this->vacationsRepository->getVacationById($vacation_id);
    }

    public function changeVacationStatus(int $vacation_id, string $status): void
    {
        $this->vacationsRepository->updateVacationStatus($vacation_id, $status);
    }

    public function updateVacationReportCaption(int $vacation_id, string $report_caption): void
    {
        $this->vacationsRepository->updateVacationReportCaption($vacation_id, $report_caption);
    }

    public function deleteVacation(int $id): bool
    {
        return $this->vacationsRepository->deleteVacation($id);
    }
}
