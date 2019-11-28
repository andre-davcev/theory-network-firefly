
import { Action, State, StateContext, Store } from '@ngxs/store';

import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { Cluster } from '@firefly/core/models';
import { ServiceClusters } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state/document/user';
import { ActionIconCreate, StateIcon } from '@firefly/core/state/document/icon';

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
    ActionClusterIconRemove,
    ActionClusterUpdate
} from './cluster.actions';
import { ActionUserClustersAdd, ActionUserClustersRemove, StateUserClusters, ActionUserClustersSync } from '../..//query/user-clusters';
import { ActionUserStreamRemove } from '../../list/user-stream/user-stream.actions';
import { ActionUserSubscriptionsRemove } from '../../query/user-subscriptions/user-subscriptions.actions';
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
            StateClusterOptions.name,
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
                ActionUpdate: ActionClusterUpdate,
                ActionSave:   ActionClusterSave,
                ActionDelete: ActionClusterDelete,

                ActionsReset:  [],
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

    @Action(ActionClusterUpdate)
    update(context: StateContext<StateClusterModel>)
    {
        return super.update(context);
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
        const snapshot: firestore.DocumentSnapshot = this.store.selectSnapshot(StateUserClusters.snapshotLookup())[id];

        const data: Cluster = isNew ?
            this.service.formDataNew(userId, this.empty) :
            this.store.selectSnapshot(StateUserClusters.dataLookup())[id];

        return dispatch(new ActionClusterSet(snapshot, data));
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
