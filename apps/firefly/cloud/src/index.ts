import { initializeApp } from 'firebase-admin';

import { ClustersCreate, ClustersDelete } from './clusters';
import { EventsCreate, EventsDelete } from './events';
import { IconsCreate, IconsDelete } from './icons';
import { ImagesCreate, ImagesDelete } from './images';
// import { StorageResize } from './storage';
import { UserStreamsCreate } from './user-streams';
import { UsersCreate } from './users';

initializeApp();

export
{
    ClustersCreate,
    ClustersDelete,

    EventsCreate,
    EventsDelete,

    IconsCreate,
    IconsDelete,

    ImagesCreate,
    ImagesDelete,

    // StorageResize,

    UserStreamsCreate,
    UsersCreate
    // UsersUpdate
};

