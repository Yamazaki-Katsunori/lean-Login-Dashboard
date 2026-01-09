<?php

declare(strict_types=1);

namespace App\UseCases\Auth;

use App\Services\Auth\SessionAuthService;
use App\Services\Auth\SessionService;
use Illuminate\Http\Request;

final class LoginUseCase
{
    public function __construct(
        private readonly SessionAuthService $auth,
        private readonly SessionService $session,
    ) {}

    public function __invoke(Request $request, array $credentials): bool
    {
        if (! $this->auth->attempt($credentials, true)) {
            return false;
        }

        $this->session->regenerate($request);

        return true;
    }
}
