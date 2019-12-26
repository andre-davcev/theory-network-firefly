import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { ActionMapSearchResultClear, MapboxPlaceType } from '@theory/mapbox';
import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { StateUser } from '@firefly/core/state/document/user';
import { Event, Image } from '@firefly/cloud';
import { ActionImageCreate, ActionImagePatch, ActionImageSetId, StateImage, ActionImageClear, ActionImageUriSet } from '@firefly/core/state/document/image';

import { StateEventModel } from './event.state.model';
import { StateEventOptions } from './event.state.options';
import {
  ActionEventGet,
  ActionEventLocationSet,
  ActionEventCreate,
  ActionEventPatch,
  ActionEventDelete,
  ActionEventReset,
  ActionEventSet,
  ActionEventSave,
  ActionEventImageUriSet,
  ActionEventImagePathSet,
  ActionEventImageClear,
  ActionEventSetId,
  ActionEventUpdate,
  ActionEventImageCreate,
  ActionEventClusterAdd
} from './event.actions';
import { ActionUserEventsAdd, ActionUserEventsRemove, StateUserEvents, ActionUserEventsSync } from '../../query/user-events';
import { ActionClusterReset } from '../cluster';
import { firestore } from 'firebase/app';
import { ServiceEvents, ServiceLocation } from '@firefly/core/services';
import { ActionStorageUrlGet, StateStorage, ImageSize, StorageImage } from '@theory/firebase';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActionIconClear } from '../icon/icon.actions';
import { LocationCity } from '@firefly/core/interfaces';

@State<StateEventModel>(StateEventOptions)

export class StateEvent extends StateDocument<Event, StateEventModel>
{
    constructor
    (
        private store: Store,
        private location: ServiceLocation,
        service: ServiceEvents
    )
    {
        super
        (
            StateEventOptions.name as string,
            StateEventOptions.defaults,
            service,
            {
                version     : undefined,
                id          : undefined,
                userId      : undefined,
                dateCreated : undefined,
                dateUpdated : undefined,
                metadata    : {},

                bucketPath     : null,
                city           : null,
                clusters       : [],
                description    : null,
                geopoint       : null,
                name           : null,
                notifyComplete : false,
                private        : true,
                tagline        : null,
                timeNotify     : null,
                timeStart      : null,
                timeEnd        : null
            },
            {
                ActionReset:  ActionEventReset,
                ActionGet:    ActionEventGet,
                ActionSet:    ActionEventSet,
                ActionPatch:  ActionEventPatch,
                ActionCreate: ActionEventCreate,
                ActionUpdate: ActionEventUpdate,
                ActionSave:   ActionEventSave,
                ActionDelete: ActionEventDelete,

                ActionsReset:  [ActionClusterReset, ActionImageClear, ActionIconClear, ActionMapSearchResultClear],
                ActionsCreate: [],

                ActionsQueryAdd:    [ActionUserEventsAdd],
                ActionsQueryRemove: [ActionUserEventsRemove],
                ActionsQuerySync:   [ActionUserEventsSync]
            }
        );
    }

    @Selector() static locationTypes(state: StateEventModel):   Array<MapboxPlaceType> { return StateEvent.dataState(state).locationTypes; }
    @Selector() static locationDefined(state: StateEventModel): boolean                { return StateEvent.locationTypes(state) != null; }
    @Selector() static timeStart(state: StateEventModel):       string                 { return StateEvent.dataState(state).timeStart; }
    @Selector() static timeEnd(state: StateEventModel):         string                 { return StateEvent.dataState(state).timeEnd; }
    @Selector() static timeEndValid(state: StateEventModel):    boolean                { return StateEvent.formGroupState(state).get('timeEnd').errors == null; }

    @Selector() static notifyComplete(state: StateEventModel):  boolean { return StateEvent.dataState(state).notifyComplete; }
    @Selector() static timeNotify(state: StateEventModel):      string  { return StateEvent.dataState(state).timeNotify; }
    @Selector() static timeNotifyValid(state: StateEventModel): boolean { return StateEvent.formGroupState(state).get('timeNotify').errors == null; }

    @Selector([StateImage.dataUri, StateStorage.images])
    public static imageUrl(state: StateEventModel, dataUri: string, images: Record<string, StorageImage>)
    {
        const bucketPath: string = StateEvent.bucketPathState(state);

        return bucketPath == null || bucketPath === CoreEnum.IdNew || images[bucketPath] == null ?
            dataUri :
            images[bucketPath][ImageSize.Medium];
    }

