<?php

namespace App\Actions;

use App\Helper\CurrentJalaliMonth;
use App\Helper\DateConverterHelper;
use App\Models\User;
use App\Models\Vacation;
use Carbon\Carbon;
use Hekmatinasser\Verta\Verta;
use Illuminate\Database\Eloquent\Collection;

class VacationReportDataAction
{
    protected int $yearlyVacationAllowance = 30;

    protected int $workHoursPerDay = 8;

    public function execute(int $user_id, ?string $startDate = null, ?string $endDate = null): array
    {
        [$startDate, $endDate] = $this->determineDateRange($startDate, $endDate);
        $usedInRange = $this->calculateUsedVacationsInRange($user_id, $startDate, $endDate);
        $totalUsedInYear = $this->calculateTotalUsedVacationsInYear($user_id);

        $remaining = $this->yearlyVacationAllowance - $totalUsedInYear;
        $remaining = max(0, $remaining);

        return [
            'used_in_daterange' => $usedInRange,
            'remaining' => $remaining,
            'total_used_in_year' => $totalUsedInYear
        ];
    }

    protected function determineDateRange(?string $startDate, ?string $endDate): array
    {
        if ($startDate && $endDate) {
            return [$startDate, $endDate];
        }

        $jalali = CurrentJalaliMonth::getCurrentMonth();
        $startJalali = $jalali['start_date'];
        $endJalali = $jalali['end_date'];

        $start = DateConverterHelper::shamsi_to_miladi($startJalali);
        $end = DateConverterHelper::shamsi_to_miladi($endJalali);

        return [$start, $end];
    }

    protected function calculateUsedVacationsInRange(int $userId, string $startDate, string $endDate): float
    {
        $vacations = $this->getUserVacations($userId, $startDate, $endDate);

        return $this->calculateVacationDays($vacations);
    }

    protected function calculateTotalUsedVacationsInYear(int $userId): float
    {
        $persianYear = Verta::now()->year;
        $startOfYear = Verta::parse($persianYear . '/01/01')->datetime()->format('Y-m-d');
        $endOfYear = Verta::parse($persianYear . '/12/29')->datetime()->format('Y-m-d');

        $vacations = $this->getUserVacations($userId, $startOfYear, $endOfYear);

        return $this->calculateVacationDays($vacations);
    }

    protected function getUserVacations(int $userId, string $startDate, string $endDate): Collection
    {
        return Vacation::query()
            ->where('user_id', $userId)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();
    }

    protected function calculateVacationDays(Collection $vacations): float
    {
        return $vacations->reduce(function ($total, $vacation) {
            $startDate = $vacation->start_date;
            $endDate = $vacation->end_date;

            if ($this->isDateFormat($startDate) && $this->isDateFormat($endDate)) {
                $days = Carbon::parse($startDate)->diffInDays(Carbon::parse($endDate)) + 1;
                return $total + $days;
            } else if ($this->isTimeFormat($startDate) && $this->isTimeFormat($endDate)) {
                $hours = $this->calculateHoursDifference($startDate, $endDate);
                return $total + ($hours / $this->workHoursPerDay);
            } else {
                return $total;
            }
        }, 0.0);
    }

    protected function isDateFormat(string $value): bool
    {
        return preg_match('/^\d{4}-\d{2}-\d{2}(\s|T|\s\d{2}:\d{2}(:\d{2})?)?/', $value);
    }

    protected function isTimeFormat(string $value): bool
    {
        return preg_match('/^\d{1,2}:\d{2}(:\d{2})?$/', $value);
    }

    protected function calculateHoursDifference(string $startTime, string $endTime): float
    {
        $start = Carbon::createFromFormat('H:i', substr($startTime, 0, 5));
        $end = Carbon::createFromFormat('H:i', substr($endTime, 0, 5));

        if ($end < $start) {
            $end->addDay();
        }

        return $start->diffInMinutes($end) / 60;
    }
}
