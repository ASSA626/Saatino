<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Users\UsersController;
use App\Http\Controllers\Admin\Salaries\SalariesController;
use App\Http\Controllers\Admin\Vacations\VacationsController;
use App\Http\Controllers\Admin\Clocks\ClockManageController;

Route::middleware(['admin', 'auth'])->prefix('/admin')->group(function () {
    /* Users resource routes */
    Route::resource('/users', UsersController::class)->only(['index', 'store', 'update', 'destroy']);

    /* Salaries resource route */
    Route::resource('/salaries', SalariesController::class)->only(['index', 'destroy'])->names([
        'index' => 'admin.salaries.index',
        'destroy' => 'admin.salaries.destroy'
    ]);

    /* Vacations resource route */
    Route::resource('/vacations', VacationsController::class)->only(['index', 'destroy'])->names([
        'index' => 'admin.vacations.index',
        'destroy' => 'admin.vacations.destroy'
    ]);

    /* Clock's report GET routes */
    Route::get('/clocks/report/{user_id?}', [ClockManageController::class, 'showClocks'])->name('admin.clocks');
    Route::post('/clock/create', [ClockManageController::class, 'storeClock'])->name('admin.createClock');
    Route::put('/clocks/{clock_id}/update', [ClockManageController::class, 'updateClock'])->name('admin.updateClock');

    Route::get('/reports/clocks/report/{user_id}/{start_date?}/{end_date?}', [\App\Http\Controllers\Admin\Clocks\ExportPdfClocksController::class, 'generateTimesheetReport'])->name('report.test');
});
