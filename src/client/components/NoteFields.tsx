import { Label, Select, TextArea, type FormExtension } from '@pterodactyl/sdk';
import { FLAGS, type Flag } from '../api';

type Values = { flag: Flag | null; note: string | null };

/** The flag and note on the admin user and server forms. */
const NoteFields: FormExtension<Values> = ({ field }) => {
    const flag = field('flag');
    const note = field('note');

    return (
        <div className='rxsn:flex rxsn:flex-col rxsn:gap-4'>
            <div>
                <Label htmlFor={flag.id}>Flag</Label>
                <Select
                    id={flag.id}
                    value={flag.value ?? 'none'}
                    options={FLAGS}
                    onChange={(value) => flag.setValue(value as Flag)}
                />
                {flag.error && <p className='input-help error'>{flag.error}</p>}
            </div>
            <div>
                <Label htmlFor={note.id}>Staff note</Label>
                <TextArea
                    id={note.id}
                    rows={4}
                    maxLength={5000}
                    value={note.value ?? ''}
                    onChange={(event) => note.setValue(event.target.value)}
                />
                <p className='rxsn:mt-1 rxsn:text-xs rxsn:text-muted-foreground'>
                    Only admins see this. The customer never does.
                </p>
                {note.error && <p className='input-help error'>{note.error}</p>}
            </div>
        </div>
    );
};

export default NoteFields;
