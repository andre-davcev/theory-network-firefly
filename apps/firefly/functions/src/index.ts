import 'reflect-metadata';
import { ReflectiveInjector } from 'injection-js';

import { Config } from './theory';
import { EntityUsers, EntityAlerts, EntityClusters } from './firefly';

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

exports.UserCreate = entityUsers.create();
exports.UserUpdate = entityUsers.update();

exports.AlertCreate = entityAlerts.create();
exports.AlertUpdate = entityAlerts.update();

exports.ClusterCreate = entityClusters.create();
exports.ClusterUpdate = entityClusters.update();
