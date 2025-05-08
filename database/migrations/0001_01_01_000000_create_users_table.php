<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\UserCarStatusEnum;
use App\Enums\UserLunchStatusEnum;
use App\Enums\UserSalaryStatusEnum;
use App\Enums\UserBimehStatusEnum;
use App\Enums\UserActivityStatusEnum;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('image')->nullable();
            $table->string('username')->unique();
            $table->string('mobile')->unique();
            $table->string('national_code')->unique();
            $table->string('father_name');
            $table->string('zip')->unique()->nullable();
            $table->string('personally_code')->unique()->nullable();
            $table->string('bimeh_code')->unique()->nullable();
            $table->string('landing_phone')->unique()->nullable();
            $table->string('mobile_friend')->unique();
            $table->string('activity_status')->default(UserActivityStatusEnum::ACTIVE->value);
            $table->string('salary_status')->default(UserSalaryStatusEnum::INACTIVE->value);
            $table->string('bimeh_status')->default(UserBimehStatusEnum::INACTIVE->value);
            $table->string('car_status')->default(UserCarStatusEnum::INACTIVE->value);
            $table->string('lunch_status')->default(UserLunchStatusEnum::INACTIVE->value);
            $table->text('address');
            $table->string('role')->default('user');
            $table->string('role_direction')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
