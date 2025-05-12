<?php

namespace App\Helper;

use Hekmatinasser\Verta\Verta;

class CurrentJalaliMonth
{
    public static function getCurrentMonth(): array
    {
        $now = new Verta();

        $startOfMonth = (clone $now)->startMonth();
        $endOfMonth = (clone $now)->endMonth();

        return [
            'start_date' => $startOfMonth->format('Y/m/d'),
            'end_date' => $endOfMonth->format('Y/m/d')
        ];
    }
}
