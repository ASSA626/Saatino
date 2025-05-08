<?php

namespace App\Models;

use Database\Factories\WorklogFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Worklog extends Model
{
    /** @use HasFactory<WorklogFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'clock_id',
        'project_id',
        'time_value',
    ];

    /**
     * Comment
     *
     * @return BelongsTo
     */
    public function clock(): BelongsTo
    {
        return $this->belongsTo(Clock::class);
    }

    /**
     * Comment
     *
     * @return BelongsTo
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
