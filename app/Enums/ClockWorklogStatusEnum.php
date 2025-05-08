<?php

namespace App\Enums;

enum ClockWorklogStatusEnum: string
{
    case INSERTED = 'inserted';

    case UNINSTRUCTED = 'uninstructed';

    case INSERTING = 'inserting';

    case UNCOMPLETED = 'uncompleted';
}
