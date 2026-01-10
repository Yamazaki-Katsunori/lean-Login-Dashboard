<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Auth\MeController;
use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\Task\TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', MeController::class);
    Route::apiResource('tasks', TaskController::class);
});

Route::get('/health', HealthController::class);
