import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { MapboxPlaceType } from '@theory/mapbox';
import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { StateUser } from '@firefly/core/state/document/user';
import { Event, Interest, Place } from '@firefly/cloud';

import { StateEventModel } from './event.state.model';
import { StateEventOptions } from './event.state.options';
import {
  ActionEventGet,
  ActionEventPlaceSet,
  ActionEventCreate,
  ActionEventPatch,
  ActionEventDelete,
  ActionEventReset,
  ActionEventSet,
  ActionEventSave,
  ActionEventSetId,
  ActionEventUpdate,
  ActionEventInterestAdd,
  ActionEventAccept,
  ActionEventDeny,
  ActionEventSetIdAnonymous,
  ActionEventPatchMetadata,
  ActionEventImagesUpdate,
  ActionEventImageSet,
  ActionEventTimeSet
} from './event.actions';
import { ActionUserEventsAdd, ActionUserEventsRemove, StateUserEvents, ActionUserEventsSync } from '../../query/user-events';
import { firestore } from 'firebase/app';
import { ServiceEvents, ServiceLocation } from '@firefly/core/services';
import { ServiceStorage, ImageSize } from '@theory/firebase';
import { switchMap, map } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { StateInterest } from '../interest';
import { Query } from '@angular/fire/firestore';
import { Collection, ImageType } from '@firefly/core/enums';
import { SetFormPristine } from '@ngxs/form-plugin';
import { LngLatLike } from 'mapbox-gl';
import { StateUserAlerts } from '../../child';

@State<StateEventModel>(StateEventOptions)
@Injectable()
export class StateEvent extends StateDocument<Event, StateEventModel>
{
    constructor
    (
        private store:    Store,
        private storage:  ServiceStorage,
        private location: ServiceLocation,
        public  service:  ServiceEvents
    )
    {
        super
        (
            Collection.Events,
            StateEventOptions.defaults,
            service,
            {
                version     : undefined,
                id          : undefined,
                userId      : undefined,
                dateCreated : undefined,
                dateUpdated : undefined,

                city           : null,
                description    : null,
                draft          : false,
                geopoint       : null,
                interests      : [],
                name           : null,
                notifyComplete : false,
                placeType      : null,
                private        : true,
                tagline        : null,
                timeNotify     : null,
                timeStart      : null,
                timeEnd        : null,
                phone          : null,
                virtual        : false,
                website        : null,

                metadata:
                {
                    icon  : null,
                    image : null,
                    place : null
                }
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

                ActionsReset:  [],
                ActionsCreate: [],

                ActionsQueryAdd:    [ActionUserEventsAdd],
                ActionsQueryRemove: [ActionUserEventsRemove],
                ActionsQuerySync:   [ActionUserEventsSync]
            }
        );
    }

