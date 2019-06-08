import { map, tap, switchMap, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action, Selector, Select, State, StateContext, Store } from '@ngxs/store';
import { FormGroup } from '@angular/forms';

import { StateUser } from '@firefly/core/state/user';
import { User, Event, Location, Time, Cluster } from '@firefly/core/models';
import { ServiceEvent, ServiceImage, ServiceCluster, ServiceUser } from '@firefly/core/services';
import { StateEventModel } from './event.state.model';
import { StateEventOptions } from './event.state.options';
import {
  ActionGetEvents,
  ActionEventSetId,
  ActionEventSet,
  ActionEventSetLocation,
  ActionEventSave,
  ActionEventCreate,
  ActionEventWatch,
  ActionEventSetImage,
  ActionEventSetClusterPrimary,
  ActionEventSetTime,
  ActionEventUpdate
} from './event.actions';
import { EventKey, AssetKey } from '@firefly/core/models';
import { ModelKey } from '@theory/firebase';
import { CoreEnum, FormNgxs, FormNgxsStatus } from '@theory/core';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { UpdateFormValue, SetFormPristine } from '@ngxs/form-plugin';
import { ActionMapSearchResultClear } from '@theory/mapbox';

@State<StateEventModel>(StateEventOptions)

export class StateEvent
{
    @Select(StateUser.user) user$: Observable<User>;

    @Selector() static form(state: StateEventModel): FormNgxs { return state.form; }
    @Selector() static formGroup(state: StateEventModel): FormGroup { return state.formGroup; }
    @Selector() static event(state: StateEventModel): Event { return StateEvent.form(state).model; }
    @Selector() static eventId(state: StateEventModel): string { return StateEvent.event(state)[ModelKey.Id]; }
    @Selector() static eventImageUrl(state: StateEventModel): string { return state.imageUrl; }
    @Selector() static eventImageUrlNormalized(state: StateEventModel): string { return state.imageUrlNormalized; }
    @Selector() static eventIsNew(state: StateEventModel): boolean { return  StateEvent.eventId(state) === CoreEnum.IdNew; }
    @Selector() static eventCanUpdate(state: StateEventModel): boolean { return StateEvent.form(state).status === FormNgxsStatus.Valid && StateEvent.form(state).dirty; }
    @Selector() static eventLocation(state: StateEventModel): Location { return StateEvent.form(state)[EventKey.Location]; }
    @Selector() static eventLocationDefined(state: StateEventModel): boolean { return StateEvent.eventLocation(state) != null; }
    @Selector() static eventLocations(state: StateEventModel): Array<Location> { return [ StateEvent.eventLocation(state) ]; }
    @Selector() static eventTimes(state: StateEventModel): Array<Time> { return StateEvent.event(state)[EventKey.Times]; }
    @Selector() static eventTime(state: StateEventModel): Time { return StateEvent.eventTimes(state)[0]; }
    @Selector() static eventTimeStart(state: StateEventModel): string { return StateEvent.eventTime(state).start; }
    @Selector() static eventTimeEnd(state: StateEventModel): string { return StateEvent.eventTime(state).end; }
    @Selector() static eventTimeEndValid(state: StateEventModel): boolean
    {
        const timeStart: Date = new Date(StateEvent.eventTimeStart(state));
        const timeEnd:   Date = new Date(StateEvent.eventTimeEnd(state));

        return timeEnd.getTime() > timeStart.getTime();
    }
    @Selector() static eventClusters(state: StateEventModel): Array<string>
    {
        const clusters: Record<string, string> = StateEvent.form(state)[EventKey.Clusters];

        return Object.keys( clusters == null ? {} : clusters );
    }
    @Selector() static eventClusterPrimary(state: StateEventModel): Cluster { return state.clusterPrimary; }
    @Selector() static eventClusterIcon(state: StateEventModel): string
    {
        const cluster: Cluster = StateEvent.eventClusterPrimary(state);

        return cluster == null ? undefined : cluster.iconId;
    }

    constructor
    (
        private service: ServiceEvent,
        private store: Store,
        private image: ServiceImage,
        private cluster: ServiceCluster,
        private user: ServiceUser
    ) { }

    @Action(ActionGetEvents)
    getEvents({ patchState } : StateContext<StateEventModel>)
    {

    }

