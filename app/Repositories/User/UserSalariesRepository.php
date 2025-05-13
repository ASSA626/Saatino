<?php

namespace App\Repositories\User;

use App\Models\Salary;
use Illuminate\Pagination\LengthAwarePaginator;

class UserSalariesRepository
{
    public function getAll(int $user_id, array $filters = []): LengthAwarePaginator
    {
        return Salary::query()
            ->where('user_id', $user_id)
            ->when(!empty($filters['start_date']) && !empty($filters['left_date']), function ($query) use ($filters) {
                $query->whereBetween('created_at', [$filters['start_date'], $filters['left_date']]);
            })
            ->when(!empty($filters['status']), function ($query) use ($filters) {
                $query->where('status', $filters['status']);
            })
            ->paginate(6);
    }

    public function create(array $data): Salary
    {
        return Salary::query()->create($data);
    }
}
