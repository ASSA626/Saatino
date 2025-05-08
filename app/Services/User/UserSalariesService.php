<?php

namespace App\Services\User;

use App\Models\Salary;
use App\Repositories\User\UserSalariesRepository;
use App\Services\Service;
use Illuminate\Pagination\LengthAwarePaginator;

class UserSalariesService extends Service
{
    public function __construct(
        protected UserSalariesRepository $salariesRepository
    ){}

    public function getUserSalaries(int $user_id): LengthAwarePaginator
    {
        return $this->salariesRepository->getAll($user_id);
    }

    public function createUserSalary(array $data): Salary
    {
        $data['user_id'] = auth()->id();;
        return $this->salariesRepository->create($data);
    }
}
