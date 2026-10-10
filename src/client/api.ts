import { queryOptions } from '@tanstack/react-query';
import { http } from '@pterodactyl/sdk';

export type Flag = 'none' | 'vip' | 'watch' | 'problem';
export type Subject = 'users' | 'servers';

export interface StaffNote {
    id: number;
    flag: Flag;
    note: string | null;
    updated_at: string | null;
    updated_by: string | null;
}

const BASE = '/api/admin/extensions/staff-notes';

export const notesQuery = (type: Subject) =>
    queryOptions({
        queryKey: ['staff-notes', type],
        queryFn: async () => (await http.get<{ data: StaffNote[] }>(`${BASE}/${type}`)).data.data,
        staleTime: 30_000,
    });

export const noteQuery = (type: Subject, id: number) =>
    queryOptions({
        queryKey: ['staff-notes', type, id],
        queryFn: async () => (await http.get<{ data: StaffNote | null }>(`${BASE}/${type}/${id}`)).data.data,
    });

export const FLAGS: { value: Flag; label: string }[] = [
    { value: 'none', label: 'No flag' },
    { value: 'vip', label: 'VIP' },
    { value: 'watch', label: 'Watch' },
    { value: 'problem', label: 'Problem' },
];

export const FLAG_LABEL: Record<Flag, string> = { none: '', vip: 'VIP', watch: 'Watch', problem: 'Problem' };
