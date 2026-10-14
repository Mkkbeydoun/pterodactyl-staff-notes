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

- Pterodactyl Panel v2.0.0-beta.1 or later
- PHP 8.3+

## Install

1. Download `staff-notes-<version>.pteroext` from the [latest release](https://github.com/Rustix-Development/pterodactyl-staff-notes/releases/latest).
2. In the panel, open **Admin → Extensions**, upload the file and enable it.
3. Reload the panel.

From a terminal instead:

```sh
php artisan p:extension:install /path/to/staff-notes-<version>.pteroext --enable
```

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

Remove it under **Admin → Extensions**, or from a terminal:

```sh
php artisan p:extension:remove staff-notes
```

## License

MIT. See [LICENSE](LICENSE).

This is a community extension and is not affiliated with or endorsed by Pterodactyl.
