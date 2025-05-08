<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateSalaryRequest;
use App\Services\User\UserSalariesService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SalariesController extends Controller
{
    public function __construct(
        protected UserSalariesService $salariesService
    ){}

    public function index(): Response
    {
        $user_id = auth()->id();
        $salaries = $this->salariesService->getUserSalaries($user_id);

        return Inertia::render('user/salaries/salaries', [
            'salaries' => $salaries
        ]);
    }

    public function store(CreateSalaryRequest $request): void
    {
        $this->salariesService->createUserSalary($request->validated());
    }
}
