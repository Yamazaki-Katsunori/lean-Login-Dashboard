<?php

declare(strict_types=1);

namespace App\UseCases\Task;

use App\Models\Task;
use App\Models\User;
use App\Services\Task\TaskService;

final class UpdateTaskUseCase
{
    public function __construct(
        private readonly TaskService $service,
    ) {}

    public function __invoke(User $user, int $taskId, array $data): Task
    {
        $task = $this->service->findOwnedOrFail($user, $taskId);

        return $this->service->update($task, $data);
    }
}
