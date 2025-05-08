<?php

namespace App\Repositories\Admin\Users;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class UsersRepository
{
    public function getAllUsersWithoutPage(): Collection
    {
        return User::query()->orderBy('created_at', 'DESC')->get();
    }

    public function getAllUsers(int $perPage = 10): LengthAwarePaginator
    {
        return User::query()->orderBy('created_at', 'DESC')->paginate($perPage);
    }

    public function getUserById(int $id): ?User
    {
        return User::query()->findOrFail($id);
    }

    public function createUser(array $data): User
    {
        return User::query()->create($data);
    }

    public function updateUser(int $id, array $data): bool
    {
        $user = User::query()->findOrFail($id);

        if (!$user) {
            return false;
        }

        return $user->update($data);
    }

    public function deleteUser(int $id): bool
    {
        return User::destroy($id);
    }
}
