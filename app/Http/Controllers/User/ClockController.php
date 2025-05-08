<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\UserClockService;
use Illuminate\Http\Request;

class ClockController extends Controller
{
    public function __construct(
        protected UserClockService $clockService
    ){}

    public function start(): void
    {
        $this->clockService->startClock(auth()->id());
    }

    public function end(): void
    {
        $this->clockService->endClock(auth()->id());
    }
}