    @Selector() static locationTypes(state: StateEventModel):   Array<MapboxPlaceType> { return StateEvent.dataState(state).locationTypes; }
    @Selector() static locationDefined(state: StateEventModel): boolean                { return StateEvent.locationTypes(state) != null; }
    @Selector() static timeStart(state: StateEventModel):       firestore.Timestamp    { return StateEvent.dataState(state).timeStart; }
    @Selector() static timeEnd(state: StateEventModel):         firestore.Timestamp    { return StateEvent.dataState(state).timeEnd; }
    @Selector() static timeEndValid(state: StateEventModel):    boolean                { return StateEvent.formGroupState(state).get('timeEnd').errors == null; }
    @Selector() static private(state: StateEventModel):         boolean                { return StateEvent.dataState(state).private; }
    @Selector() static notifyComplete(state: StateEventModel):  boolean                { return StateEvent.dataState(state).notifyComplete; }
    @Selector() static timeNotify(state: StateEventModel):      firestore.Timestamp    { return StateEvent.dataState(state).timeNotify; }
    @Selector() static timeNotifyValid(state: StateEventModel): boolean                { return StateEvent.formGroupState(state).get('timeNotify').errors == null; }
    @Selector() static interests(state: StateEventModel):       Array<string>          { return StateEvent.dataState(state).interests; }
    @Selector() static timeIsLocked(state: StateEventModel):    boolean                { return StateEvent.interests(state).length > 0; }
    @Selector() static icon(state: StateEventModel):            string                 { return StateEvent.metadataState(state).icon; }
    @Selector() static image(state: StateEventModel):           string                 { return StateEvent.metadataState(state).image; }
    @Selector() static place(state: StateEventModel):           Place                  { return StateEvent.metadataState(state).place; }
    @Selector() static virtual(state: StateEventModel):         boolean                { return StateEvent.dataState(state).virtual; }
    @Selector() static website(state: StateEventModel):         string                 { return StateEvent.dataState(state).website; }
    @Selector() static websiteIsSet(state: StateEventModel):    boolean                { return (StateEvent.website(state) || '').trim().length > 0; }
    @Selector() static phone(state: StateEventModel):           string                 { return StateEvent.dataState(state).phone; }
    @Selector() static phoneIsSet(state: StateEventModel):      boolean                { return (StateEvent.phone(state) || '').trim().length > 0; }
    @Selector() static draft(state: StateEventModel):           boolean                { return StateEvent.dataState(state).draft; }

    @Selector() static placeCenter(state: StateEventModel): LngLatLike
    {
        const place: Place = StateEvent.place(state);

        return place == null ?
            null :
            place.centerLike;
    }

    @Selector() static placeDefined(state: StateEventModel): boolean
    {
        return StateEvent.place(state) != null;
    }

    @Selector([StateInterest.canEdit])
    static canAccept(state: StateEventModel, canEditInterest: boolean): boolean
    {
        return StateEvent.draft(state) && canEditInterest;
    }

    @Selector([StateUser.userId]) static canEdit(state: StateEventModel, userId: string): boolean
    {
        return StateEvent.dataState(state).userId === userId &&
            !StateEvent.notifyComplete(state);
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
        const { getState, dispatch } = context;

        const event: Event = action.data ?
            action.data :
            action.snapshot.data() as Event;

        return super.set(context, action).
        pipe
        (
            switchMap(() =>
                event == null || StateEvent.isNewState(getState()) ?
                    of(null) :
                    this.location.placeFromEvent(event).
                    pipe
                    (
                        switchMap((place: Place) =>
                            dispatch(new ActionEventPlaceSet(place))
                        )
                    )
            ),
            switchMap(() =>
                StateEvent.image(getState()) == null ?
                    of(null) :
                    this.store.dispatch(new ActionEventImageSet())
            ),
            switchMap(() =>
                dispatch(new SetFormPristine(this.formPath))
            )
        );
    }

    @Action(ActionEventPatch)
    patch(context : StateContext<StateEventModel>, action: ActionEventPatch)
    {
        return super.patch(context, action);
    }

    @Action(ActionEventPatchMetadata)
    patchMetadata(context : StateContext<StateEventModel>, action: ActionEventPatchMetadata)
    {
        return super.patchMetadata(context, action);
    }

    @Action(ActionEventCreate)
    create(context: StateContext<StateEventModel>)
    {
        return super.create(context).
        pipe
        (
            switchMap(() =>
                context.dispatch(new ActionEventImagesUpdate())
            )
        );
    }