    @Action(ActionEventSetId)
    setEventId({ patchState, dispatch } : StateContext<StateEventModel>, { payload }: ActionEventSetId)
    {
        const id: string = payload;
        const userId: string = this.store.selectSnapshot(StateUser.userId);
        const defaults: Event = StateEventOptions.defaults.empty;
        const event: Event = id !== CoreEnum.IdNew ? undefined : this.service.build(userId, defaults);

        const formGroup: FormGroup = this.service.formCreate(event);

        console.log(event);

        patchState
        ({
            formGroup,
            imageUrl:           undefined,
            imageUrlNormalized: undefined,
            clusterPrimary:     undefined
        });

        return dispatch
        ([
            new ActionMapSearchResultClear(),
            new SetFormPristine('event.form'),
            new UpdateFormValue({ value: event, path: 'event.form'}),
            new ActionEventWatch(event)
        ]);
    }

    @Action(ActionEventWatch, { cancelUncompleted: true })
    eventWatch({ dispatch } : StateContext<StateEventModel>, { payload }: ActionEventWatch)
    {
        const event: Event  = payload;
        const id:    string = event[ModelKey.Id];

        const event$: Observable<Event> = id === CoreEnum.IdNew ? of(event) : this.service.valuesChanges(id).

        pipe(switchMap((e: Event) =>
            this.image.getDownloadUrl(e[EventKey.ImageId]).
            pipe
            (
                switchMap((url: string) => dispatch(new ActionEventSetImage(url))),
                map(() => e)
            )
        ));

        return event$.pipe(tap((e: Event) => dispatch(new ActionEventSet(e))));
    };

    @Action(ActionEventSet)
    setEvent({ dispatch } : StateContext<StateEventModel>, { payload }: ActionEventSet)
    {
        const value: Event = payload;
        const path: string = 'event.form';

        return dispatch(new UpdateFormValue({ value, path }));
    }

    @Action(ActionEventSetLocation)
    setLocation({ getState } : StateContext<StateEventModel>, { payload }: ActionEventSetLocation)
    {
        const form: FormGroup = StateEvent.formGroup(getState());
        const result: Result = payload;

        this.service.locationSet(form, result);
    }

    @Action(ActionEventSetTime)
    setTime({ getState }: StateContext<StateEventModel>, { key, value }: ActionEventSetTime)
    {
        const form: FormGroup = StateEvent.formGroup(getState());

        this.service.timeSet(form, key, value);
    }

    @Action(ActionEventSetImage)
    setImage({ patchState, getState }: StateContext<StateEventModel>, { payload }: ActionEventSetImage)
    {
        const imageUrl: string           = payload;
        const imageUrlNormalized: string = this.image.normalizeUrl(imageUrl);
        const formGroup: FormGroup       = StateEvent.formGroup(getState());

        this.service.imageIdSet(formGroup, imageUrl);

        patchState
        ({
            imageUrl,
            imageUrlNormalized
        });
    }

    @Action(ActionEventUpdate)
    update({ }: StateContext<StateEventModel>)
    {

    }

    @Action(ActionEventSave)
    save({ dispatch, getState }: StateContext<StateEventModel>)
    {
        const id: string = StateEvent.eventId(getState());

        return id === CoreEnum.IdNew ?

        dispatch(new ActionEventCreate()) : dispatch(new ActionEventUpdate());
    }

    @Action(ActionEventCreate)
    create({ getState, dispatch }: StateContext<StateEventModel>)
    {
        const state:    StateEventModel = getState();
        const e:        Event           = StateEvent.event(state);
        const imageUrl: string          = StateEvent.eventImageUrl(state);

        return this.image.createWithUpload(e, imageUrl).
        pipe
        (
            switchMap((event: Event) => this.service.create(event).pipe
            (
                mergeMap(() =>
                    this.cluster.foreignKeyUpdate(Object.keys(event[EventKey.Clusters])[0], this.service.name, event[ModelKey.Id])
                ),
                mergeMap(() =>
                    this.user.foreignKeyUpdate(event[AssetKey.UserId], this.service.name, event[ModelKey.Id])
                ),
                tap(() => dispatch(new ActionEventWatch(event)))
            ))
        );
    }

    @Action(ActionEventSetClusterPrimary)
    setClusterPrimary({ patchState, getState }: StateContext<StateEventModel>, { payload }: ActionEventSetClusterPrimary)
    {
        const form:           FormGroup = StateEvent.formGroup(getState());
        const clusterPrimary: Cluster   = payload;
        const key:            string    = clusterPrimary[ModelKey.Id];

        const clusters: Record<string, string> = {[key]: key};

        patchState({ clusterPrimary });

        this.service.patchValue(form, EventKey.Clusters, clusters);
    }
}
