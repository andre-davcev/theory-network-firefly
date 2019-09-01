import { map, switchMap, take } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { FormGroup } from '@angular/forms';

import { StateUser } from '@firefly/core/state/user';
import { Event, Location, Time, Cluster } from '@firefly/core/models';
import { ServiceEvents, ServiceImages, } from '@firefly/core/services';
import { StateEventModel } from './event.state.model';
import { StateEventOptions } from './event.state.options';
import {
  ActionEventGet,
  ActionEventPatchForm,
  ActionEventLocationSet,
  ActionEventCreate,
  ActionEventImageSet,
  ActionEventClusterAdd,
  ActionEventTimeSet,
  ActionEventPatch,
  ActionEventDelete,
  ActionEventReset
} from './event.actions';
import { CoreEnum, CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsStatus } from '@theory/state';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { UpdateFormValue, SetFormPristine } from '@ngxs/form-plugin';
import { ActionMapSearchResultClear } from '@theory/mapbox';
import { ActionUserEventsAdd, ActionUserEventsRemove } from '../user-events';

@State<StateEventModel>(StateEventOptions)

export class StateEvent
{
    private formPath: string = `${StateEventOptions.name}.form`;

    constructor
    (
        private service: ServiceEvents,
        private store: Store,
        private image: ServiceImages
    ) { }

    @Selector() static form(state: StateEventModel): FormNgxs { return state.form; }
    @Selector() static formGroup(state: StateEventModel): FormGroup { return state.formGroup; }
    @Selector() static data(state: StateEventModel): Event { return StateEvent.form(state).model; }
    @Selector() static id(state: StateEventModel): string { return StateEvent.data(state).id; }
    @Selector() static imageId(state: StateEventModel): string { return StateEvent.data(state).imageId; }
    @Selector() static imageUrl(state: StateEventModel): string { return state.imageUrl; }
    @Selector() static isNew(state: StateEventModel): boolean { return  StateEvent.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateEventModel): boolean { return StateEvent.form(state).status === FormNgxsStatus.Valid && StateEvent.form(state).dirty; }
    @Selector() static clusters(state: StateEventModel): Record<string, Cluster> { return state.clusters == null ? {} : state.clusters; }
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
    @Selector() static clusterPrimary(state: StateEventModel): Cluster
    {
        const clusters: Record<string, string | Cluster> = StateEvent.clusters(state);
        const keys:     Array<string>                    = Object.keys(clusters);

        return clusters[keys[0]] as Cluster;
    }

    @Selector() static clusterIcon(state: StateEventModel): string
    {
        const cluster: Cluster = StateEvent.clusterPrimary(state);

        return cluster == null ? undefined : cluster.iconId;
    }

    @Action(ActionEventReset)
    reset({ patchState, dispatch }: StateContext<StateEventModel>)
    {
        const defaults: StateEventModel = CoreUtil.clone<StateEventModel>(StateEventOptions.defaults);

        patchState(defaults);

        return dispatch
        ([
            new ActionEventImageSet(),
            new ActionMapSearchResultClear(),
            new SetFormPristine(this.formPath)
        ]);
    }

    @Action(ActionEventGet)
    get({ patchState, dispatch } : StateContext<StateEventModel>, { payload }: ActionEventGet)
    {
        const id: string = payload;
        const userId: string = this.store.selectSnapshot(StateUser.userId);
        const defaults: Event = StateEventOptions.defaults.empty;
        const item$: Observable<Event> = id === CoreEnum.IdNew ?
            of(this.service.build(userId, defaults)) :
            this.service.valuesChanges(id);

        return dispatch(new ActionEventReset()).
        pipe
        (
            switchMap(() => item$),
            take(1),
            switchMap((item: Event) =>
                this.image.getDownloadUrl(item.imageId).pipe
                (
                    map((imageUrl: string) =>
                        patchState
                        ({
                            imageUrl,
                            clusters: {},
                            formGroup: this.service.formCreate(item)
                        })
                    ),
                    switchMap(() =>
                        dispatch(new UpdateFormValue({ value: item, path: this.formPath}))
                    )
                )
            )
        );
    };

    @Action(ActionEventCreate)
    create({ getState, dispatch }: StateContext<StateEventModel>)
    {
        const state:    StateEventModel = getState();
        const data:     Event           = StateEvent.data(state);
        const imageUrl: string          = StateEvent.imageId(state);

        return forkJoin
        (
            this.image.createWithUpload(data, imageUrl),
            this.service.create(data).pipe,
            dispatch(new ActionUserEventsAdd(data))
        );
    }

    @Action(ActionEventDelete)
    delete({ getState, dispatch }: StateContext<StateEventModel>)
    {
        const id: string = StateEvent.id(getState());

        return dispatch
        ([
            new ActionEventReset(),
    /*
        database.collection('image-events').doc(imageId).update({ [id]: FieldValue.delete() }),
    */
            new ActionUserEventsRemove(id)
        ]);
    }



    @Action(ActionEventPatchForm)
    setEvent({ dispatch } : StateContext<StateEventModel>, { payload }: ActionEventPatchForm)
    {
        const value: Event = payload;
        const path: string = this.formPath;

        return dispatch(new UpdateFormValue({ value, path }));
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

    @Action(ActionEventImageSet)
    setImage({ patchState, getState }: StateContext<StateEventModel>, { payload }: ActionEventImageSet)
    {
        const imageId:   string    = payload;
        const imageUrl:  string    = this.image.normalizeUrl(imageId);
        const formGroup: FormGroup = StateEvent.formGroup(getState());

        this.service.imageIdSet(formGroup, imageId);

        patchState({ imageUrl });
    }

    @Action(ActionEventPatch)
    update({ }: StateContext<StateEventModel>)
    {
/*
    const id:     string              = change.after.id;
    const key:    string              = 'imageId';
    const before: Record<string, any> = change.before.data();
    const after:  Record<string, any> = change.after.data();

    const collection: CollectionReference = database.collection('image-events');

    let promise: Promise<any> = Promise.resolve();

    if (before[key] == null && after[key] != null)
    {
        promise = collection.doc(after[key]).update({ [id]: id });
    }
    else if (before[key] != null && after[key] == null)
    {
        promise = collection.doc(before[key]).update({ [id]: FieldValue.delete() })
    }
*/
    }

    @Action(ActionEventClusterAdd)
    setClusterPrimary({ patchState, getState }: StateContext<StateEventModel>, { payload }: ActionEventClusterAdd)
    {
        const form:    FormGroup = StateEvent.formGroup(getState());
        const cluster: Cluster   = payload;

        const clusters: Record<string, string | Cluster> = {[cluster.id]: cluster};

        patchState({ clusters });

        this.service.patchValue(form, 'clusters', clusters);
    }
}
