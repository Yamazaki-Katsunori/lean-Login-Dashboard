<?php

declare(strict_types=1);

namespace App\Services\Task;

use App\Models\Task;
use App\Models\User;
use App\Repositories\Task\TaskRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

final class TaskService
{
    public function __construct(
        private readonly TaskRepositoryInterface $taskRepository,
    ) {}

    /** @return Collection<int, Task> */
    public function listByUser(User $user): Collection
    {
        return $this->taskRepository->listByUser($user);
    }

    public function create(User $user, array $data): Task
    {
        return $this->taskRepository->createForUser($user, $data);
    }

    public function findOwnedOrFail(User $user, int $taskId): Task
    {
        return $this->taskRepository->findOwnedOrFail($user, $taskId);
    }

    public function update(Task $task, array $data): Task
    {
        return $this->taskRepository->update($task, $data);
    }

    public function delete(Task $task): void
    {
        $this->taskRepository->delete($task);
    }
}
