<?php

declare(strict_types=1);

namespace App\UseCases\Auth;

use App\Services\Auth\SessionAuthService;
use Illuminate\Contracts\Auth\Authenticatable;

final class MeUseCase
{
    public function __construct(
        private readonly SessionAuthService $auth,
    ) {}

    public function __invoke(): ?Authenticatable
    {
        return $this->auth->user();
    }
}
