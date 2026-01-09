<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\UseCases\Auth\LoginUseCase;
use App\UseCases\Auth\LogoutUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function __construct(
        private readonly LoginUseCase $loginUseCase,
        private readonly LogoutUseCase $logoutUseCase,
    ) {}

    /**
     * ログイン処理
     *
     * @param  LoginRequest  $request
     * @return JsonResponse|Response
     */
    public function login(LoginRequest $request): JsonResponse|Response
    {

        $credentials = $request->validated();

        $isAuth = ($this->loginUseCase)($request, $credentials);

        if (! $isAuth) {
            return response()->json(['message' => 'Invalid credentials'], 422);
        }

        return response()->noContent();
    }

    /**
     * ログアウト処理
     *
     * @param  Request  $request
     * @return Response
     */
    public function logout(Request $request): Response
    {
        ($this->logoutUseCase)($request);

        return response()->noContent();
    }
}
