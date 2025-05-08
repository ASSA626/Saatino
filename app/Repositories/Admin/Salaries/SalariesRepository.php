<?php

namespace App\Repositories\Admin\Salaries;

use App\Models\Salary;
use Illuminate\Pagination\LengthAwarePaginator;

class SalariesRepository
{
    public function getAllSalaries(int $perPage = 10, array $filters = []): LengthAwarePaginator
    {
        return Salary::query()
            ->with('user')
            ->when(!empty($filters['user_id']), function ($query) use ($filters) {
                $query->where('user_id', $filters['user_id']);
            })
            ->when(!empty($filters['start_date']) && !empty($filters['end_date']), function ($query) use ($filters) {
                $query->whereBetween('created_at', [$filters['start_date'], $filters['end_date']]);
            })
            ->when(!empty($filters['status']), function ($query) use ($filters) {
                $query->where('status', $filters['status']);
            })
            ->orderBy('created_at', 'DESC')
            ->paginate($perPage);
    }

    public function deleteSalary(int $id): bool
    {
        return Salary::destroy($id);
    }
}
