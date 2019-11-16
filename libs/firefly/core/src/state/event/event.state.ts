import { map, switchMap, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { UpdateFormValue, SetFormPristine } from '@ngxs/form-plugin';
import { FormGroup } from '@angular/forms';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

import { ActionMapSearchResultClear } from '@theory/mapbox';
import { CoreEnum, CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsStatus } from '@theory/ngxs';
import { StateUser } from '@firefly/core/state/user';
import { Event, Location, Time } from '@firefly/core/models';
import { ServiceEvents, ServiceClusterEvents } from '@firefly/core/services';
import { ActionImageGet, ActionImageCreate, StateImage, ActionImageSetId } from '@firefly/core/state/image';

import { StateEventModel } from './event.state.model';
import { StateEventOptions } from './event.state.options';
import {
  ActionEventGet,
  ActionEventLocationSet,
  ActionEventCreate,
  ActionEventTimeSet,
  ActionEventPatch,
  ActionEventDelete,
  ActionEventReset,
  ActionEventSet,
  ActionEventSave,
  ActionEventImageAdd,
  ActionEventImageRemove,
  ActionEventSetId
} from './event.actions';
import { ActionUserEventsAdd, ActionUserEventsRemove, StateUserEvents, ActionUserEventsSync } from '../user-events';
import { ActionClusterReset, StateCluster } from '../cluster';
import { ImageSize } from '@theory/firebase';

@State<StateEventModel>(StateEventOptions)

export class StateEvent
{
    constructor
    (
        private service:       ServiceEvents,
        private clusterEvents: ServiceClusterEvents,
        private store:         Store
    ) { }

    @Selector() static form(state: StateEventModel): FormNgxs { return state.form; }
    @Selector() static formGroup(state: StateEventModel): FormGroup { return state.formGroup; }
    @Selector() static formPath(state: StateEventModel): string { return state.formPath; }
    @Selector() static isForm(state: StateEventModel): boolean { return StateEvent.formGroup(state) != null; }
    @Selector() static data(state: StateEventModel): Event { return StateEvent.form(state).model; }
    @Selector() static id(state: StateEventModel): string { return StateEvent.data(state).id; }
    @Selector() static isNew(state: StateEventModel): boolean { return  StateEvent.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateEventModel): boolean { return StateEvent.form(state).status === FormNgxsStatus.Valid && StateEvent.form(state).dirty; }

    @Selector() static image(state: StateEventModel): string { return StateEvent.data(state).imageUrl; }
    @Selector() static location(state: StateEventModel): Location { return StateEvent.form(state).model.location; }
    @Selector() static locationDefined(state: StateEventModel): boolean { return StateEvent.location(state) != null; }
    @Selector() static locations(state: StateEventModel): Array<Location> { return [ StateEvent.location(state) ]; }
    @Selector() static times(state: StateEventModel): Array<Time> { return StateEvent.data(state).times; }
    @Selector() static time(state: StateEventModel): Time { return StateEvent.times(state)[0]; }
    @Selector() static timeStart(state: StateEventModel): string { return StateEvent.time(state).start; }
    @Selector() static timeEnd(state: StateEventModel): string { return StateEvent.time(state).end; }
    @Selector() static timeEndValid(state: StateEventModel): boolean
    {
        const timeStart: Date = new Date(StateEvent.timeStart(state));
        const timeEnd:   Date = new Date(StateEvent.timeEnd(state));

        return timeEnd.getTime() > timeStart.getTime();
    }

    @Action(ActionEventReset)
    reset({ patchState, getState, dispatch }: StateContext<StateEventModel>)
    {
        const defaults: StateEventModel = CoreUtil.clone<StateEventModel>(StateEventOptions.defaults);

        patchState(defaults);

        return dispatch
        ([
            new SetFormPristine(StateEvent.formPath(getState())),
            new ActionClusterReset(),
            new ActionMapSearchResultClear()
        ]);
    }

    @Action(ActionEventGet)
    get({ dispatch }: StateContext<StateEventModel>, { payload }: ActionEventGet)
    {
        return this.service.snapshot(payload).
        pipe
        (
            switchMap((object: Event) =>
                dispatch
                ([
                    new ActionEventSet(object),
                    new ActionImageGet(object.imageId)
                ])
            )
        );
    }

    @Action(ActionEventSetId)
    setId({ dispatch }: StateContext<StateEventModel>, { payload }: ActionEventSetId)
    {
        const id: string = payload;

        const object: Event = id === CoreEnum.IdNew ?
            this.service.build(this.store.selectSnapshot(StateUser.id), CoreUtil.clone<Event>(StateEventOptions.defaults.empty)) :
            this.store.selectSnapshot(StateUserEvents.lookup)[id]

        return dispatch
        ([
            new ActionEventSet(object),
            new ActionImageSetId(object.imageId)
        ]);
    }

    @Action(ActionEventSet)
    set({ patchState, getState, dispatch }: StateContext<StateEventModel>, { payload }: ActionEventSet)
    {
        const object: Event = payload;

        return dispatch
        ([
            new ActionEventReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.getDownloadUrl(object.imageId, ImageSize.Medium).
                pipe(tap((url: string) => object.imageUrl = url))
            ),
            map(() =>
                patchState({ formGroup: this.service.formCreate(object) })
            ),

            switchMap(() =>
                dispatch(new UpdateFormValue({ value: object, path: StateEvent.formPath(getState())}))
            )
        );
    }

    @Action(ActionEventPatch)
    patch({ dispatch, getState } : StateContext<StateEventModel>, { payload }: ActionEventPatch)
    {
        const state: StateEventModel = getState();
        const data:  Event           = StateEvent.data(state);
        const value: Event           = { ...data, ...payload };
        const path:  string          = StateEvent.formPath(state);

        return dispatch(new UpdateFormValue({ value, path })).
        pipe
        (
            switchMap(() =>
                data.id === CoreEnum.IdNew ?
                    of(null) :
                    dispatch(new ActionUserEventsSync(data))
            )
        );
    }

    @Action(ActionEventCreate)
    create({ getState, dispatch }: StateContext<StateEventModel>)
    {
        const state:      StateEventModel = getState();
        const data:       Event           = StateEvent.data(state);
        const imageIsNew: boolean         = this.store.selectSnapshot(StateImage.isNew);
        const clusterId:  string          = this.store.selectSnapshot(StateCluster.id);

        return forkJoin
        (
            imageIsNew ? dispatch(new ActionImageCreate()) : of(null),
            this.service.create(data),
            this.clusterEvents.add(clusterId, data)
        ).
        pipe
        (
            switchMap(() => dispatch(new ActionUserEventsAdd(data)))
        );
    }

    @Action(ActionEventSave)
    save({ getState, dispatch }: StateContext<StateEventModel>)
    {
        const state:     StateEventModel = getState();
        const formPath:  string          = StateEvent.formPath(state);
        const formGroup: FormGroup       = StateEvent.formGroup(state);
        const isNew:     boolean         = StateEvent.isNew(state);
        const id:        string          = StateEvent.id(state);

        return isNew ?
            dispatch(new ActionEventCreate()) :
            this.service.patch(id, this.service.changedFields(formGroup)).
            pipe
            (
                switchMap(() => dispatch(new SetFormPristine(formPath)))
            );
    }

    @Action(ActionEventDelete)
    delete({ getState, dispatch }: StateContext<StateEventModel>)
    {
        const data: Event = StateEvent.data(getState());

        return this.service.delete(data).
        pipe
        (
            switchMap(() =>
                dispatch
                ([
                    new ActionUserEventsRemove(data.id),
                    new ActionEventReset()
                ])
            )
        );
    }

    @Action(ActionEventImageAdd)
    imageAdd({ dispatch }: StateContext<StateEventModel>)
    {
        return dispatch
        ([
            new ActionEventPatch({ imageId: this.store.selectSnapshot(StateImage.id)})
        ]);
    }

    @Action(ActionEventImageRemove)
    imageRemove({ dispatch  }: StateContext<StateEventModel>)
    {
        return dispatch
        ([
            new ActionEventPatch({ imageId: undefined })
        ]);
    }

    @Action(ActionEventLocationSet)
    setLocation({ getState } : StateContext<StateEventModel>, { payload }: ActionEventLocationSet)
    {
        const form: FormGroup = StateEvent.formGroup(getState());
        const result: Result = payload;

        this.service.locationSet(form, result);
    }

    @Action(ActionEventTimeSet)
    setTime({ getState }: StateContext<StateEventModel>, { key, value }: ActionEventTimeSet)
    {
        const form: FormGroup = StateEvent.formGroup(getState());

        this.service.timeSet(form, key, value);
    }
}
