<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserClockResource;
use App\Models\Project;
use App\Services\User\UserClockService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        protected UserClockService $clockService
    ){}

    public function index(): Response
    {
        $userId = auth()->id();
        $currentClock = $this->clockService->getLatestClock($userId);

        return Inertia::render('user/home/dashboard', [
            'projects' => Project::all(),
            'currentClock' => $currentClock ? UserClockResource::make($currentClock) : null,
            'worklogs' => $currentClock ? UserClockResource::make($currentClock)->resolve()['worklogs'] : [],
            'remainingTime' => $currentClock ? $this->clockService->getRemainingTime($currentClock) : 0,
        ]);
    }
}
