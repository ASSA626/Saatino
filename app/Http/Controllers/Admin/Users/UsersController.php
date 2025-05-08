<?php

namespace App\Http\Controllers\Admin\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Users\CreateUserRequest;
use App\Http\Requests\Admin\Users\UpdateUserRequest;
use App\Services\Admin\Users\UsersManageService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UsersController extends Controller
{
    public function __construct(
        protected UsersManageService $usersService
    ){}

    public function index(): Response
    {
        $users = $this->usersService->getAllUsers();
        $users_count = 10;

        return Inertia::render('admin/users/users-list', [
            'users' => $users,
            'users_count' => $users_count
        ]);
    }

    public function store(CreateUserRequest $request): void
    {
        $this->usersService->createUser($request->validated());
    }

    public function update(UpdateUserRequest $request, string $id): void
    {
        $this->usersService->updateUser($id, $request->validated());
    }

    public function destroy(string $id): void
    {
        $this->usersService->deleteUser($id);
    }
}
