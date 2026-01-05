<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CostumeController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\AuthController;

// Routes Authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user/{id}', [AuthController::class, 'profile']);
Route::put('/user/{id}', [AuthController::class, 'updateProfile']);

// Routes Costumes
Route::get('/costumes', [CostumeController::class, 'index']);
Route::get('/costumes/available', [CostumeController::class, 'available']);
Route::get('/costumes/category/{category}', [CostumeController::class, 'byCategory']);
Route::get('/costumes/{id}', [CostumeController::class, 'show']);
Route::post('/costumes', [CostumeController::class, 'store']);
Route::put('/costumes/{id}', [CostumeController::class, 'update']);
Route::delete('/costumes/{id}', [CostumeController::class, 'destroy']);

// Routes Clients
Route::get('/clients', [ClientController::class, 'index']);
Route::get('/clients/{id}', [ClientController::class, 'show']);
Route::post('/clients', [ClientController::class, 'store']);
Route::put('/clients/{id}', [ClientController::class, 'update']);
Route::delete('/clients/{id}', [ClientController::class, 'destroy']);

// Routes Réservations
Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/reservations/{id}', [ReservationController::class, 'show']);
Route::get('/reservations/user/{userId}', [ReservationController::class, 'byUser']);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::put('/reservations/{id}', [ReservationController::class, 'update']);
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);
