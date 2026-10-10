import './styles.css';
import { definePterodactylExtension } from '@pterodactyl/sdk';
import { ServerBanner, UserBanner } from './components/DetailBanner';
import NoteColumn from './components/NoteColumn';
import NoteFields from './components/NoteFields';

export default definePterodactylExtension({
    setup({ forms, columns, slots }) {
        forms.extend('admin.user', NoteFields);
        forms.extend('admin.server', NoteFields);
        columns.register('admin.servers', { id: 'note', label: 'Staff note', component: NoteColumn });
        slots.register('panel.users.detail.actions', UserBanner);
        slots.register('panel.servers.detail.actions', ServerBanner);
    },
});
