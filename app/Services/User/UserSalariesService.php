<?php

namespace App\Services\User;

use App\Helper\DateConverterHelper;
use App\Models\Salary;
use App\Repositories\User\UserSalariesRepository;
use App\Services\Service;
use Illuminate\Pagination\LengthAwarePaginator;

class UserSalariesService extends Service
{
    public function __construct(
        protected UserSalariesRepository $salariesRepository
    ){}

    public function getUserSalaries(int $user_id, array $filters = []): LengthAwarePaginator
    {
        if (!empty($filters['start_date'])) {
            $filters['start_date'] = DateConverterHelper::shamsi_to_miladi($filters['start_date']);
            $filters['left_date'] = DateConverterHelper::shamsi_to_miladi($filters['left_date']);
        }
        return $this->salariesRepository->getAll($user_id, $filters);
    }

    public function createUserSalary(array $data): Salary
    {
        $data['user_id'] = auth()->id();;
        return $this->salariesRepository->create($data);
    }
}
