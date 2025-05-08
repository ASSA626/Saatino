<?php

namespace App\Enums;

enum VacationTypesEnum: string
{
    case ENTITLEMENT = 'استحقاقی';

    case ILLNESS = 'استعلاجی';

    case HOURLY = 'ساعتی';

    case WITHOUTSALARY = 'بدون حقوق';
}
