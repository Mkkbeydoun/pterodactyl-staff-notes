# Staff Notes

Private admin notes and flags (VIP, watch, problem) on users and servers, shown on their admin pages and in the server list.

## Features

- **A flag and a private note on every user and server**: No flag, VIP, Watch or Problem, plus up to 5,000 characters of notes. They are part of the admin user and server forms and save with them.
- **Banners on admin pages**: a flagged or noted user or server shows a coloured banner at the top of its admin page, with who changed it last and when.
- **Server list column**: the admin server list gets a "Staff note" column with the flag and the start of the note.
- **Admins only**: customers and subusers never see notes. The API routes are root-admin only.
- **API**: values are returned and accepted under `extensions.staff-notes` on the admin API's user and server endpoints.

## API

| Method | Path | Who |
|---|---|---|
| GET | `/api/admin/extensions/staff-notes/{users\|servers}` | Root admins (every noted user or server) |
| GET | `/api/admin/extensions/staff-notes/{users\|servers}/{id}` | Root admins |
| PUT | The admin API's user and server update endpoints, with `extensions.staff-notes.flag` and `.note` | Root admins |

## Requirements

- Pterodactyl Panel 2.0 (2.0-develop or later)
- PHP 8.3+

## Install

From a release archive (`staff-notes-1.0.0.pteroext`):

```sh
php artisan p:extension:install /path/to/staff-notes-1.0.0.pteroext --enable
```

Or upload the archive under **Admin → Extensions**. Reload the panel afterwards.

## Build from source

```sh
npm install
npm run typecheck
npm test
npm run build
php artisan p:extension:doctor /path/to/staff-notes
php artisan p:extension:pack /path/to/staff-notes
```

## Uninstall

```sh
php artisan p:extension:remove staff-notes
```
