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

    public function index(Request $request): Response
    {
        $user_id = auth()->id();
        $filters = $request->only(['start_date', 'left_date', 'status']);
        $salaries = $this->salariesService->getUserSalaries($user_id, $filters);

        return Inertia::render('user/salaries/salaries', [
            'salaries' => $salaries
        ]);
    }

    public function store(CreateSalaryRequest $request): void
    {
        $this->salariesService->createUserSalary($request->validated());
    }
}
