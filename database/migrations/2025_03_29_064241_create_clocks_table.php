<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\ClockTypeEnum;
use App\Enums\ClockWorklogStatusEnum;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('clock_type')->default(ClockTypeEnum::OFFICIAL->value);
            $table->time('start_clock');
            $table->time('left_clock')->nullable();
            $table->integer('time_value')->nullable();
            $table->date('created_date');
            $table->string('worklog_status')->default(ClockWorklogStatusEnum::INSERTING->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clocks');
    }
};
