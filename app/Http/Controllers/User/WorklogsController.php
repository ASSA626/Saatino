<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Worklog;
use App\Services\User\UserWorklogService;
use Illuminate\Http\Request;

class WorklogsController extends Controller
{
    protected UserWorklogService $worklogService;

    public function __construct(UserWorklogService $worklogService)
    {
        $this->worklogService = $worklogService;
    }

    public function add(Request $request): void
    {
       $this->worklogService->addWorklog(
            $request->clock_id,
            $request->project_id,
            $request->time_value
        );
    }

    public function remove(Worklog $worklog): void
    {
        $this->worklogService->removeWorklog($worklog);
    }
}
