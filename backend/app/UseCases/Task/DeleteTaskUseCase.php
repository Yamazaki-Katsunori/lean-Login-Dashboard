<?php

declare(strict_types=1);

namespace App\UseCases\Task;

use App\Models\User;
use App\Services\Task\TaskService;

final class DeleteTaskUseCase
{
    public function __construct(
        private readonly TaskService $service,
    ) {}

    public function __invoke(User $user, int $taskId): void
    {
        $task = $this->service->findOwnedOrFail($user, $taskId);
        $this->service->delete($task);
    }
}
