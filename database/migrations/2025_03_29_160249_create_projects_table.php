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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('design_id')->unique()->constrained('project_designs')->cascadeOnUpdate()->cascadeOnUpdate();
            $table->string('title')->unique();
            $table->string('category');
            $table->integer('contact_number');
            $table->integer('contract_value');
            $table->date('start_contract');
            $table->date('end_contract');
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
        Schema::dropIfExists('projects');
    }
};
