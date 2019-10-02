
import { FormGroup, } from '@angular/forms';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { UpdateFormValue, SetFormPristine } from '@ngxs/form-plugin';

import { CoreEnum, CoreUtil } from '@theory/core';
import { FormNgxs, FormNgxsStatus } from '@theory/state';
import { Cluster } from '@firefly/core/models';
import { ServiceClusters } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state/user';
import { ActionIconGet, ActionIconCreate, StateIcon } from '@firefly/core/state/icon';

import { StateClusterModel } from './cluster.state.model';
import { StateClusterOptions } from './cluster.state.options';
import {
    ActionClusterReset,
    ActionClusterGet,
    ActionClusterSet,
    ActionClusterPatch,
    ActionClusterCreate,
    ActionClusterSave,
    ActionClusterDelete,
    ActionClusterIconAdd,
    ActionClusterIconRemove
} from './cluster.actions';
import { ActionClusterEventsReset, ActionClusterEventsDelete } from '../cluster-events';
import { ActionClusterSubscribersReset, ActionClusterSubscribersDelete, StateClusterSubscribersModel } from '../cluster-subscribers';
import { ActionUserClustersAdd, ActionUserClustersRemove } from '../user-clusters';
import { ActionIconClustersRemove, ActionIconClustersAdd } from '../icon-clusters';
import undefined = require('firebase/empty-import');

@State<StateClusterModel>(StateClusterOptions)

export class StateCluster
{
    constructor
    (
        private store:   Store,
        private service: ServiceClusters
    ) {}

    @Selector() static form(state: StateClusterModel): FormNgxs { return state.form; }
    @Selector() static formGroup(state: StateClusterModel): FormGroup { return state.formGroup; }
    @Selector() static formPath(state: StateClusterModel): string { return state.formPath; }
    @Selector() static isForm(state: StateClusterModel): boolean { return StateCluster.formGroup(state) != null; }
    @Selector() static data(state: StateClusterModel): Cluster { return StateCluster.form(state).model; }
    @Selector() static id(state: StateClusterModel): string { return StateCluster.data(state).id; }
    @Selector() static isNew(state: StateClusterModel): boolean { return  StateCluster.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateClusterModel): boolean { return StateCluster.form(state).status === FormNgxsStatus.Valid && StateCluster.form(state).dirty; }

    @Action(ActionClusterReset)
    reset({ patchState, getState, dispatch }: StateContext<StateClusterModel>)
    {
        const defaults: StateClusterModel = CoreUtil.clone<StateClusterModel>(StateClusterOptions.defaults);

        patchState(defaults);

        return dispatch
        ([
            new SetFormPristine(StateCluster.formPath(getState()))
        ]);
    }

    @Action(ActionClusterGet)
    get({ dispatch } : StateContext<StateClusterModel>, { payload }: ActionClusterGet)
    {
        const id: string = payload;

        const object$: Observable<Cluster> = id === CoreEnum.IdNew ?
            of(this.service.build(this.store.selectSnapshot(StateUser.id), StateClusterOptions.defaults.empty)) :
            this.service.snapshot(id);

        return object$.pipe
        (
            switchMap((object: Cluster) =>
                dispatch
                ([
                    new ActionClusterSet(object),
                    new ActionIconGet(object.iconId)
                ])
            )
        );
    };

    @Action(ActionClusterSet)
    set({ patchState, getState, dispatch }: StateContext<StateClusterModel>, { payload }: ActionClusterSet)
    {
        const object: Cluster = payload;

        return dispatch
        ([
            new ActionClusterReset(),
            new ActionClusterEventsReset(),
            new ActionClusterSubscribersReset(),
            new ActionUserClustersAdd(StateCluster.data(getState()))
        ]).
        pipe
        (
            map(() =>
                patchState
                ({
                    formGroup: this.service.formCreate(object)
                })
            ),

            switchMap(() =>
                dispatch(new UpdateFormValue({ value: object, path: StateCluster.formPath(getState())}))
            )
        );
    }

    @Action(ActionClusterPatch)
    patch({ dispatch, getState } : StateContext<StateClusterModel>, { payload, save }: ActionClusterPatch)
    {
        const value: Partial<Cluster>  = payload;
        const state: StateClusterModel = getState();
        const path:  string            = StateCluster.formPath(state);
        const save$: Observable<void>  = save ? this.service.patch(StateCluster.id(state), value) : of();

        return save$.pipe
        (
            switchMap(() => dispatch(new UpdateFormValue({ value, path })))
        );
    }

    @Action(ActionClusterCreate)
    create({ getState, dispatch }: StateContext<StateClusterModel>)
    {
        const state: StateClusterModel = getState();
        const data:  Cluster           = StateCluster.data(state);

        return forkJoin
        (
            data.id === CoreEnum.IdNew ? dispatch(new ActionIconCreate()) : of(),
            this.service.create(data)
        );
    }

    @Action(ActionClusterSave)
    save({ getState }: StateContext<StateClusterModel>)
    {
        const data: Cluster = StateCluster.data(getState());

        return this.service.patch(data.id, data);
    }

    @Action(ActionClusterDelete)
    delete({ getState, dispatch }: StateContext<StateClusterModel>)
    {
        const data: Cluster = StateCluster.data(getState());

        return this.service.delete(data).
        pipe
        (
            switchMap(() =>
                dispatch
                ([
                    new ActionClusterEventsDelete(),
                    new ActionClusterSubscribersDelete(),
                    new ActionIconClustersRemove(data.id),
                    new ActionUserClustersRemove(data.id),
                    new ActionClusterReset()
                ])
            )
        );
    }

    @Action(ActionClusterIconAdd)
    iconAdd({ dispatch, getState }: StateContext<StateClusterModel>)
    {
        return dispatch
        ([
            new ActionIconClustersAdd(StateCluster.data(getState())),
            new ActionClusterPatch({ iconId: this.store.selectSnapshot(StateIcon.id)})
        ]);
    }

    @Action(ActionClusterIconRemove)
    iconRemove({ dispatch, getState }: StateContext<StateClusterModel>)
    {
        return dispatch
        ([
            new ActionIconClustersRemove(StateCluster.id(getState())),
            new ActionClusterPatch({ iconId: undefined })
        ]);
    }
}
