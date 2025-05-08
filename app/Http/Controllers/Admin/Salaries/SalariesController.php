<?php

namespace App\Http\Controllers\Admin\Salaries;

use App\Http\Controllers\Controller;
use App\Services\Admin\Salaries\SalariesManageService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SalariesController extends Controller
{
    public function __construct(
        protected SalariesManageService $salariesService
    ){}

    public function index(Request $request): Response
    {
        $filters = $this->getFiltersFromRequest($request);
        $salaries = $this->salariesService->getAllSalaries(filters: $filters);
        $salaries_count = 10;

        return Inertia::render('admin/salaries/salaries-list', [
            'salaries' => $salaries,
            'salaries_count' => $salaries_count
        ]);
    }

    public function destroy(string $id): void
    {
        $this->salariesService->deleteSalaries($id);
    }

    private function getFiltersFromRequest(Request $request): array
    {
        return [
            'start_date' => $request->input('start_date', null),
            'end_date' => $request->input('left_date', null),
            'user_id' => $request->input('user_id', null),
            'status' => $request->input('status', null),
        ];
    }
}
