<?php

namespace App\Repositories\User;

use App\Models\Vacation;
use Illuminate\Pagination\LengthAwarePaginator;

class UserVacationRepository
{
    public function all(int $user_id, array $filters = []): LengthAwarePaginator
    {
        return Vacation::query()
            ->where('user_id', $user_id)
            ->with('user')
            ->when(!empty($filters['start_date']), function ($query) use ($filters) {
                $query->where('start_date', '>=', $filters['start_date']);
            })
            ->when(!empty($filters['end_date']), function ($query) use ($filters) {
                $query->where('end_date', '<=', $filters['end_date']);
            })
            ->when(!empty($filters['status']), function ($query) use ($filters) {
                $query->where('status', $filters['status']);
            })
            ->when(!empty($filters['vacation_type']), function ($query) use ($filters) {
                $query->where('vacation_type', $filters['vacation_type']);
            })
            ->paginate(6);
    }

    public function create(array $data): Vacation
    {
        return Vacation::query()->create($data);
    }
}
