<?php

declare(strict_types=1);

namespace App\Services\Auth;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;

final class SessionAuthService
{
    /**
     * 認証検証処理
     */
    public function attempt(array $credentials, bool $remember = true): bool
    {
        return Auth::guard('web')->attempt($credentials, $remember);
    }

    /**
     * logout処理
     */
    public function logout(): void
    {
        Auth::guard('web')->logout();
    }

    /**
     * 認証ユーザーを取得する処理
     */
    public function user(): ?Authenticatable
    {
        return Auth::guard('web')->user();
    }
}
