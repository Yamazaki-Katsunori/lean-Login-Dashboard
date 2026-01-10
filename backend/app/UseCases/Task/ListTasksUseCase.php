<?php

declare(strict_types=1);

namespace App\UseCases\Task;

use App\Models\User;
use App\Services\Task\TaskService;
use Illuminate\Database\Eloquent\Collection;

final class ListTasksUseCase
{
    public function __construct(
        private readonly TaskService $service,
    ) {}

    /** @return Collection<int, \App\Models\Task> */
    public function __invoke(User $user): Collection
    {
        return $this->service->listByUser($user);
    }
}
