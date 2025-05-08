<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'design_id',
        'title',
        'category',
        'contact_number',
        'contract_value',
        'start_contract',
        'end_contract',
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
     * @return BelongsTo
     */
    public function design(): BelongsTo
    {
        return $this->belongsTo(ProjectDesign::class);
    }

    /**
     * Comment
     *
     * @return HasMany
     */
    public function worklog(): HasMany
    {
        return $this->hasMany(Worklog::class);
    }
}
