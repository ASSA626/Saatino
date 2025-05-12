<?php

namespace App\Http\Controllers\Admin\Clocks;

use App\Http\Controllers\Controller;
use App\Services\Admin\Clocks\ClocksManageService;
use App\Services\Admin\Users\UsersManageService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClockManageController extends Controller
{
    public function __construct(
        protected ClocksManageService $clocksService,
        protected UsersManageService  $usersService,
    ){}

    public function showClocks(Request $request, ?int $user_id = null): Response
    {
        $filters = $this->getFiltersFromRequest($request);
        $users = $this->usersService->getAllUsersWithoutPage();

        if ($user_id) {
            $user = $this->usersService->getUserById($user_id);
            $clocks = $this->clocksService->getAllClockUserPaginate($user_id, filters: $filters);
            $report = $this->clocksService->reportClock($user_id, $filters);
            $clocks_count = 10;
        } else {
            $user = null;
            $clocks = null;
            $clocks_count = 0;
        }

        return Inertia::render('admin/clocks/clock-management', [
            'clocks' => $user_id ? $clocks : null,
            'clocks_count' => $user_id ? $clocks_count : null,
            'user' => $user_id ? $user : null,
            'users' => $users,
            'report' => $user_id ? $report : null
        ]);
    }

    public function storeClock(Request $request): void
    {
        $this->clocksService->createClockWithWorklogs(
            $request->all()['clock'],
            $request->all()['worklogs']
        );
    }

    public function updateClock(Request $request, int $clock_id): void
    {
        $this->clocksService->updateClockWithWorklogs(
            $clock_id,
            $request->all()['clock'],
            $request->all()['worklogs'],
        );
    }

    public function destroyClock(int $id)
    {
        //
    }

    private function getFiltersFromRequest(Request $request): array
    {
        return [
            'start_date' => $request->input('start_date', null),
            'end_date' => $request->input('left_date', null),
            'clock_type' => $request->input('clock_type', null),
            'worklogs_type' => $request->input('worklogs_type', null),
        ];
    }
}
