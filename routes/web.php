<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\ClockController;
use App\Http\Controllers\User\WorklogsController;
use App\Http\Controllers\User\VacationsController;
use App\Http\Controllers\User\SalariesController;

Route::redirect("/", "login");

Route::middleware(['auth', 'user'])->prefix('/user')->group(function () {
    /* User dashboard GET route */
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('user.dashboard');

    /* User clock and worklog POST/DELETE routes */
    Route::post('/clock/start', [ClockController::class, 'start'])->name('clock.start');
    Route::post('/clock/end', [ClockController::class, 'end'])->name('clock.end');
    Route::post('/worklog/add', [WorklogsController::class, 'add'])->name('worklog.add');
    Route::delete('/worklog/{worklog}', [WorklogsController::class, 'remove'])->name('worklog.remove');

    /* User vacation resource (only GET/POST) route */
    Route::resource('/vacations', VacationsController::class)->only(['index', 'store'])->names([
        'index' => 'user.vacations.index',
        'store' => 'user.vacations.store'
    ]);

    /* User salaries resource (only GET/POST) route */
    Route::resource('/salaries', SalariesController::class)->only(['index', 'store'])->names([
        'index' => 'user.salaries.index',
        'store' => 'user.salaries.store'
    ]);
});

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
