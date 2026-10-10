<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ext_staff_notes', function (Blueprint $table) {
            $table->id();
            $table->string('subject_type', 16);
            $table->unsignedInteger('subject_id');
            $table->string('flag', 16)->default('none');
            $table->text('note')->nullable();
            $table->unsignedInteger('updated_by')->nullable();
            $table->timestamps();

            $table->unique(['subject_type', 'subject_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ext_staff_notes');
    }
};
