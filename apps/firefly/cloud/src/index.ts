import { initializeApp } from 'firebase-admin';

initializeApp();

import { ClustersCreate, ClustersDelete } from './clusters';
import { EventsCreate, EventsUpdate } from './events';
import { IconsCreate, IconsDelete } from './icons';
import { ImagesCreate, ImagesDelete } from './images';
import { StorageResize } from './storage';
import { StreamsCron } from './streams';
import { UsersCreate, UsersDelete } from './users';
import { AlertsCreate } from './alerts';
import { CitiesCreate } from './cities';

export
{
    AlertsCreate,

    CitiesCreate,

    ClustersCreate,
    ClustersDelete,

    EventsCreate,
    EventsUpdate,

    IconsCreate,
    IconsDelete,

    ImagesCreate,
    ImagesDelete,

    StorageResize,

    StreamsCron,

    UsersCreate,
    UsersDelete
};