    @Action(ActionEventReset)
    reset(context: StateContext<StateEventModel>)
    {
        return super.reset(context)
    }

    @Action(ActionEventGet)
    get(context: StateContext<StateEventModel>, action: ActionEventGet)
    {
        return super.get(context, action);
    }

    @Action(ActionEventSet)
    set(context: StateContext<StateEventModel>, action: ActionEventSet)
    {
        return super.set(context, action);
    }

    @Action(ActionEventPatch)
    patch(context : StateContext<StateEventModel>, action: ActionEventPatch)
    {
        return super.patch(context, action);
    }

    @Action(ActionEventCreate)
    create(context: StateContext<StateEventModel>)
    {
        return context.dispatch(new ActionEventImageCreate()).
        pipe
        (
            switchMap(() => super.create(context))
        );
    }

    @Action(ActionEventUpdate)
    update(context: StateContext<StateEventModel>)
    {
        return super.update(context);
    }

    @Action(ActionEventSave)
    save(context: StateContext<StateEventModel>)
    {
        return super.save(context);
    }

    @Action(ActionEventDelete)
    delete(context: StateContext<StateEventModel>)
    {
        return super.delete(context);
    }

    @Action(ActionEventSetId)
    setId({ dispatch }: StateContext<StateEventModel>, { id }: ActionEventSetId)
    {
        const isNew: boolean = id === CoreEnum.IdNew;

        const userId:   string                     = this.store.selectSnapshot(StateUser.id());
        const snapshot: firestore.DocumentSnapshot = this.store.selectSnapshot(StateUserEvents.snapshotLookup())[id];

        const data: Event = isNew ?
            this.service.formDataNew(userId, this.empty) :
            this.store.selectSnapshot(StateUserEvents.dataLookup())[id];

        return dispatch(new ActionEventSet(snapshot, data));
    }

    @Action(ActionEventImageClear)
    imageClear({ dispatch }: StateContext<StateEventModel>)
    {
        return dispatch
        ([
            new ActionImageClear(),
            new ActionEventPatch({ bucketPath: null }),
        ]);
    }

    @Action(ActionEventImageUriSet)
    imageUriSet({ dispatch }: StateContext<StateEventModel>, { dataUri }: ActionEventImageUriSet)
    {
        return dispatch
        ([
            new ActionEventPatch({ bucketPath: CoreEnum.IdNew }),
            new ActionImageUriSet(dataUri)
        ]);
    }

    @Action(ActionEventImagePathSet)
    imageSetPath({ dispatch }: StateContext<StateEventModel>, { bucketPath }: ActionEventImagePathSet)
    {
        return dispatch(new ActionStorageUrlGet(bucketPath)).
        pipe
        (
            switchMap(() => dispatch(new ActionEventImageClear())),
            switchMap(() =>
                dispatch
                ([
                    new ActionEventPatch({ bucketPath }),
                    new ActionImagePatch({ bucketPath })
                ])
            )
        );
    }

    @Action(ActionEventImageCreate)
    imageCreate({ dispatch, getState }: StateContext<StateEventModel>)
    {
        const dataUri: string = this.store.selectSnapshot(StateImage.dataUri);

        if (dataUri == null) { return of(null); }

        const event: Event = StateEvent.dataState(getState());

        const partial: Partial<Image> =
        {
            name : event.name
        };

        return dispatch(new ActionImageSetId()).
        pipe
        (
            switchMap(() =>
                dispatch
                ([
                    new ActionImageUriSet(dataUri),
                    new ActionImagePatch(partial)
                ])
            ),
            switchMap(() =>
                dispatch(new ActionImageCreate())
            ),
            tap(() =>
                dispatch
                ([
                    new ActionImageClear(),
                    new ActionEventPatch({ bucketPath: this.store.selectSnapshot(StateImage.bucketPath()) })
                ])
            )
        );
    }

    @Action(ActionEventLocationSet)
    setLocation({ dispatch } : StateContext<StateEventModel>, { result }: ActionEventLocationSet)
    {
        return result == null ?
            dispatch(new ActionEventPatch({ geopoint: null, city: null })) :
            this.location.getLocationCity(result).pipe
            (
                switchMap((locationCity: LocationCity) =>
                    dispatch(new ActionEventPatch(locationCity))
                )
            );
    }

    @Action(ActionEventClusterAdd)
    clusterAdd({ dispatch }: StateContext<StateEventModel>, { cluster }: ActionEventClusterAdd)
    {
        return dispatch(new ActionEventPatch({ clusters: [cluster.id]}));
    }
}
