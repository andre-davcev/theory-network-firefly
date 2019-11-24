
import { of } from 'rxjs';
import { Action, State, StateContext, Store } from '@ngxs/store';

import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { Cluster } from '@firefly/core/models';
import { ServiceClusters } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state/user';
import { ActionIconCreate, StateIcon } from '@firefly/core/state/icon';

import { StateClusterModel } from './cluster.state.model';
import { StateClusterOptions } from './cluster.state.options';
import {
    ActionClusterReset,
    ActionClusterGet,
    ActionClusterSet,
    ActionClusterPatch,
    ActionClusterCreate,
    ActionClusterSave,
    ActionClusterDelete,
    ActionClusterSetId,
    ActionClusterIconAdd,
    ActionClusterIconRemove
} from './cluster.actions';
import { ActionClusterSubscribersReset } from '../cluster-subscribers/cluster-subscribers.actions';
import { ActionUserClustersAdd, ActionUserClustersRemove, StateUserClusters, ActionUserClustersSync } from '../user-clusters';
import { ActionUserStreamRemove } from '../user-stream/user-stream.actions';
import { ActionUserSubscriptionsRemove } from '../user-subscriptions/user-subscriptions.actions';
import { firestore } from 'firebase/app';

@State<StateClusterModel>(StateClusterOptions)

export class StateCluster extends StateDocument<Cluster, StateClusterModel>
{
    constructor
    (
        private store: Store,
        service: ServiceClusters
    )
    {
        super
        (
            'clusters',
            StateClusterOptions.defaults,
            service,
            {
                version     : undefined,
                id          : undefined,
                dateCreated : undefined,
                dateUpdated : undefined,

                userId      : undefined,
                name        : null,
                description : null,
                private     : false,
                draft       : false,

                tagline         : null,
                iconId          : undefined,
                iconUrl         : null,
                eventCount      : 0,
                subscriberCount : 0
            },
            {
                ActionReset:  ActionClusterReset,
                ActionGet:    ActionClusterGet,
                ActionSet:    ActionClusterSet,
                ActionPatch:  ActionClusterPatch,
                ActionCreate: ActionClusterCreate,
                ActionSave:   ActionClusterSave,
                ActionDelete: ActionClusterDelete,

                ActionsReset:  [ActionClusterSubscribersReset],
                ActionsCreate: [ActionIconCreate],

                ActionsQueryAdd:    [ActionUserClustersAdd],
                ActionsQueryRemove: [ActionUserClustersRemove, ActionUserStreamRemove, ActionUserSubscriptionsRemove],
                ActionsQuerySync:   [ActionUserClustersSync]
            }
        );
    }

    @Action(ActionClusterReset)
    reset(context: StateContext<StateClusterModel>)
    {
        return super.reset(context)
    }

    @Action(ActionClusterGet)
    get(context: StateContext<StateClusterModel>, action: ActionClusterGet)
    {
        return super.get(context, action);
    }

    @Action(ActionClusterSet)
    set(context: StateContext<StateClusterModel>, action: ActionClusterSet)
    {
        return super.set(context, action);
    }

    @Action(ActionClusterPatch)
    patch(context : StateContext<StateClusterModel>, action: ActionClusterPatch)
    {
        return super.patch(context, action);
    }

    @Action(ActionClusterCreate)
    create(context: StateContext<StateClusterModel>)
    {
        return super.create(context);
    }

    @Action(ActionClusterSave)
    save(context: StateContext<StateClusterModel>)
    {
        return super.save(context);
    }

    @Action(ActionClusterDelete)
    delete(context: StateContext<StateClusterModel>)
    {
        return super.delete(context);
    }

    @Action(ActionClusterSetId)
    setId({ dispatch }: StateContext<StateClusterModel>, { id }: ActionClusterSetId)
    {
        const isNew: boolean = id === CoreEnum.IdNew;

        const userId:   string                     = this.store.selectSnapshot(StateUser.id);
        const snapshot: firestore.DocumentSnapshot = this.store.selectSnapshot(StateUserClusters.snapshotLookup)[id];

        const data: Cluster = isNew ?
            this.service.formDataNew(userId, this.empty) :
            this.store.selectSnapshot(StateUserClusters.dataLookup)[id];

        return of(isNew) ?
            dispatch(new ActionClusterPatch(data)) :
            dispatch(new ActionClusterSet(snapshot, data))
    }

    @Action(ActionClusterIconAdd)
    iconAdd({ dispatch }: StateContext<StateClusterModel>)
    {
        const bucketPath: string = this.store.selectSnapshot(StateIcon.bucketPath);

        return dispatch(new ActionClusterPatch({ bucketPath }));
    }

    @Action(ActionClusterIconRemove)
    iconRemove({ dispatch  }: StateContext<StateClusterModel>)
    {
        return dispatch(new ActionClusterPatch({ bucketPath : undefined }));
    }
}
