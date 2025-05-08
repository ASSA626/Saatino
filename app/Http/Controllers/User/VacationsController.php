<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateVacationRequest;
use App\Services\User\UserVacationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VacationsController extends Controller
{
    public function __construct(
        protected UserVacationService $vacationService
    ){}

    public function index(Request $request): Response
    {
        $user_id = auth()->id();
        $filters = $request->only(['start_date', 'end_date', 'status', 'vacation_type']);
        $vacations = $this->vacationService->getUserVacation($user_id, $filters);

        return Inertia::render('user/vacations/vacations', [
            'vacations' => $vacations
        ]);
    }

    public function store(CreateVacationRequest $request): void
    {
        $this->vacationService->addVacation($request->validated());
    }
}
