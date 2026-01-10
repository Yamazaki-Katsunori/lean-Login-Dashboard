<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\TaskStoreRequest;
use App\Http\Requests\Task\TaskUpdateRequest;
use App\Http\Resources\Task\TaskResource;
use App\UseCases\Task\CreateTaskUseCase;
use App\UseCases\Task\DeleteTaskUseCase;
use App\UseCases\Task\ListTasksUseCase;
use App\UseCases\Task\ShowTaskUseCase;
use App\UseCases\Task\UpdateTaskUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

final class TaskController extends Controller
{
    public function __construct(
        private readonly ListTasksUseCase $listUseCase,
        private readonly CreateTaskUseCase $createUseCase,
        private readonly UpdateTaskUseCase $updateUseCase,
        private readonly DeleteTaskUseCase $deleteUseCase,
        private readonly ShowTaskUseCase $showUseCase,
    ) {}

    public function index(Request $request): AnonymousResourceCollection
    {

        $user = $request->user();
        $tasks = ($this->listUseCase)($user);

        return TaskResource::collection($tasks);
    }

    public function store(TaskStoreRequest $request): JsonResponse
    {
        $user = $request->user();
        $task = ($this->createUseCase)($user, $request->validated());

        return (new TaskResource($task))->response()->setStatusCode(201);
    }

    public function update(TaskUpdateRequest $request, int $task): TaskResource
    {
        $user = $request->user();
        $updated = ($this->updateUseCase)($user, $task, $request->validated());

        return new TaskResource($updated);
    }

    public function destroy(Request $request, int $task): Response
    {
        $user = $request->user();
        ($this->deleteUseCase)($user, $task);

        return response()->noContent();
    }

    public function show(Request $request, int $task): TaskResource
    {

        $user = $request->user();
        $t = ($this->showUseCase)($user, $task);

        return new TaskResource($t);
    }
}
