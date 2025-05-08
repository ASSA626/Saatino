<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_designs', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('category');
            $table->decimal('expert_clock', 10, 4);
            $table->decimal('senior_clock', 10, 4);
            $table->decimal('manager_clock', 10, 4);
            $table->decimal('daily_lunch', 10, 4);
            $table->decimal('count_lunch', 10, 4);
            $table->decimal('total_lunch', 10, 4);
            $table->decimal('daily_car', 10, 4);
            $table->decimal('count_car', 10, 4);
            $table->decimal('total_car', 10, 4);
            $table->decimal('daily_equipment', 10, 4);
            $table->decimal('count_equipment', 10, 4);
            $table->decimal('total_equipment', 10, 4);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_designs');
    }
};
