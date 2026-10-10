<?php

namespace RustixDev\StaffNotes\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Pterodactyl\Models\User;

/**
 * @property int $id
 * @property string $subject_type user or server
 * @property int $subject_id
 * @property string $flag
 * @property string|null $note
 * @property int|null $updated_by
 */
class StaffNote extends Model
{
    protected $table = 'ext_staff_notes';

    protected $fillable = ['subject_type', 'subject_id', 'flag', 'note', 'updated_by'];

    public const array FLAGS = ['none', 'vip', 'watch', 'problem'];

    public function editor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /** @return array{flag: string, note: string|null} */
    public static function valuesFor(string $type, ?int $id): array
    {
        $note = $id === null ? null : self::query()->where('subject_type', $type)->where('subject_id', $id)->first();

        return ['flag' => $note->flag ?? 'none', 'note' => $note?->note];
    }

    /** @param array{flag?: string|null, note?: string|null} $values */
    public static function store(string $type, int $id, array $values, ?User $admin): void
    {
        $flag = $values['flag'] ?? 'none';
        $note = trim((string) ($values['note'] ?? ''));
        $query = self::query()->where('subject_type', $type)->where('subject_id', $id);

        if ($flag === 'none' && $note === '') {
            $query->delete();

            return;
        }

        $existing = $query->first();
        if ($existing && $existing->flag === $flag && (string) $existing->note === $note) {
            return;
        }

        self::query()->updateOrCreate(
            ['subject_type' => $type, 'subject_id' => $id],
            ['flag' => $flag, 'note' => $note === '' ? null : $note, 'updated_by' => $admin?->id],
        );
    }

    /** @return array<string, mixed> */
    public function toPayload(): array
    {
        return [
            'id' => $this->subject_id,
            'flag' => $this->flag,
            'note' => $this->note,
            'updated_at' => $this->updated_at?->toIso8601String(),
            'updated_by' => $this->editor?->username,
        ];
    }
}
