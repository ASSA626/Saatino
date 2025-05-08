<?php

namespace App\Services\Admin\Vacations;

use App\Helper\DateConverterHelper;
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

    public function deleteVacation(int $id): bool
    {
        return $this->vacationsRepository->deleteVacation($id);
    }
}
