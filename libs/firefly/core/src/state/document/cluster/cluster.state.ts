
import { Action, State, StateContext, Store, Selector } from '@ngxs/store';

import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { Cluster, Icon } from '@firefly/cloud';
import { ServiceClusters } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state/document/user';
import { ActionIconCreate, ActionIconPatch, ActionIconClear, ActionIconUriSet, StateIcon, ActionIconSetId } from '@firefly/core/state/document/icon';

import { StateClusterModel } from './cluster.state.model';
import { StateClusterOptions } from './cluster.state.options';
import {
    ActionClusterReset,
    ActionClusterDirty,
    ActionClusterGet,
    ActionClusterSet,
    ActionClusterPatch,
    ActionClusterCreate,
    ActionClusterSave,
    ActionClusterDelete,
    ActionClusterSetId,
    ActionClusterUpdate,
    ActionClusterIconClear,
    ActionClusterIconCreate,
    ActionClusterIconUriSet,
    ActionClusterIconPathSet
} from './cluster.actions';
import { ActionUserClustersAdd, ActionUserClustersRemove, StateUserClusters, ActionUserClustersSync } from '../..//query/user-clusters';
import { ActionUserStreamRemove } from '../../query/user-stream/user-stream.actions';
import { ActionUserSubscriptionsRemove } from '../../child/user-subscriptions/user-subscriptions.actions';
import { firestore } from 'firebase/app';
import { ActionStorageUrlGet, StateStorage, StorageImage, ImageSize } from '@theory/firebase';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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
                userId      : undefined,
                id          : undefined,
                dateCreated : undefined,
                dateUpdated : undefined,
                metadata    : {},

                bucketPath      : null,
                description     : null,
                name            : null,
                private         : true,
                subscriberCount : 0,
                tagline         : null
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

                ActionsReset:  [ActionIconClear],
                ActionsCreate: [],

                ActionsQueryAdd:    [ActionUserClustersAdd],
                ActionsQueryRemove: [ActionUserClustersRemove, ActionUserStreamRemove, ActionUserSubscriptionsRemove],
                ActionsQuerySync:   [ActionUserClustersSync]
            }
        );
    }

    @Selector([StateIcon.dataUri, StateStorage.images])
    public static iconUrl(state: StateClusterModel, dataUri: string, images: Record<string, StorageImage>)
    {
        const bucketPath: string = StateCluster.bucketPathState(state);

        return bucketPath == null || bucketPath === CoreEnum.IdNew || images[bucketPath] == null ?
            dataUri :
            images[bucketPath][ImageSize.Medium];
    }

    @Action(ActionClusterReset)
    reset(context: StateContext<StateClusterModel>)
    {
        return super.reset(context)
    }

    @Action(ActionClusterDirty)
    dirty(context: StateContext<StateClusterModel>)
    {
      return super.dirty(context)
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
        return context.dispatch(new ActionClusterIconCreate()).
        pipe
        (
            switchMap(() => super.create(context))
        );
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

    @Action(ActionClusterIconClear)
    imageClear({ dispatch }: StateContext<StateClusterModel>)
    {
        return dispatch
        ([
            new ActionIconClear(),
            new ActionClusterPatch({ bucketPath: null }),
        ]);
    }

    @Action(ActionClusterIconUriSet)
    imageUriSet({ dispatch }: StateContext<StateClusterModel>, { dataUri }: ActionClusterIconUriSet)
    {
        return dispatch
        ([
            new ActionClusterPatch({ bucketPath: CoreEnum.IdNew }),
            new ActionIconUriSet(dataUri)
        ]);
    }

    @Action(ActionClusterIconPathSet)
    imageSetPath({ dispatch }: StateContext<StateClusterModel>, { bucketPath }: ActionClusterIconPathSet)
    {
        return dispatch(new ActionStorageUrlGet(bucketPath)).
        pipe
        (
            switchMap(() => dispatch(new ActionClusterIconClear())),
            switchMap(() => dispatch(new ActionClusterPatch({ bucketPath })))
        );
    }

    @Action(ActionClusterIconCreate)
    imageCreate({ dispatch, getState }: StateContext<StateClusterModel>)
    {
        const dataUri: string = this.store.selectSnapshot(StateIcon.dataUri);

        if (dataUri == null) { return of(null); }

        const cluster: Cluster  = StateCluster.dataState(getState());

        const partial: Partial<Icon> =
        {
            name : cluster.name
        };

        return dispatch(new ActionIconSetId()).
        pipe
        (
            switchMap(() =>
                dispatch
                ([
                    new ActionIconUriSet(dataUri),
                    new ActionIconPatch(partial)
                ])
            ),
            switchMap(() =>
                dispatch(new ActionIconCreate())
            ),
            tap(() =>
                dispatch(new ActionClusterPatch({ bucketPath: this.store.selectSnapshot(StateIcon.bucketPath()) }))
            )
        );
    }
}
