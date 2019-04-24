import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action, Selector, Select, State, StateContext, Store } from '@ngxs/store';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

import { StateUser } from '@firefly/core/state/user';
import { User, Event, Cluster, Location, Time } from '@firefly/core/models';
import { ServiceEvent } from '@firefly/core/services';
import { StateEventModel } from './event.state.model';
import { StateEventOptions } from './event.state.options';
import { ActionGetEvents, ActionEventSetId, ActionEventSet, ActionEventPatch, ActionEventSetLocation, ActionEventSave, ActionEventCreate, ActionEventUpdate, ActionEventWatch, ActionEventSetImage } from './event.actions';
import { EventKey, AssetKey } from '@firefly/core/models';
import { ModelKey } from '@theory/firebase';
import { firestore } from 'firebase';
import { ValidatorsExtended, CoreEnum, DateUtil } from '@theory/core';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { MapboxPlaceType } from '@theory/mapbox';
import { RepeatType } from '@firefly/core/enums';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@State<StateEventModel>(StateEventOptions)

export class StateEvent
{
    @Select(StateUser.user) user$:Observable<User>;
    @Select(StateEvent.eventTimeEndValid) eventTimeEndValid$: Observable<boolean>;

    @Selector() static entities(state: StateEventModel): Record<string, Event> { return state.entities; }
    @Selector() static form(state: StateEventModel): FormGroup                 { return state.form; }

    @Selector() static events(state: StateEventModel): Array<Event> { return Object.keys(state.entities).map(id => state.entities[id]); }

    @Selector() static event(state: StateEventModel): Event
    {
        return state.form == null ? undefined : state.form.value;
    }

    @Selector() static eventId(state: StateEventModel): string
    {
        const form: FormGroup = StateEvent.form(state);

        return form == null ? undefined : form.get(ModelKey.Id).value;
    }

    @Selector() static eventIsNew(state: StateEventModel): boolean
    {
        const id: string = StateEvent.eventId(state);

        return id == null || id === CoreEnum.IdNew;
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
        return state.imageUrl;
    }

