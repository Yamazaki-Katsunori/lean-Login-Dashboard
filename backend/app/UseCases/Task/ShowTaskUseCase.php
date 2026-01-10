<?php

declare(strict_types=1);

namespace App\UseCases\Task;

use App\Models\Task;
use App\Models\User;
use App\Services\Task\TaskService;

final class ShowTaskUseCase
{
    public function __construct(
        private readonly TaskService $service,
    ) {}

    public function __invoke(User $user, int $taskId): Task
    {
        return $this->service->findOwnedOrFail($user, $taskId);
    }
}
