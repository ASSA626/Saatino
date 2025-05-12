<?php

namespace App\Models;

use App\Helper\DateConverterHelper;
use Carbon\Carbon;
use Database\Factories\ClockFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Clock extends Model
{
    /** @use HasFactory<ClockFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'clock_type',
        'start_clock',
        'left_clock',
        'time_value',
        'created_date',
        'worklog_status',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_date' => 'date',
        ];
    }

    /**
     * Comment
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
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

    public function calculateTimeValue(): void
    {
        $start = $this->start_clock instanceof Carbon ? $this->start_clock : Carbon::parse($this->start_clock);
        $end = $this->left_clock instanceof Carbon ? $this->left_clock : Carbon::parse($this->left_clock);
        $diffInMinutes = $start->diffInMinutes($end);
        $this->time_value = $diffInMinutes;
        $this->save();
    }

    public function updateWorklogStatus(): void
    {
        $worklogsSum = (int) $this->worklog()->sum('time_value');
        $timeValue = (int) ($this->time_value ?? 0);
        $tehranTime = now()->timezone('Asia/Tehran');
        $endOfDay = $tehranTime->copy()->endOfDay();

        if ($worklogsSum === 0) {
            // هیچ لاگی ثبت نشده
            if ($tehranTime >= $endOfDay) {
                $this->worklog_status = 'uninserted';
            } else {
                $this->worklog_status = 'inserting';
            }
        } elseif ($worklogsSum === $timeValue) {
            $this->worklog_status = 'inserted';
        } elseif ($worklogsSum < $timeValue) {
            if ($tehranTime >= $endOfDay) {
                $this->worklog_status = 'uncompleted';
            } else {
                $this->worklog_status = 'inserting';
            }
        }

        $this->save();
    }
}
