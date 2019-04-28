import { map, tap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action, Selector, Select, State, StateContext, Store } from '@ngxs/store';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

import { StateUser } from '@firefly/core/state/user';
import { User, Event, Location, Time, Cluster } from '@firefly/core/models';
import { ServiceEvent, ServiceImage } from '@firefly/core/services';
import { StateEventModel } from './event.state.model';
import { StateEventOptions } from './event.state.options';
import { ActionGetEvents, ActionEventSetId, ActionEventSet, ActionEventPatch, ActionEventSetLocation, ActionEventSave, ActionEventCreate, ActionEventUpdate, ActionEventWatch, ActionEventSetImage, ActionEventSetClusterPrimary } from './event.actions';
import { EventKey, AssetKey } from '@firefly/core/models';
import { ModelKey } from '@theory/firebase';
import { ValidatorsExtended, CoreEnum, DateUtil } from '@theory/core';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { MapboxPlaceType } from '@theory/mapbox';
import { RepeatType } from '@firefly/core/enums';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@State<StateEventModel>(StateEventOptions)

export class StateEvent
{
    @Select(StateUser.user)               user$:              Observable<User>;
    @Select(StateEvent.eventTimeEndValid) eventTimeEndValid$: Observable<boolean>;

    @Selector() static form(state: StateEventModel): FormGroup { return state.form; }

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

    @Selector() static eventCanUpdate(state: StateEventModel): boolean
    {
        const form: FormGroup = StateEvent.form(state);

        return form == null ? false : form.valid && form.dirty;
    }

    @Selector() static eventImageUrl(state: StateEventModel): string
    {
        return state.imageUrl;
    }

    @Selector() static eventImageUrlNormalized(state: StateEventModel): string
    {
        return state.imageUrlNormalized;
    }

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

    @Selector() static eventClusters(state: StateEventModel): Array<string>
    {
        const form: FormGroup = StateEvent.form(state);

        return form == null ? [] : form.get(EventKey.Clusters).value
    }

    @Selector() static eventClusterPrimary(state: StateEventModel): Cluster
    {
        return state.clusterPrimary;
    }

    @Selector() static eventClusterIcon(state: StateEventModel): string
    {
        const cluster: Cluster = StateEvent.eventClusterPrimary(state);

        return cluster == null ? undefined : cluster.iconId;
    }

    constructor
    (
        private service: ServiceEvent,
        private formBuilder: FormBuilder,
        private store: Store,
        private webview: WebView,
        private image: ServiceImage
    ) { }

    @Action(ActionGetEvents)
    getEvents({ patchState } : StateContext<StateEventModel>)
    {

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
            ...this.service.clone(StateEventOptions.defaults.empty),
            id,
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
    setEvent({ patchState } : StateContext<StateEventModel>, { payload }: ActionEventSet)
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
    }

    @Action(ActionEventWatch, { cancelUncompleted: true })
    eventWatch({ dispatch } : StateContext<StateEventModel>, { id, event }: ActionEventWatch)
    {
        const event$: Observable<Event> = id === CoreEnum.IdNew ? of(event) : this.service.valuesChanges(id);

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
    setImageIndex({ patchState }: StateContext<StateEventModel>, { payload }: ActionEventSetImage)
    {
        const imageUrl: string = payload;
        const imageUrlNormalized: string = this.webview.convertFileSrc(imageUrl);

        patchState
        ({
            imageUrl,
            imageUrlNormalized
        });
    }

    @Action(ActionEventSave)
    save({ dispatch, getState }: StateContext<StateEventModel>)
    {
        const id: string = StateEvent.eventId(getState());

        return id === CoreEnum.IdNew ? dispatch(new ActionEventCreate()) : dispatch(new ActionEventUpdate());
    }

    @Action(ActionEventCreate)
    create({ getState, patchState }: StateContext<StateEventModel>)
    {
        /*
            ToDo:

            *) Change app-item-header to dummy component similar to app-item-image

            *) Set cluster.events = { ...clusters.events, event.clusters[0]}
            *) Patch cluster
            *) Patch user events/images

            *) In event watch, write downloadUrl to event state
            *) Create downloadUrl @Selector
            *) Photo resize cloud function
            *) On user create, also create dummy first cluster
            *) Create eventClusters as Record<string, Cluster>
            *) NGXS event create action
            *) Update and test all cloud functions
            *) Add loading screen while creating/updating
            *) Add toast for success/error
            *) Install copilot
        */

        const state:    StateEventModel = getState();
        const e:        Event           = StateEvent.event(state);
        const imageUrl: string          = StateEvent.eventImageUrl(state);
        const form:     FormGroup       = StateEvent.form(state);

        return this.image.createWithUpload(e, imageUrl).
        pipe
        (
            switchMap((event: Event) => this.service.create(event)),
            tap((event: Event) => form.reset(event)),
            tap(() => patchState({ form }))
        );
    }

    @Action(ActionEventUpdate)
    update({ }: StateContext<StateEventModel>)
    {

    }

    @Action(ActionEventSetClusterPrimary)
    setClusterPrimary({ patchState, dispatch }: StateContext<StateEventModel>, { payload }: ActionEventSetClusterPrimary)
    {
        const clusterPrimary: Cluster = payload;
        const clusters: Array<string> = [ clusterPrimary[ModelKey.Id]];

        patchState({ clusterPrimary });

        dispatch(new ActionEventPatch(EventKey.Clusters, clusters));
    }

    private validateEventTimeEndValid(): Observable<Record<string, any> | null>
    {
        return this.eventTimeEndValid$.pipe
        (
            map((valid: boolean) => valid ? null : { timeEndInvalid: true })
        );
    }
}
