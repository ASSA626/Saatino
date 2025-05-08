<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserClockResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'start_clock' => $this->start_clock,
            'left_clock' => $this->left_clock,
            'time_value' => $this->time_value ?? 0,
            'worklog_status' => $this->worklog_status,
            'worklogs' => UserWorklogResource::collection($this->whenLoaded('worklog')),
        ];
    }
}