    @Action(ActionEventUpdate)
    update(context: StateContext<StateEventModel>)
    {
        return context.dispatch(new ActionEventImagesUpdate()).
        pipe
        (
            switchMap(() =>
                super.update(context)
            )
        );
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
    setId({ dispatch }: StateContext<StateEventModel>, { id, isAlert }: ActionEventSetId)
    {
        const isNew           : boolean = id === CoreEnum.IdNew;
        const isInterestOwner : boolean = this.store.selectSnapshot(StateInterest.canEdit);
        const userId          : string  = this.store.selectSnapshot(StateUser.id());

        this.empty.draft = !isInterestOwner;

        const snapshot : firestore.DocumentSnapshot = this.store.selectSnapshot
        (
            isAlert ?
                StateUserAlerts.snapshotLookup() :
                StateUserEvents.snapshotLookup()
        )[id];

        const data: Event = isNew ?
            this.service.formDataNew(userId, this.empty) :
            this.store.selectSnapshot
            (
                isAlert ?
                    StateUserAlerts.dataLookup() :
                    StateUserEvents.dataLookup()
            )[id];

        return dispatch(new ActionEventSet(snapshot, data));
    }

    @Action(ActionEventSetIdAnonymous)
    actionSetIdAnonymous(context: StateContext<StateEventModel>, { id }: ActionEventSetIdAnonymous)
    {
      const pendingEvents: Event[] = this.store.selectSnapshot(StateInterest.pendingEvents);
      const pendingEvent: Event[] = pendingEvents.filter((event) => event.id = id);

      const query: Query   = this.service.collection('events').ref
          .where('id', '==', pendingEvent[0].id);

      return from(query.get()).pipe
      (
        map((snapshot: firestore.QuerySnapshot) =>
            snapshot.docs
        ),
        switchMap((snapshot: Array<firestore.QueryDocumentSnapshot>) =>
        {
          const event: Event = snapshot[0].data() as Event;
          return this.store.dispatch(new ActionEventSet(snapshot[0], event))
        }
      ))
    }

    @Action(ActionEventImagesUpdate)
    imagesUpdate(context : StateContext<StateEventModel>)
    {
        return super.updateMedia(context, ImageType.Image, this.storage);
    }

    @Action(ActionEventImageSet)
    imageSet(context : StateContext<StateEventModel>)
    {
      const { getState, dispatch } = context;
      const event = StateEvent.dataState(getState());

      return dispatch(new ActionEventPatchMetadata({})).
      pipe
      (
          switchMap(() =>
              this.storage.downloadUrl(`${Collection.Events}/${event.id}/${ImageType.Image}.jpeg`, ImageSize.Medium)
          ),
          switchMap((image: string) =>
              dispatch(new ActionEventPatchMetadata({ image }))
          )
      );
    }

    @Action(ActionEventPlaceSet)
    placeSet({ dispatch } : StateContext<StateEventModel>, { place }: ActionEventPlaceSet)
    {
        const partial: Partial<Event> = place == null ?
        {
            geopoint  : null,
            city      : null,
            placeType : null
        } :
        {
            geopoint  : place.geopoint,
            city      : place.city,
            placeType : place.type
        };


        return dispatch
        ([
            new ActionEventPatch(partial),
            new ActionEventPatchMetadata({ place })
        ]);
    }

    @Action(ActionEventInterestAdd)
    interestAdd({ dispatch }: StateContext<StateEventModel>, { interest }: ActionEventInterestAdd)
    {
        return dispatch(new ActionEventPatch({ interests: [interest.id]}));
    }

    @Action(ActionEventAccept)
    eventAccept({ dispatch }: StateContext<StateEventModel>)
    {
        return dispatch(new ActionEventPatch({ draft: false }, true))
    }

    @Action(ActionEventDeny)
    eventDeny({ dispatch }: StateContext<StateEventModel>)
    {
      const interestId: Interest = this.store.selectSnapshot(StateInterest.data());
      const interests = this.store.selectSnapshot(StateEvent.interests).filter((interest) => !interest.includes(interestId.id));

      return dispatch(new ActionEventPatch({ interests }, true))
    }

    @Action(ActionEventTimeSet)
    timeSet({ dispatch }: StateContext<StateEventModel>, { key, value }: ActionEventTimeSet)
    {
        const timestamp: firestore.FieldValue = firestore.Timestamp.fromDate(new Date(value));

        return dispatch
        ([
            new ActionEventPatch({ [key]: timestamp })
        ]);
    }
}
