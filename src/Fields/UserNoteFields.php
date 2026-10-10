<?php

namespace RustixDev\StaffNotes\Fields;

use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Validation\Rule;
use Pterodactyl\Extensions\Fields;
use Pterodactyl\Models\User;
use RustixDev\StaffNotes\Models\StaffNote;

/** The flag and note on the admin user form. Only root admins can reach these forms. */
final class UserNoteFields extends Fields
{
    public function rules(): array
    {
        return [
            'flag' => ['nullable', Rule::in(StaffNote::FLAGS)],
            'note' => ['nullable', 'string', 'max:5000'],
        ];
    }

    public function values(User $user): array
    {
        return StaffNote::valuesFor('user', $user->id);
    }

    public function save(User $user, array $values, #[CurrentUser] ?User $admin = null): void
    {
        StaffNote::store('user', $user->id, $values, $admin);
    }

    public function attributes(): array
    {
        return ['flag' => 'flag', 'note' => 'staff note'];
    }
}
