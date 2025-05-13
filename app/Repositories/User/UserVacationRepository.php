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
            ->when(!empty($filters['start_date']) && !empty($filters['left_date']), function ($query) use ($filters) {
                $query->whereBetween('created_at', [$filters['start_date'], $filters['left_date']]);
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