    @Selector() static eventImageUrlNormalized(state: StateEventModel): string
    {
        return state.imageUrlNormalized;
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

    @Selector() static eventTimes(state: StateEventModel): Array<Time>
    {
        const form: FormGroup = StateEvent.form(state);

        return form == null ? [] : form.get(EventKey.Times).value
    }

    @Selector() static eventTime(state: StateEventModel): Time
    {
        const times: Array<Time> = StateEvent.eventTimes(state);

        return times[0];
    }

    @Selector() static eventTimeStart(state: StateEventModel): string
    {
        return StateEvent.eventTime(state).start;
    }

    @Selector() static eventTimeEnd(state: StateEventModel): string
    {
        return StateEvent.eventTime(state).end;
    }

    @Selector() static eventTimeEndValid(state: StateEventModel): boolean
    {
        const timeStart: Date = new Date(StateEvent.eventTimeStart(state));
        const timeEnd:   Date = new Date(StateEvent.eventTimeEnd(state));

        return timeEnd.getTime() > timeStart.getTime();
    }
    constructor
    (
        private service: ServiceEvent,
        private formBuilder: FormBuilder,
        private store: Store,
        private webview: WebView
    ) { }

    @Action(ActionGetEvents)
    getEvents({ patchState } : StateContext<StateEventModel>)
    {
        return this.user$.pipe(
            map((user:User) => user.uidInternal),
            switchMap(uidInternal => {
                return this.service.
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
    setEventId({ getState, dispatch } : StateContext<StateEventModel>, { payload }: ActionEventSetId)
    {
        const id: string = payload;
        const isNew: boolean = id === CoreEnum.IdNew;
        const now: Date = DateUtil.now();
        const userId: string = this.store.selectSnapshot(StateUser.userId);

        const event: Event = !isNew ? undefined :
        {
            id,
            ...StateEventOptions.defaults.empty,
            userId,
            times:
            [
                {
                    start:      DateUtil.atHourStart(now).toISOString(),
                    end:        DateUtil.atHourNext(now).toISOString(),
                    repeatType: RepeatType.Never
                }
            ]
        };

        return dispatch(new ActionEventWatch(id, event));
    }

    @Action(ActionEventSet)
    setEvent({ patchState, getState } : StateContext<StateEventModel>, { payload }: ActionEventSet)
    {
        const event: Event  = payload;
        const id:    string = event[ModelKey.Id];

        const form: FormGroup = this.formBuilder.group
        ({
            [ModelKey.Id]          : id,
            [ModelKey.DateCreated] : event[ModelKey.DateCreated],
            [ModelKey.DateUpdated] : event[ModelKey.DateUpdated],

            [AssetKey.UserId]      : event[AssetKey.UserId],
            [AssetKey.Name]        : [event[AssetKey.Name],        ValidatorsExtended.minLength(1)],
            [AssetKey.Description] : [event[AssetKey.Description], ValidatorsExtended.minLength(1)],
            [AssetKey.Private]     : event[AssetKey.Private],
            [AssetKey.Draft]       : event[AssetKey.Draft],

            [EventKey.Version]   : event[EventKey.Version],
            [EventKey.Tagline]   : [event[EventKey.Tagline], ValidatorsExtended.minLength(1)],
            [EventKey.ImageId]   : [event[EventKey.ImageId], Validators.required],
            [EventKey.Clusters]  : this.formBuilder.array(event[EventKey.Clusters], Validators.minLength(1)),
            [EventKey.Location]  : [event[EventKey.Location], Validators.required],
            [EventKey.Times]     : [event[EventKey.Times], [], this.validateEventTimeEndValid.bind(this)]
        });

        patchState({ form });

        if (id !== CoreEnum.IdNew)
        {
            const entities: Record<string, Event> = StateEvent.entities(getState());

            patchState
            ({
                entities:
                {
                    ...entities,
                    [id]: event
                }
            });
        }
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

    @Action(ActionEventWatch, { cancelUncompleted: true })
    eventWatch({ dispatch } : StateContext<StateEventModel>, { id, event }: ActionEventWatch)
    {
        const event$: Observable<Event> = event != null ? of(event) : this.service.read(id);

        return event$.pipe
        (
            tap((e: Event) => dispatch(new ActionEventSet(e)))
        );
    }

    @Action(ActionEventPatch)
    eventPatch({ patchState, getState } : StateContext<StateEventModel>, { key, value }: ActionEventPatch)
    {
        const form: FormGroup = StateEvent.form(getState());

        if (key === EventKey.TimeStart || key === EventKey.TimeEnd)
        {
            const control: AbstractControl = form.controls[EventKey.Times];
            const times: Array<Time>       = control.value;
            const time: Time               = times[0];

            time[key] = value;

            control.patchValue([time]);
        }
        else
        {
            form.controls[key].patchValue(value);
        }

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

    @Action(ActionEventSetImage)
    setImageIndex({ patchState, dispatch }: StateContext<StateEventModel>, { payload }: ActionEventSetImage)
    {
        const imageUrl: string = payload;
        const imageUrlNormalized: string = this.webview.convertFileSrc(imageUrl);

        patchState
        ({
            imageUrl,
            imageUrlNormalized
        });

        dispatch(new ActionEventCreate());
    }

    @Action(ActionEventSave)
    save({ dispatch, getState }: StateContext<StateEventModel>)
    {
        const id: string = StateEvent.eventId(getState());

        return id === CoreEnum.IdNew ? dispatch(new ActionEventCreate()) : dispatch(new ActionEventUpdate());
    }

    @Action(ActionEventCreate)
    create({ patchState, getState }: StateContext<StateEventModel>)
    {
        const state: StateEventModel = getState();
        const event: Event           = StateEvent.event(state);
        const imageUrl: string       = StateEvent.eventImageUrl(state);

        return this.service.create(event, imageUrl);
    }

    @Action(ActionEventUpdate)
    update({ patchState }: StateContext<StateEventModel>)
    {

    }

    private validateEventTimeEndValid(): Observable<{[key: string]: any} | null>
    {
        return this.eventTimeEndValid$.pipe
        (
            map((valid: boolean) => valid ? null : { timeEndInvalid: true })
        );
    }
}
