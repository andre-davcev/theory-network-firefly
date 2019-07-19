import { initializeApp } from 'firebase-admin';

import { ClustersCreate, ClustersDelete } from './clusters';
import { EventsCreate, EventsDelete } from './events';
import { IconsCreate, IconsDelete } from './icons';
import { ImagesCreate, ImagesDelete } from './images';
// import { StorageResize } from './storage';
import { UserStreamsCreate } from './user-streams';
import { UserSubscriptionsDelete, UserSubscriptionsUpdate } from './user-subscriptions';
import { UsersCreate, UsersDelete } from './users';

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

    UserSubscriptionsDelete,
    UserSubscriptionsUpdate,

    UsersCreate,
    UsersDelete
};

