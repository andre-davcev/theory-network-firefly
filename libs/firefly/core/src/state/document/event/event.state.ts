import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { ActionMapSearchResultClear, MapboxPlaceType } from '@theory/mapbox';
import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { StateUser } from '@firefly/core/state/document/user';
import { Event, Image, Interest } from '@firefly/cloud';
import { StateImage, ActionImageReset } from '@firefly/core/state/document/image';

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
  ActionEventSetId,
  ActionEventUpdate,
  ActionEventInterestAdd,
  ActionEventAccept,
  ActionEventDeny,
  ActionEventSetIdAnonymous,
  ActionEventPatchMetadata,
  ActionEventImagesUpdate
} from './event.actions';
import { ActionUserEventsAdd, ActionUserEventsRemove, StateUserEvents, ActionUserEventsSync } from '../../query/user-events';
import { firestore } from 'firebase/app';
import { ServiceEvents, ServiceLocation } from '@firefly/core/services';
import { StateStorage, StorageImage, ServiceStorage } from '@theory/firebase';
import { switchMap, map } from 'rxjs/operators';
import { from, forkJoin } from 'rxjs';
import { ActionIconReset } from '../icon/icon.actions';
import { LocationCity } from '@firefly/core/interfaces';
import { Injectable } from '@angular/core';
import { StateInterest } from '../interest';
import { Query } from '@angular/fire/firestore';
import { Collection, ImageType } from '@firefly/core/enums';

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

                cityId         : null,
                city           : null,
                description    : null,
                draft          : false,
                geopoint       : null,
                interests      : [],
                name           : null,
                notifyComplete : false,
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
                    image : null
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

                ActionsReset:  [ActionImageReset, ActionIconReset, ActionMapSearchResultClear],
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
    @Selector() static private(state: StateEventModel):         boolean                { return StateEvent.dataState(state).private; }
    @Selector() static notifyComplete(state: StateEventModel):  boolean                { return StateEvent.dataState(state).notifyComplete; }
    @Selector() static timeNotify(state: StateEventModel):      string                 { return StateEvent.dataState(state).timeNotify; }
    @Selector() static timeNotifyValid(state: StateEventModel): boolean                { return StateEvent.formGroupState(state).get('timeNotify').errors == null; }
    @Selector() static interests(state: StateEventModel):       Array<string>          { return StateEvent.dataState(state).interests; }
    @Selector() static icon(state: StateEventModel):            string                 { return StateEvent.metadataState(state).icon; }
    @Selector() static image(state: StateEventModel):           string                 { return StateEvent.metadataState(state).image; }

    @Selector([StateUser.userId]) static canEdit(state: StateEventModel, userId: string): boolean
    {
        return StateEvent.dataState(state).userId === userId && !StateEvent.notifyComplete(state);
    }

    @Selector([StateImage.dataUri, StateStorage.images])
    public static imageUrl(state: StateEventModel, dataUri: string, images: Record<string, StorageImage>)
    {
/*
        const bucketPath: string = StateEvent.bucketPathState(state);

        return bucketPath == null || bucketPath === CoreEnum.IdNew || images[bucketPath] == null ?
            dataUri :
            images[bucketPath][ImageSize.Medium];
*/
        return null;
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
/*
        const { getState, dispatch } = context;

        return super.set(context, action).
        pipe
        (
            map(() =>
                StateEvent.dataState(getState())
            ),
            switchMap((document: Event) =>
                document.metadata.image == null ?
                    this.storage.downloadUrl(`${Collection.Events}/${document.id}/${ImageType.Image}.jpeg`, ImageSize.Medium) :
                    of(document.metadata.image)
            ),
            switchMap((url: string) =>
                dispatch(new ActionEventPatch({ metadata: { ...StateEvent.metadataState(getState()), image: url }}))
            )
        );
*/
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
    setId({ dispatch }: StateContext<StateEventModel>, { id }: ActionEventSetId)
    {
        const isNew: boolean = id === CoreEnum.IdNew;
        const isInterestOwner: boolean = this.store.selectSnapshot(StateInterest.canEdit);

        if(isInterestOwner)
        {
          this.empty.draft = false;
        }
        else
        {
          this.empty.draft = true;
        }

        const userId:   string                     = this.store.selectSnapshot(StateUser.id());
        const snapshot: firestore.DocumentSnapshot = this.store.selectSnapshot(StateUserEvents.snapshotLookup())[id];

        const data: Event = isNew ?
            this.service.formDataNew(userId, this.empty) :
            this.store.selectSnapshot(StateUserEvents.dataLookup())[id];

        return dispatch(new ActionEventSet(snapshot, data));
    }

    @Action(ActionEventSetIdAnonymous)
    actionSetIdAnonymous({ dispatch }: StateContext<StateEventModel>, { id }: ActionEventSetIdAnonymous)
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
        return super.updateMedia(context, ImageType.Icon).
        pipe
        (
            switchMap(() =>
                super.updateMedia(context, ImageType.Image)
            )
        );
    }

    @Action(ActionEventLocationSet)
    setLocation({ dispatch } : StateContext<StateEventModel>, { result }: ActionEventLocationSet)
    {
        return result == null ?
            dispatch(new ActionEventPatch({ geopoint: null, city: null, cityId: null })) :
            this.location.locationCityFromResult(result).pipe
            (
                switchMap((locationCity: LocationCity) =>
                    dispatch(new ActionEventPatch(locationCity))
                )
            );
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
}
