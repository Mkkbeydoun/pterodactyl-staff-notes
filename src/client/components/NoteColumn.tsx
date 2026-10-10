import { useQuery } from '@tanstack/react-query';
import { notesQuery } from '../api';
import FlagBadge from './FlagBadge';

/** The "Staff note" cell in the admin server list. */
export default function NoteColumn({ data }: { data: { attributes: { id: number } } }) {
    const { data: notes } = useQuery(notesQuery('servers'));
    const note = notes?.find((n) => n.id === data.attributes.id);

    if (!note) return null;

    return (
        <span className='rxsn:inline-flex rxsn:max-w-56 rxsn:items-center rxsn:gap-2' title={note.note ?? undefined}>
            <FlagBadge flag={note.flag} />
            {note.note && <span className='rxsn:truncate rxsn:text-sm rxsn:text-muted-foreground'>{note.note}</span>}
        </span>
    );
}
