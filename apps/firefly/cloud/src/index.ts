import { initializeApp } from 'firebase-admin';

initializeApp();

import { ClustersCreate, ClustersDelete, ClustersUpdate } from './clusters';
import { EventsCreate, EventsDelete, EventsUpdate } from './events';
import { IconsCreate, IconsDelete } from './icons';
import { ImagesCreate, ImagesDelete } from './images';
import { StorageResize } from './storage';
import { UserStreamsCreate } from './user-streams';
import { UserSubscriptionsDelete, UserSubscriptionsUpdate } from './user-subscriptions';
import { UsersCreate, UsersDelete } from './users';
import { ClusterEventsDelete, ClusterEventsUpdate } from './cluster-events';
import { ClusterSubscribersDelete } from './cluster-subscribers';
import { EventClustersDelete } from './event-clusters';
import { IconClustersDelete } from './icon-clusters';
import { ImageEventsDelete } from './image-events';
import { UserAlertsCreate } from './user-alerts';
import { UserClustersDelete } from './user-clusters';
import { UserEventsDelete } from './user-events';
import { UserIconsDelete } from './user-icons';
import { UserImagesDelete } from './user-images';

export
{
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

    ImageEventsDelete,

    ImagesCreate,
    ImagesDelete,

    // StorageResize,

    // UserAlertsCreate,

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

