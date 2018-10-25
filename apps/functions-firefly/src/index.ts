import 'reflect-metadata';
import { ReflectiveInjector } from 'injection-js';

import { Config } from '@theory/firebase/functions';
import { EntityUsers, EntityAlerts, EntityClusters } from '@firefly/functions';

const injector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate
([
    Config,
    EntityClusters,
    EntityAlerts,
    EntityUsers
]);

const entityClusters: EntityClusters = injector.get(EntityClusters);
const entityAlerts: EntityAlerts = injector.get(EntityAlerts);
const entityUsers: EntityUsers = injector.get(EntityUsers);

exports.UserCreate = entityUsers.create;
exports.UserUpdate = entityUsers.update;

exports.AlertCreate = entityAlerts.create;
exports.AlertUpdate = entityAlerts.update;

exports.UserCreate = entityClusters.create;
exports.UserUpdate = entityClusters.update;
