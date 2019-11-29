import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

import { ActionMapSearchResultClear, MapboxPlaceType } from '@theory/mapbox';
import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { StateUser } from '@firefly/core/state/document/user';
import { Event, Location, Image } from '@firefly/core/models';
import { ActionImageCreate, ActionImageReset, ActionImagePatch } from '@firefly/core/state/document/image';

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
  ActionEventImageSetUrl,
  ActionEventImageSetPath,
  ActionEventImageClear,
  ActionEventSetId,
  ActionEventUpdate,
  ActionEventImageCreate
} from './event.actions';
import { ActionUserEventsAdd, ActionUserEventsRemove, StateUserEvents, ActionUserEventsSync } from '../../query/user-events';
import { ActionClusterReset } from '../cluster';
import { firestore } from 'firebase/app';
import { ServiceEvents } from '@firefly/core/services';
import { ActionStorageRemoveNew, ActionStorageUrlSet, ActionStorageUrlGet } from '@theory/firebase';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@State<StateEventModel>(StateEventOptions)

export class StateEvent extends StateDocument<Event, StateEventModel>
{
    constructor
    (
        private store: Store,
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
                dateCreated : undefined,
                dateUpdated : undefined,

                userId      : undefined,
                name        : null,
                description : null,
                private     : true,
                draft       : false,

                tagline     : null,
                bucketPath  : null,
                coordinates : undefined,
                location    : undefined,
                timeStart   : null,
                timeEnd     : null
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

                ActionsReset:  [ActionClusterReset, ActionStorageRemoveNew, ActionMapSearchResultClear],
                ActionsCreate: [ActionImageCreate],

                ActionsQueryAdd:    [ActionUserEventsAdd],
                ActionsQueryRemove: [ActionUserEventsRemove],
                ActionsQuerySync:   [ActionUserEventsSync]
            }
        );
    }

    @Selector() static location(state: StateEventModel): Location { return StateEvent.data()(state).location; }
    @Selector() static locationDefined(state: StateEventModel): boolean { return StateEvent.location(state) != null; }
    @Selector() static locations(state: StateEventModel): Array<Location> { return [ StateEvent.location(state) ]; }
    @Selector() static timeStart(state: StateEventModel): string { return StateEvent.data()(state).timeStart; }
    @Selector() static timeEnd(state: StateEventModel): string { return StateEvent.data()(state).timeEnd; }
    @Selector() static timeEndValid(state: StateEventModel): boolean
    {
        const timeStart: Date = new Date(StateEvent.timeStart(state));
        const timeEnd:   Date = new Date(StateEvent.timeEnd(state));

        return timeEnd.getTime() > timeStart.getTime();
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

    @Action(ActionEventImageSetUrl)
    imageSetUrl({ dispatch }: StateContext<StateEventModel>, { url, bucketPath }: ActionEventImageSetUrl)
    {
        return dispatch(new ActionStorageUrlSet(url, bucketPath)).
        pipe
        (
            switchMap(() => dispatch(new ActionEventPatch({ bucketPath })))
        );
    }

    @Action(ActionEventImageSetPath)
    imageSetPath({ dispatch }: StateContext<StateEventModel>, { bucketPath }: ActionEventImageSetPath)
    {
        return dispatch(new ActionStorageUrlGet(bucketPath)).
        pipe
        (
            switchMap(() => dispatch(new ActionEventPatch({ bucketPath })))
        );
    }

    @Action(ActionEventImageClear)
    imageClear({ dispatch  }: StateContext<StateEventModel>)
    {
        return dispatch
        ([
            new ActionEventPatch({ bucketPath: null }),
            new ActionStorageRemoveNew()
        ]);
    }

    @Action(ActionEventImageCreate)
    imageCreate({ dispatch, getState }: StateContext<StateEventModel>)
    {
        const state: StateEventModel = getState();

        if (StateEvent.bucketPathState(state) !== CoreEnum.IdNew) { return of(null); }

        const event: Event = StateEvent.dataState(state);

        const partial: Partial<Image> =
        {
            name        : event.name,
            description : `Image uploaded for event "${event.name}"`,
            private     : event.private
        };

        return dispatch(new ActionImageReset()).
        pipe
        (
            switchMap(() =>
                dispatch(new ActionImagePatch(partial))
            ),
            switchMap(() =>
                dispatch(new ActionImageCreate())
            )
        );
    }

    @Action(ActionEventLocationSet)
    setLocation({ dispatch } : StateContext<StateEventModel>, { payload }: ActionEventLocationSet)
    {
        const result: Result                = payload;
        const types: Array<MapboxPlaceType> = result.place_type as Array<MapboxPlaceType>;

        let coordinates: firestore.GeoPoint;
        let location:    Location;

        if (result != null)
        {
            coordinates = new firestore.GeoPoint(result.center[1], result.center[0]);
            location    = { types };
        }

        return dispatch(new ActionEventPatch({ coordinates, location }));
    }
}
