<?php

namespace App\Enums;

enum SalaryStatusEnum: string
{
    case CONFIRMED = 'confirmed';

    case UNCONFIRMED = 'unconfirmed';

    case CONFIRMING = 'confirming';
}
