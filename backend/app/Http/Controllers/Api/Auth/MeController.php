<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\UseCases\Auth\MeUseCase;
use Illuminate\Http\JsonResponse;

class MeController extends Controller
{
    public function __construct(
        private readonly MeUseCase $meUseCase,
    ) {}

    public function __invoke(): JsonResponse
    {
        return response()->json(($this->meUseCase)());
    }
}
