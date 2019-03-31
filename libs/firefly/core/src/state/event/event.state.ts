import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action, Selector, Select, State, StateContext, Store } from '@ngxs/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { StateUser } from '@firefly/core/state/user';
import { User, Event, Cluster, Location } from '@firefly/core/models';
import { ServiceEvent } from '@firefly/core/services';
import { StateEventModel } from './event.state.model';
import { StateEventOptions } from './event.state.options';
import { ActionGetEvents, ActionEventSetId, ActionEventSet, ActionEventPatch, ActionEventSetLocation, ActionEventSetImageIndex } from './event.actions';
import { EventKey, AssetKey } from '@firefly/core/models';
import { ModelKey } from '@theory/firebase';
import { firestore } from 'firebase';
import { ValidatorsExtended, CoreEnum, DateUtil } from '@theory/core';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { MapboxPlaceType } from '@theory/mapbox';
import { StatePhotos } from '@theory/capacitor';
import { PhotoAsset } from '@capacitor/core';

@State<StateEventModel>(StateEventOptions)

export class StateEvent
{
    @Select(StateUser.user) user$:Observable<User>;

    constructor(private serviceEvent: ServiceEvent, private formBuilder: FormBuilder, private store: Store) {}

    @Selector() static entities(state: StateEventModel): Record<string, Event> { return state.entities; }
    @Selector() static id(state: StateEventModel): string                      { return state.id; }
    @Selector() static form(state: StateEventModel): FormGroup                 { return state.form; }

    @Selector() static events(state: StateEventModel): Array<Event> { return Object.keys(state.entities).map(id => state.entities[id]); }

    @Selector() static event(state: StateEventModel): Event
    {
        return state.form == null ? undefined : state.form.value;
    }

    @Selector() static eventId(state: StateEventModel): string
    {
        return state.form == null ? undefined : state.form.get(ModelKey.Id).value;
    }

    @Selector() static eventIsNew(state: StateEventModel): boolean
    {
        return StateEvent.eventId(state) === CoreEnum.IdNew;
    }

    @Selector() static eventIsValid(state: StateEventModel): boolean
    {
        const form: FormGroup = StateEvent.form(state);

        return form == null ? false : form.valid;
    }

    @Selector() static eventCanUpdate(state: StateEventModel): boolean
    {
        const form: FormGroup = StateEvent.form(state);

        return form == null ? false : form.valid && form.dirty;
    }

    @Selector() static eventDateCreated(state: StateEventModel): Date
    {
        return state.form == null ? undefined : (state.form.get(ModelKey.DateCreated).value as firestore.Timestamp).toDate();
    }

    @Selector() static eventDateUpdated(state: StateEventModel): Date
    {
        return state.form == null ? undefined : (state.form.get(ModelKey.DateUpdated).value as firestore.Timestamp).toDate();
    }

    @Selector() static eventName(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(AssetKey.Name).value;
    }

    @Selector() static eventDescription(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(AssetKey.Description).value;
    }

    @Selector() static eventIsPrivate(state: StateEventModel): boolean
    {
        return state.form == null ? true : state.form.get(AssetKey.Name).value;
    }

    @Selector() static eventUserId(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(AssetKey.UserId).value;
    }

    @Selector() static eventIsDraft(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(AssetKey.Draft).value;
    }

    @Selector() static eventTagline(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(EventKey.Tagline).value;
    }

    @Selector() static eventImageId(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(EventKey.ImageId).value;
    }

    @Selector() static eventImageUrl(state: StateEventModel): string
    {
        const imageUrl: string = state.imageUrl;

        return imageUrl == null ? undefined : `${CoreEnum.DataUri}${imageUrl}`;
    }

    @Selector() static eventImageUrlDefined(state: StateEventModel): boolean
    {
        return StateEvent.eventImageUrl(state) != null;
    }

    @Selector() static eventClusterIds(state: StateEventModel): Array<string>
    {
        return state.form == null ? '' : state.form.get(EventKey.Clusters).value;
    }

    @Selector() static eventClusters(state: StateEventModel): Array<Cluster>
    {
        const clusterIds: Array<string> = StateEvent.eventClusterIds(state);

        // ToDo: Lookup cluster ids and return Cluster array
        // ToDo: Setup cluster collection watcher
        return [];
    }

    @Selector() static eventClusterCount(state: StateEventModel): number
    {
        const clusterIds: Array<string> = StateEvent.eventClusterIds(state);

        return clusterIds == null ? 0 : clusterIds.length;
    }

    @Selector() static eventClusterFirst(state: StateEventModel): Cluster
    {
        const clusters: Array<Cluster> = StateEvent.eventClusters(state);

        return clusters == null ? undefined : clusters[0];
    }

