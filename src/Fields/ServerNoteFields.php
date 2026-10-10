<?php

namespace RustixDev\StaffNotes\Fields;

use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Validation\Rule;
use Pterodactyl\Extensions\Fields;
use Pterodactyl\Models\Server;
use Pterodactyl\Models\User as Admin;
use RustixDev\StaffNotes\Models\StaffNote;

/** The flag and note on the admin server form. Only root admins can reach these forms. */
final class ServerNoteFields extends Fields
{
    public function rules(): array
    {
        return [
            'flag' => ['nullable', Rule::in(StaffNote::FLAGS)],
            'note' => ['nullable', 'string', 'max:5000'],
        ];
    }

    public function values(Server $server): array
    {
        return StaffNote::valuesFor('server', $server->id);
    }

    public function save(Server $server, array $values, #[CurrentUser] ?Admin $admin = null): void
    {
        StaffNote::store('server', $server->id, $values, $admin);
    }

    public function attributes(): array
    {
        return ['flag' => 'flag', 'note' => 'staff note'];
    }
}
