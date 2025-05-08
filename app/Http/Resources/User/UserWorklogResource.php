<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserWorklogResource extends JsonResource
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
            'clock_id' => $this->clock_id,
            'project_id' => $this->project_id,
            'time_value' => $this->time_value ?? 0,
            'project' => $this->when($this->project, function () {
                return UserProjectResource::make($this->project);
            }),
        ];
    }
}
