<?php

namespace App\Helper;

use DateTime;
use Hekmatinasser\Verta\Verta;

class DateConverterHelper
{
    /**
     * Exchange shamsi date to miladi
     *
     * @param $date
     * @return string
     */
    public static function shamsi_to_miladi($date): string
    {
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            return $date;
        }
        $s_year = Verta::parse($date)->year;
        $s_month = Verta::parse($date)->month;
        $s_day = Verta::parse($date)->day;
        $start_date = Verta::jalaliToGregorian($s_year, $s_month, $s_day);
        $date = strtotime($start_date[0] . '/' . $start_date[1] . '/' . $start_date[2]);
        return date('Y-m-d', $date);
    }

    /**
     * Exchange miladi date to shamsi
     *
     * @param $date
     * @return string
     */
    public static function miladi_to_shamsi($date): string
    {
        $s_year = Verta::parse($date)->year;
        $s_month = Verta::parse($date)->month;
        $s_day = Verta::parse($date)->day;
        $start_date = Verta::GregorianToJalali($s_year, $s_month, $s_day);

        return sprintf('%04d/%02d/%02d', $start_date[0], $start_date[1], $start_date[2]);
    }
}
