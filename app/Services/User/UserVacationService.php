<?php

namespace App\Services\User;

use App\Helper\DateConverterHelper;
use App\Models\Vacation;
use App\Repositories\User\UserVacationRepository;
use App\Services\Service;
use Illuminate\Pagination\LengthAwarePaginator;

class UserVacationService extends Service
{
    public function __construct(
        protected UserVacationRepository $vacationRepository
    ){}

    public function getUserVacation(int $user_id, array $filters = []): LengthAwarePaginator
    {
        return $this->vacationRepository->all($user_id, $filters);
    }

    public function addVacation(array $data): Vacation
    {
        $data['user_id'] = auth()->id();
        $data['start_date'] = DateConverterHelper::shamsi_to_miladi($data['start_date']);
        $data['end_date'] = DateConverterHelper::shamsi_to_miladi($data['end_date']);
        return $this->vacationRepository->create($data);
    }
}
