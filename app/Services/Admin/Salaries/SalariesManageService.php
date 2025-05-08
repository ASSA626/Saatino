<?php

namespace App\Services\Admin\Salaries;

use App\Helper\DateConverterHelper;
use App\Repositories\Admin\Salaries\SalariesRepository;
use App\Services\Service;
use Illuminate\Pagination\LengthAwarePaginator;

class SalariesManageService extends Service
{
    public function __construct(
        protected SalariesRepository $salariesRepository
    ){}

    public function getAllSalaries(int $perPage = 10, ?array $filters = []): LengthAwarePaginator
    {
        if (!empty($filters['start_date'])) {
            $filters['start_date'] = DateConverterHelper::shamsi_to_miladi($filters['start_date']);
            $filters['end_date'] = DateConverterHelper::shamsi_to_miladi($filters['end_date']);
        }
        return $this->salariesRepository->getAllSalaries($perPage, $filters);
    }

    public function deleteSalaries(int $id): bool
    {
        return $this->salariesRepository->deleteSalary($id);
    }
}
