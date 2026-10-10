import { useQuery } from '@tanstack/react-query';
import { Alert } from '@pterodactyl/sdk';
import { FLAG_LABEL, noteQuery, type Subject } from '../api';

const TYPE = { vip: 'success', watch: 'warning', problem: 'danger', none: 'info' } as const;

function Banner({ type, id }: { type: Subject; id: number }) {
    const { data: note } = useQuery(noteQuery(type, id));

    if (!note || (note.flag === 'none' && !note.note)) return null;

    const title = note.flag === 'none' ? 'Staff note' : `${FLAG_LABEL[note.flag]}`;
    const by = [note.updated_by, note.updated_at && new Date(note.updated_at).toLocaleDateString()].filter(Boolean).join(', ');

    return (
        <Alert type={TYPE[note.flag]} title={title} className='rxsn:mb-4'>
            {note.note && <p className='rxsn:whitespace-pre-line'>{note.note}</p>}
            {by && <p className='rxsn:mt-1 rxsn:text-xs rxsn:opacity-80'>Last changed by {by}</p>}
        </Alert>
    );
}

type Detail = { data: { resource: { attributes: { id?: number } } } };

export const UserBanner = ({ data }: Detail) =>
    data.resource.attributes.id === undefined ? null : <Banner type='users' id={data.resource.attributes.id} />;

export const ServerBanner = ({ data }: Detail) =>
    data.resource.attributes.id === undefined ? null : <Banner type='servers' id={data.resource.attributes.id} />;
