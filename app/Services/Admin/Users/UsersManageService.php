<?php

namespace App\Services\Admin\Users;

use App\Models\User;
use App\Repositories\Admin\Users\UsersRepository;
use App\Services\Service;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UsersManageService extends Service
{
    public function __construct(
        protected UsersRepository $usersRepository
    ){}

    public function getAllUsersWithoutPage(): Collection
    {
        return $this->usersRepository->getAllUsersWithoutPage();
    }

    public function getAllUsers(int $perPage = 10): LengthAwarePaginator
    {
        return $this->usersRepository->getAllUsers($perPage);
    }

    public function getUserById(int $id): ?User
    {
        return $this->usersRepository->getUserById($id);
    }

    public function createUser(array $data): User
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        return $this->usersRepository->createUser($data);
    }

    public function updateUser(int $id, array $data): bool
    {
        $data['password'] = Hash::make($data['password']);
        return $this->usersRepository->updateUser($id, $data);
    }

    public function deleteUser(int $id): bool
    {
        return $this->usersRepository->deleteUser($id);
    }
}
