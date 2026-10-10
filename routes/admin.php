<?php

use Illuminate\Support\Facades\Route;
use RustixDev\StaffNotes\Http\Controllers\NoteController;

Route::get('/{type}', [NoteController::class, 'index'])->whereIn('type', ['users', 'servers']);
Route::get('/{type}/{id}', [NoteController::class, 'show'])->whereIn('type', ['users', 'servers'])->whereNumber('id');
