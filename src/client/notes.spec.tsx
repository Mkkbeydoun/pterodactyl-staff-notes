import { afterEach, beforeEach, expect, test } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { createExtensionTestHost } from '@pterodactyl/sdk/testing';
import { ServerBanner, UserBanner } from './components/DetailBanner';
import NoteColumn from './components/NoteColumn';
import { noteQuery, notesQuery, type StaffNote } from './api';

let host: ReturnType<typeof createExtensionTestHost>;

beforeEach(() => {
    host = createExtensionTestHost({ extensionId: 'staff-notes', prefix: 'rxsn' });
});

afterEach(() => {
    cleanup();
    host.dispose();
});

const note = (overrides: Partial<StaffNote> = {}): StaffNote => ({
    id: 7,
    flag: 'problem',
    note: 'Two chargebacks in 2026.',
    updated_at: '2026-10-10T08:00:00+00:00',
    updated_by: 'moe',
    ...overrides,
});

const detail = (id: number) => ({ resource: { attributes: { id } } });

test('the server list column shows the flag and note for that server only', async () => {
    host.queryClient.setQueryData(notesQuery('servers').queryKey, [note(), note({ id: 8, flag: 'vip', note: null })]);

    render(<NoteColumn data={{ attributes: { id: 7 } }} />, { wrapper: host.Wrapper });
    expect(await screen.findByText('Problem')).toBeTruthy();
    expect(screen.getByText('Two chargebacks in 2026.')).toBeTruthy();
    cleanup();

    render(<NoteColumn data={{ attributes: { id: 9 } }} />, { wrapper: host.Wrapper });
    await waitFor(() => expect(screen.queryByText('Problem')).toBeNull());
});

test('the detail banner shows who changed the note', async () => {
    host.queryClient.setQueryData(noteQuery('users', 7).queryKey, note({ flag: 'watch' }));
    render(<UserBanner data={detail(7)} />, { wrapper: host.Wrapper });

    expect(await screen.findByText('Watch')).toBeTruthy();
    expect(screen.getByText(/Last changed by moe/)).toBeTruthy();
});

test('no banner without a flag or note', async () => {
    host.queryClient.setQueryData(noteQuery('servers', 3).queryKey, null);
    const { container } = render(<ServerBanner data={detail(3)} />, { wrapper: host.Wrapper });

    await waitFor(() => expect(container.textContent).toBe(''));
});
