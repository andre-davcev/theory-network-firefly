import { initializeApp } from 'firebase-admin';

initializeApp();

import { ClustersCreate, ClustersDelete, ClustersUpdate } from './clusters';
import { EventsCreate, EventsDelete, EventsUpdate } from './events';
import { IconsCreate, IconsDelete, IconsUpdate } from './icons';
import { ImagesCreate, ImagesDelete, ImagesUpdate } from './images';
import { StorageResize } from './storage';
import { UserStreamsCreate } from './user-streams';
import { UserSubscriptionsDelete, UserSubscriptionsUpdate } from './user-subscriptions';
import { UsersCreate, UsersDelete } from './users';
import { ClusterSubscribersDelete } from './cluster-subscribers';
import { AlertsCreate } from './alerts';

export
{
    AlertsCreate,

    ClusterSubscribersDelete,

    ClustersCreate,
    ClustersDelete,
    ClustersUpdate,

    EventsCreate,
    EventsDelete,
    EventsUpdate,

    IconsCreate,
    IconsDelete,
    IconsUpdate,

    ImagesCreate,
    ImagesDelete,
    ImagesUpdate,

    StorageResize,

    UserStreamsCreate,

    UserSubscriptionsDelete,
    UserSubscriptionsUpdate,

    UsersCreate,
    UsersDelete
};

