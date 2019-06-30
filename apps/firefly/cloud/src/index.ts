import { initializeApp } from 'firebase-admin';

import { UsersCreate } from './users';
import { EventsCreate } from './events';
import { ClustersCreate } from './clusters';
import { IconsCreate } from './icons';
import { ImagesCreate } from './images';
// import { StorageResize } from './storage';
import { StreamGenerate } from './stream';

initializeApp();

exports.ClustersCreate = ClustersCreate;
// exports.ClustersUpdate = ClustersUpdate;

exports.EventsCreate = EventsCreate;
// exports.EventsUpdate = EventsUpdate;

exports.IconsCreate = IconsCreate;
// exports.IconsUpdate = IconsUpdate;

exports.ImagesCreate = ImagesCreate;
// exports.ImagesUpdate = ImagesUpdate;

// exports.StorageResize = StorageResize;

exports.StreamGenerate = StreamGenerate;

exports.UserCreate = UsersCreate;
// exports.UserUpdate = UsersUpdate;
