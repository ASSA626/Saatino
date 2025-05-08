<?php

namespace App\Helper;

class MathCalculatorHelper
{
    public static function calculate($count, $value): float|int
    {
        return $value * $count;
    }
}
