
import { Action, State, StateContext, Store, Selector } from '@ngxs/store';

import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { Cluster, Icon, Event } from '@firefly/cloud';
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
    ActionClusterIconPathSet,
    ActionClusterEventsGet
} from './cluster.actions';
import { ActionUserClustersAdd, ActionUserClustersRemove, StateUserClusters, ActionUserClustersSync } from '../..//query/user-clusters';
import { ActionUserStreamRemove } from '../../query/user-stream/user-stream.actions';
import { ActionUserSubscriptionsRemove } from '../../child/user-subscriptions/user-subscriptions.actions';
import { firestore } from 'firebase/app';
import { ActionStorageUrlGet, StateStorage, StorageImage, ImageSize } from '@theory/firebase';
import { switchMap, tap, map } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { Query } from '@angular/fire/firestore';
import { StateLanguage } from '@theory/capacitor';

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
            StateClusterOptions.name as string,
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

    @Selector() static events(state: StateClusterModel): Event[] { return state.events; }
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

        const userId:   string                     = this.store.selectSnapshot(StateUser.id());
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

    @Action(ActionClusterEventsGet)
    eventsGet({ patchState, getState}: StateContext<StateClusterModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id());
        const query: Query   = userId == null ? undefined : this.service.collection('events').ref
          .where('userId', '==', userId).where('clusters', 'array-contains', StateCluster.idState(getState()));
        var events: Event[] = new Array();

        return from(query.get()).pipe
        (
          map((snapshot: firestore.QuerySnapshot) =>
            snapshot.docs
          ),
          tap((page: Array<firestore.QueryDocumentSnapshot>) =>
          {
            const language: string = this.store.selectSnapshot(StateLanguage.language);
            const options: any = { weekday: 'long',
              year: 'numeric', month: 'long', day: 'numeric'};

            let timeStart: Date;
            let timeStartPrevious: Date;
            let timeStartFormatted: string;

            page.forEach((document: firestore.QueryDocumentSnapshot) =>
            {
              const event: Event = document.data() as Event;

              timeStart = new Date(event.timeStart);
                timeStartFormatted = timeStart.toLocaleDateString(language, options);

                if(event.metadata === undefined)
                  event.metadata = {};

                if(timeStartPrevious === undefined || timeStart.getTime() != timeStartPrevious.getTime())
                  event.metadata.timeStartFormatted = timeStartFormatted;

                event.metadata.timeStartDate = timeStart;
                timeStartPrevious = timeStart;

              events.push(event);
            })
          }),
          tap(() =>
            patchState
            ({
              events
            })
          )
        )
    }
}
