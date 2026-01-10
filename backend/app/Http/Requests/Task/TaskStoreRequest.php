<?php

declare(strict_types=1);

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

final class TaskStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // 認証は middleware で担保
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'is_done' => ['sometimes', 'boolean'],
        ];
    }
}
