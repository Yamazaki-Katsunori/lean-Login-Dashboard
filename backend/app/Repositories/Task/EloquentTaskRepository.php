<?php

declare(strict_types=1);

namespace App\Repositories\Task;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

final class EloquentTaskRepository implements TaskRepositoryInterface
{
    /** @return Collection<int, Task> */
    public function listByUser(User $user): Collection
    {
        return Task::query()
            ->where('user_id', $user->id)
            ->orderByDesc('id')
            ->get();
    }

    public function createForUser(User $user, array $data): Task
    {
        return Task::create([
            'user_id' => $user->id,
            'title' => $data['title'],
            'is_done' => $data['is_done'] ?? false,
        ]);
    }

    public function findOwnedOrFail(User $user, int $taskId): Task
    {
        return Task::query()
            ->where('user_id', $user->id)
            ->where('id', $taskId)
            ->firstOrFail();
    }

    public function update(Task $task, array $data): Task
    {
        $task->fill($data);
        $task->save();

        return $task;
    }

    public function delete(Task $task): void
    {
        $task->delete();
    }
}
