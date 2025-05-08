<?php

namespace App\Repositories\User;

use App\Models\Salary;
use Illuminate\Pagination\LengthAwarePaginator;

class UserSalariesRepository
{
    public function getAll(int $userId): LengthAwarePaginator
    {
        return Salary::query()->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->paginate(6);
    }

    public function create(array $data): Salary
    {
        return Salary::query()->create($data);
    }
}
