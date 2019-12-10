import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

import { ActionMapSearchResultClear, MapboxPlaceType } from '@theory/mapbox';
import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { StateUser } from '@firefly/core/state/document/user';
import { Event, Image } from '@firefly/core/documents';
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
  ActionEventImageCreate
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
            StateEventOptions.name,
            StateEventOptions.defaults,
            service,
            {
                version     : undefined,
                id          : undefined,
                userId      : undefined,
                dateCreated : undefined,
                dateUpdated : undefined,

                name        : null,
                tagline     : null,
                description : null,
                bucketPath  : null,
                private     : true,

                geopoint : null,
                city     : null,

                timeStart : null,
                timeEnd   : null,

                clusters : [],

                notifyCompleted : false,
                notifyImmediate : true,
                notifyDateTime  : null
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
    @Selector() static locationDefined(state: StateEventModel): boolean { return StateEvent.locationTypes(state) != null; }
    @Selector() static timeStart(state: StateEventModel):       string { return StateEvent.dataState(state).timeStart; }
    @Selector() static timeEnd(state: StateEventModel):         string { return StateEvent.dataState(state).timeEnd; }
    @Selector() static timeEndValid(state: StateEventModel): boolean
    {
        const timeStart: Date = new Date(StateEvent.timeStart(state));
        const timeEnd:   Date = new Date(StateEvent.timeEnd(state));

        return timeEnd.getTime() > timeStart.getTime();
    }

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

        const userId:   string                     = this.store.selectSnapshot(StateUser.id);
        const snapshot: firestore.DocumentSnapshot = this.store.selectSnapshot(StateUserEvents.snapshotLookup())[id];

        const data: Event = isNew ?
            this.service.formDataNew(userId, this.empty) :
            this.store.selectSnapshot(StateUserEvents.dataLookup())[id];

        return dispatch(new ActionEventSet(snapshot, data));
    }

    @Action(ActionEventLocationSet)
    setLocation({ dispatch } : StateContext<StateEventModel>, { payload }: ActionEventLocationSet)
    {
        const result: Result = payload;

        if (result == null) { return of(null); }

        return this.location.getLocationCity(result).pipe
        (
            tap(result => console.log(result)),
            switchMap((locationCity: LocationCity) =>
                dispatch(new ActionEventPatch(locationCity))
            )
        );
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
}
