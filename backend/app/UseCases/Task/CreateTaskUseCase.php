<?php

declare(strict_types=1);

namespace App\UseCases\Task;

use App\Models\Task;
use App\Models\User;
use App\Services\Task\TaskService;

final class CreateTaskUseCase
{
    public function __construct(
        private readonly TaskService $service,
    ) {}

    public function __invoke(User $user, array $data): Task
    {
        return $this->service->create($user, $data);
    }
}
