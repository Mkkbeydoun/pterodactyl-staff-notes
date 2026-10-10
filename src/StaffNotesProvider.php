<?php

namespace RustixDev\StaffNotes;

use Pterodactyl\Extensions\ExtensionProvider;
use Pterodactyl\Models\Server;
use Pterodactyl\Models\User;
use RustixDev\StaffNotes\Fields\ServerNoteFields;
use RustixDev\StaffNotes\Fields\UserNoteFields;

class StaffNotesProvider extends ExtensionProvider
{
    public function boot(): void
    {
        // routes/admin.php: notes for the server list column and the detail page banners.
        $this->registerApiRoutes();

        $this->registerFields(User::class, UserNoteFields::class);
        $this->registerFields(Server::class, ServerNoteFields::class);
    }
}
