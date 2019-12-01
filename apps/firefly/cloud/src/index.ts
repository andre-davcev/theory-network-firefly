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
import { UserAlertsDelete, UserAlertsUpdate } from './user-alerts';
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

    // UserAlertsCreate,
    UserAlertsDelete,
    UserAlertsUpdate,

    UserStreamsCreate,

    UserSubscriptionsDelete,
    UserSubscriptionsUpdate,

    UsersCreate,
    UsersDelete
};

