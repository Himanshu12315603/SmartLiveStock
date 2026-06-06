<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LivestockController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\VaccinationController;
use App\Http\Controllers\HealthRecordController;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\DiseasePredictionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Livestock
    Route::apiResource('livestock', LivestockController::class);
    
    // Analytics
    Route::get('/analytics', [AnalyticsController::class, 'dashboardStats']);

    // Other Modules
    Route::apiResource('vaccinations', VaccinationController::class);
    Route::apiResource('health-records', HealthRecordController::class);
    Route::apiResource('transfers', TransferController::class);
    Route::apiResource('marketplace', MarketplaceController::class);
    
    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    
    // AI Predictor
    Route::post('/ai/predict-disease', [DiseasePredictionController::class, 'predict']);
});
