<?php

declare(strict_types=1);

namespace App\Repositories\Task;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface TaskRepositoryInterface
{
    /** @return Collection<int, Task> */
    public function listByUser(User $user): Collection;

    public function createForUser(User $user, array $data): Task;

    public function findOwnedOrFail(User $user, int $taskId): Task;

    public function update(Task $task, array $data): Task;

    public function delete(Task $task): void;
}
