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
import { ClusterEventsDelete, ClusterEventsUpdate } from './cluster-events';
import { ClusterSubscribersDelete } from './cluster-subscribers';
import { EventClustersDelete } from './event-clusters';
import { IconClustersDelete } from './icon-clusters';
import { ImageEventsDelete } from './image-events';
import { UserAlertsCreate, UserAlertsDelete, UserAlertsUpdate } from './user-alerts';
import { UserClustersDelete } from './user-clusters';
import { UserEventsDelete } from './user-events';
import { UserIconsDelete } from './user-icons';
import { UserImagesDelete } from './user-images';
import { AlertsCreate } from './alerts';

export
{
    AlertsCreate,

    ClusterEventsDelete,
    ClusterEventsUpdate,

    ClusterSubscribersDelete,

    ClustersCreate,
    ClustersDelete,
    ClustersUpdate,

    EventClustersDelete,

    EventsCreate,
    EventsDelete,
    EventsUpdate,

    IconClustersDelete,

    IconsCreate,
    IconsDelete,
    IconsUpdate,

    ImageEventsDelete,

    ImagesCreate,
    ImagesDelete,
    ImagesUpdate,

    StorageResize,

    // UserAlertsCreate,
    UserAlertsDelete,
    UserAlertsUpdate,

    UserClustersDelete,

    UserEventsDelete,

    UserIconsDelete,

    UserImagesDelete,

    UserStreamsCreate,

    UserSubscriptionsDelete,
    UserSubscriptionsUpdate,

    UsersCreate,
    UsersDelete
};