    @Selector() static eventIconUrl(state: StateEventModel): string
    {
        const cluster: Cluster = StateEvent.eventClusterFirst(state);
        const iconId: string   = cluster.icon; // ToDo: Change to StateIcon.iconUrl()

        // ToDo: Lookup iconId and return icon url
        // ToDo: Setup icon collection watcher
        return '';
    }

    @Selector() static eventIcon(state: StateEventModel): Array<string> { return state.form.get(EventKey.Clusters).value; }

    @Selector() static eventLocation(state: StateEventModel): Location
    {
        const form: FormGroup = StateEvent.form(state);

        return form == null ? undefined : form.get(EventKey.Location).value;
    }

    @Selector() static eventLocationDefined(state: StateEventModel): boolean
    {
        const location: Location = StateEvent.eventLocation(state);

        return location != null;
    }

    @Selector() static eventLocations(state: StateEventModel): Array<Location>
    {
        const location: Location = StateEvent.eventLocation(state);

        return location == null ? [] : [location];
    }

    @Action(ActionGetEvents)
    getEvents({ patchState } : StateContext<StateEventModel>)
    {
        return this.user$.pipe(
            map((user:User) => user.uidInternal),
            switchMap(uidInternal => {
                return this.serviceEvent.
                getEvents(uidInternal).
                pipe
                (
                    map((events: Array<Event>) =>
                    {
                        const entities: Record<number, Event> = {};

                        events.forEach((event: Event) => entities[event.id] = event);

                        patchState({ entities });
                    })
                )
            })
        )
    }

    @Action(ActionEventSetId)
    setEventId({ patchState, getState, dispatch } : StateContext<StateEventModel>, { payload }: ActionEventSetId)
    {
        const id: string = payload;
        const entities : Record<string, Event> = StateEvent.entities(getState());
        const now: Date = DateUtil.now();

        const event: Event = id !== CoreEnum.IdNew ? entities[id] :
        {
            ...StateEventOptions.defaults.empty,
            timeStart: DateUtil.atHourStart(now).toISOString(),
            timeEnd:   DateUtil.atHourNext(now).toISOString()
        };

        patchState({ id });

        return dispatch(new ActionEventSet(event));
    }

    @Action(ActionEventSet)
    setEvent({ patchState } : StateContext<StateEventModel>, { payload }: ActionEventSet)
    {
        const event: Event = payload;

        const form: FormGroup = this.formBuilder.group
        ({
            [AssetKey.Draft]       : event.draft,
            [AssetKey.Name]        : [event.name,        ValidatorsExtended.minLength(1)],
            [AssetKey.Description] : [event.description, ValidatorsExtended.minLength(1)],
            [AssetKey.Private]     : event.private,

            [EventKey.Tagline]   : [event.tagline, ValidatorsExtended.minLength(1)],
            [EventKey.ImageId]   : [event.imageId, Validators.required],
            [EventKey.PlaceId]   : [event.placeId, Validators.required],
            [EventKey.Clusters]  : this.formBuilder.array(event.clusters, Validators.minLength(1)),
            [EventKey.Location]  : [event.location, Validators.required],
            [EventKey.TimeStart] : event.timeStart,
            [EventKey.TimeEnd]   : event.timeEnd
        });

        patchState({ form });
/*
        return this.serviceEvent.
        setEvent(payload).
        pipe
        (
            map((event: Event) =>
            {
                const entities: Record<number, Event> = {};

                entities[event.id] = event;

                patchState({ entities });
            })
        )
*/
    }

    @Action(ActionEventPatch)
    eventPatch({ patchState, getState } : StateContext<StateEventModel>, { key, value }: ActionEventPatch)
    {
        const form: FormGroup = StateEvent.form(getState());

        form.controls[key].patchValue(value);

        patchState({ form });
    }

    @Action(ActionEventSetLocation)
    setEventLocation({ dispatch } : StateContext<StateEventModel>, { payload }: ActionEventSetLocation)
    {
        const result: Result = payload;

        const location: Location =
        {
            latitude  : result.center[0],
            longitude : result.center[1],
            types     : result.place_type as Array<MapboxPlaceType>
        };

        dispatch(new ActionEventPatch(EventKey.Location, location));
    }

    @Action(ActionEventSetImageIndex)
    setImageIndex({ patchState }: StateContext<StateEventModel>, { payload }: ActionEventSetImageIndex)
    {
        const index: number = payload;
        const photos: Array<PhotoAsset> = this.store.selectSnapshot(StatePhotos.photos);

        patchState({ imageUrl: photos[index].data });
    }
}
