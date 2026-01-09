<?php

declare(strict_types=1);

namespace App\Services\Auth;

use Illuminate\Http\Request;

final class SessionService
{
    public function regenerate(Request $request): void
    {
        $request->session()->regenerate();
    }

    public function invalidate(Request $request): void
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
