<?php

namespace App\Http\Controllers\Admin\Vacations;

use App\Http\Controllers\Controller;
use App\Services\Admin\Users\UsersManageService;
use App\Services\Admin\Vacations\VacationManageService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VacationsController extends Controller
{
    public function __construct(
        protected VacationManageService $vacationService,
        protected UsersManageService $usersManageService
    ){}

    public function index(Request $request): Response
    {
        $filters = $this->getFiltersFromRequest($request);
        $vacations = $this->vacationService->getAllVacations(filters: $filters);
        $vacations_count = 10;

        return Inertia::render('admin/vacations/vacations-list', [
            'vacations' => $vacations,
            'vacations_count' => $vacations_count,
            'filters' => $filters
        ]);
    }

    public function destroy(string $id): void
    {
        $this->vacationService->deleteVacation($id);
    }

    public function changeVacationStatus(Request $request, int $vacation_id): void
    {
        $status = $request->input('status');
        $this->vacationService->changeVacationStatus($vacation_id, $status);
    }

    public function updateVacationReportCaption(Request $request, int $vacation_id): void
    {
        $report = $request->input('report_caption');
        $this->vacationService->updateVacationReportCaption($vacation_id, $report);
    }

    private function getFiltersFromRequest(Request $request): array
    {
        return [
            'start_date' => $request->input('start_date', null),
            'end_date' => $request->input('left_date', null),
            'user_id' => $request->input('user_id', null),
            'vacation_type' => $request->input('vacation_type', null),
            'status' => $request->input('status', null),
        ];
    }
}
