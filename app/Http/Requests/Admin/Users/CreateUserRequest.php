<?php

namespace App\Http\Requests\Admin\Users;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|unique:users',
            'image' => 'string|nullable',
            'username' => 'required|unique:users',
            'mobile' => 'required|unique:users',
            'national_code' => 'required|unique:users',
            'father_name' => 'required',
            'zip' => 'nullable|unique:users',
            'personally_code' => 'nullable|unique:users',
            'bimeh_code' => 'nullable|unique:users',
            'landing_phone' => 'nullable|unique:users',
            'mobile_friend' => 'required|unique:users',
            'address' => 'required',
            'role_direction' => 'required',
            'password' => 'required|min:3|max:25',
        ];
    }
}
