<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'image',
        'username',
        'mobile',
        'national_code',
        'father_name',
        'zip',
        'personally_code',
        'bimeh_code',
        'landing_phone',
        'mobile_friend',
        'activity_status',
        'salary_status',
        'bimeh_status',
        'car_status',
        'lunch_status',
        'address',
        'role',
        'role_direction',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Comment
     *
     * @return HasMany
     */
    public function clock(): HasMany
    {
        return $this->hasMany(Clock::class);
    }

    /**
     * Comment
     *
     * @return HasMany
     */
    public function vacation(): HasMany
    {
        return $this->hasMany(Vacation::class);
    }

    /**
     * Comment
     *
     * @return HasMany
     */
    public function salary(): HasMany
    {
        return $this->hasMany(Salary::class);
    }
}
