<?php

namespace App\Enums;

enum VacationStatusEnum: string
{
    case CONFIRMED = 'confirmed';

    case UNCONFIRMED = 'unconfirmed';

    case CONFIRMING = 'confirming';
}
