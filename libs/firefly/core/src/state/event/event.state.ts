import { map, switchMap } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { UpdateFormValue, SetFormPristine } from '@ngxs/form-plugin';
import { FormGroup } from '@angular/forms';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';

import { ActionMapSearchResultClear } from '@theory/mapbox';
import { CoreEnum, CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsStatus } from '@theory/state';
import { StateUser } from '@firefly/core/state/user';
import { Event, Location, Time } from '@firefly/core/models';
import { ServiceEvents } from '@firefly/core/services';
import { ActionImageGet, ActionImageCreate } from '@firefly/core/state/image';

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
  ActionEventSave
} from './event.actions';

@State<StateEventModel>(StateEventOptions)

export class StateEvent
{
    constructor
    (
        private service: ServiceEvents,
        private store: Store
    ) { }

    @Selector() static form(state: StateEventModel): FormNgxs { return state.form; }
    @Selector() static formGroup(state: StateEventModel): FormGroup { return state.formGroup; }
    @Selector() static formPath(state: StateEventModel): string { return state.formPath; }
    @Selector() static isForm(state: StateEventModel): boolean { return StateEvent.formGroup(state) != null; }
    @Selector() static data(state: StateEventModel): Event { return StateEvent.form(state).model; }
    @Selector() static id(state: StateEventModel): string { return StateEvent.data(state).id; }
    @Selector() static isNew(state: StateEventModel): boolean { return  StateEvent.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateEventModel): boolean { return StateEvent.form(state).status === FormNgxsStatus.Valid && StateEvent.form(state).dirty; }

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
            new ActionMapSearchResultClear()
        ]);
    }

    @Action(ActionEventGet)
    get({ dispatch } : StateContext<StateEventModel>, { payload }: ActionEventGet)
    {
        const id: string = payload;

        const object$: Observable<Event> = id === CoreEnum.IdNew ?
            of(this.service.build(this.store.selectSnapshot(StateUser.id), StateEventOptions.defaults.empty)) :
            this.service.snapshot(id);

        return object$.pipe
        (
            switchMap((object: Event) =>
                dispatch
                ([
                    new ActionEventSet(object),
                    new ActionImageGet(object.imageId)
                ])
            )
        );
    };

    @Action(ActionEventSet)
    set({ patchState, getState, dispatch }: StateContext<StateEventModel>, { payload }: ActionEventSet)
    {
        const object: Event = payload;

        return dispatch(new ActionEventReset()).
        pipe
        (
            map(() =>
                patchState
                ({
                    formGroup: this.service.formCreate(object)
                })
            ),

            switchMap(() =>
                dispatch(new UpdateFormValue({ value: object, path: StateEvent.formPath(getState())}))
            )
        );
    }

    @Action(ActionEventPatch)
    patch({ dispatch, getState } : StateContext<StateEventModel>, { payload, save }: ActionEventPatch)
    {
        const value: Partial<Event>   = payload;
        const state: StateEventModel  = getState();
        const path:  string           = StateEvent.formPath(state);
        const save$: Observable<void> = save ? this.service.patch(StateEvent.id(state), value) : of();

        return save$.pipe
        (
            switchMap(() => dispatch(new UpdateFormValue({ value, path })))
        );
    }

    @Action(ActionEventCreate)
    create({ getState, dispatch }: StateContext<StateEventModel>)
    {
        const state: StateEventModel = getState();
        const data:  Event           = StateEvent.data(state);

        return forkJoin
        (
            dispatch(new ActionImageCreate()),
            this.service.create(data)
        );
    }

    @Action(ActionEventSave)
    save({ getState }: StateContext<StateEventModel>)
    {
        const data: Event = StateEvent.data(getState());

        return this.service.patch(data.id, data);
    }

    @Action(ActionEventDelete)
    delete({ getState, dispatch }: StateContext<StateEventModel>)
    {
        const data: Event = StateEvent.data(getState());

        return this.service.delete(data).
        pipe
        (
            switchMap(() =>
              dispatch(new ActionEventReset())
            )
        );
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
