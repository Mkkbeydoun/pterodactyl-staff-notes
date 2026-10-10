<?php

namespace RustixDev\StaffNotes\Http\Controllers;

use Illuminate\Http\JsonResponse;
use RustixDev\StaffNotes\Models\StaffNote;

class NoteController
{
    /** Every flagged or noted server or user, for the server list column. */
    public function index(string $type): JsonResponse
    {
        abort_unless(in_array($type, ['users', 'servers'], true), 404);

        $notes = StaffNote::query()->with('editor:id,username')->where('subject_type', rtrim($type, 's'))->get();

        return new JsonResponse(['data' => $notes->map->toPayload()->values()]);
    }

    public function show(string $type, int $id): JsonResponse
    {
        abort_unless(in_array($type, ['users', 'servers'], true), 404);

        $note = StaffNote::query()->with('editor:id,username')
            ->where('subject_type', rtrim($type, 's'))->where('subject_id', $id)->first();

        return new JsonResponse(['data' => $note?->toPayload()]);
    }
}
