<?php

namespace App\Repositories\Admin\Vacations;

use App\Models\Vacation;
use Illuminate\Pagination\LengthAwarePaginator;

class VacationsRepository
{
    public function getAllVacations(int $perPage = 10, array $filters = []): LengthAwarePaginator
    {
        return Vacation::query()
            ->with('user')
            ->when(!empty($filters['user_id']), function ($query) use ($filters) {
                $query->where('user_id', $filters['user_id']);
            })
            ->when(!empty($filters['start_date']) && !empty($filters['end_date']), function ($query) use ($filters) {
                $query->whereBetween('created_at', [$filters['start_date'], $filters['end_date']]);
            })
            ->when(!empty($filters['vacation_type']), function ($query) use ($filters) {
                $query->where('vacation_type', $filters['vacation_type']);
            })
            ->when(!empty($filters['status']), function ($query) use ($filters) {
                $query->where('status', $filters['status']);
            })
            ->orderBy('created_at', 'DESC')
            ->paginate($perPage);
    }

    public function deleteVacation(int $id): bool
    {
        return Vacation::destroy($id);
    }
}
