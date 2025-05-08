<?php

namespace App\Models;

use Database\Factories\ProjectDesignFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProjectDesign extends Model
{
    /** @use HasFactory<ProjectDesignFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'category',
        'expert_clock',
        'senior_clock',
        'manager_clock',
        'daily_lunch',
        'count_lunch',
        'total_lunch',
        'daily_car',
        'count_car',
        'total_car',
        'daily_equipment',
        'count_equipment',
        'total_equipment',
    ];

    /**
     * Comment
     *
     * @return HasOne
     */
    public function project(): HasOne
    {
        return $this->hasOne(Project::class);
    }
}
