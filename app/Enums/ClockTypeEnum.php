<?php

namespace App\Enums;

enum ClockTypeEnum: string
{
    case OFFICIAL = 'official';

    case HOMEWORK = 'homework';

    case MISSION = 'mission';
}
