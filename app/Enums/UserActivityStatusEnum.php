<?php

namespace App\Enums;

enum UserActivityStatusEnum: string
{
    case ACTIVE = 'active';

    case INACTIVE = 'inactive';

    case BANNED = 'banned';
}
