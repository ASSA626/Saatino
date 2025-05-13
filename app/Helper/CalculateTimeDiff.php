<?php

namespace App\Helper;

use Carbon\Carbon;

class CalculateTimeDiff
{
    public static function calculate($start, $end): float|int|string
    {
        if (preg_match('/^\d{2}:\d{2}$/', $start) && preg_match('/^\d{2}:\d{2}$/', $end)) {
            $startTime = Carbon::createFromFormat('H:i', $start);
            $endTime = Carbon::createFromFormat('H:i', $end);
            return $startTime->diffInHours($endTime, false);
        }

        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $start) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $end)) {
            $startDate = Carbon::createFromFormat('Y-m-d', $start);
            $endDate = Carbon::createFromFormat('Y-m-d', $end);
            return $startDate->diffInDays($endDate, false) + 1;
        }

        return "فرمت نامعتبر است.";
    }
}
