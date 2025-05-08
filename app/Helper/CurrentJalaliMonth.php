<?php

namespace App\Helper;

use Hekmatinasser\Verta\Verta;

class CurrentJalaliMonth
{
    public static function getCurrentMonth(): array
    {
        $now = new Verta();

        // تنظیم روز به اول ماه جاری
        $startOfMonth = (clone $now)->startMonth();

        // تنظیم روز به آخر ماه جاری
        $endOfMonth = (clone $now)->endMonth();

        return [
            'start_date' => $startOfMonth->format('Y/m/d'), // با اسلش
            'end_date' => $endOfMonth->format('Y/m/d')      // با اسلش
        ];
    }
}
