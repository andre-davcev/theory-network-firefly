import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { Icon, UserIcon } from '@firefly/core/models';
import { ServiceUserIcons, ServiceIcons } from '@firefly/core/services';
import { StateReferenceTable, Default } from '@theory/state';

import { StateUserIconsModel } from './user-icons.state.model';
import { StateUserIconsOptions } from './user-icons.state.options';
import {
    ActionUserIconsAdd,
    ActionUserIconsReset,
    ActionUserIconsRemove,
    ActionUserIconsGetData,
    ActionUserIconsSort,
    ActionUserIconsGet,
    ActionUserIconsSet,
    ActionUserIconsDelete,
    ActionUserIconsSync
} from './user-icons.actions';
import { of } from 'rxjs';
import { StateUser } from '../user';

@State<StateUserIconsModel>(StateUserIconsOptions)

export class StateUserIcons extends StateReferenceTable<UserIcon, Icon, StateUserIconsModel>
{
    @Selector() static data(state: StateUserIconsModel):          Record<string, UserIcon>  { return state.data; }
    @Selector() static keys(state: StateUserIconsModel):          Array<string>             { return state.keys; }
    @Selector() static lookup(state: StateUserIconsModel):        Record<string, Icon>      { return state.lookup; }
    @Selector() static list(state: StateUserIconsModel):          Array<Icon>               { return state.list; }
    @Selector() static offset(state: StateUserIconsModel):        number                    { return state.offset; }
    @Selector() static pageSize(state: StateUserIconsModel):      number                    { return state.pageSize; }
    @Selector() static initialized(state: StateUserIconsModel):   boolean                   { return state.initialized; }
    @Selector() static sortField(state: StateUserIconsModel):     string                    { return state.sortField; }
    @Selector() static sortAscending(state: StateUserIconsModel): boolean                   { return state.sortAscending; }
    @Selector() static sortFields(state: StateUserIconsModel):    Record<string, TypeOf>    { return state.sortFields; }
    @Selector() static sortType(state: StateUserIconsModel):      TypeOf                    { return state.sortFields[state.sortField]; }
    @Selector() static sort(state: StateUserIconsModel):          boolean                   { return Object.keys(StateUserIcons.sortFields(state)).length > 0; }
    @Selector() static count(state: StateUserIconsModel):         number                    { return Object.keys(StateUserIcons.data(state)).length; }
    @Selector() static getAll(state: StateUserIconsModel):        boolean                   { return StateUserIcons.sort(state) && state.sortByEntity; }

    constructor
    (
        private store:   Store,
        private service: ServiceUserIcons,
        private icons:   ServiceIcons
    )
    {
        super();
    }

    @Action(ActionUserIconsReset)
    reset({ patchState }: StateContext<StateUserIconsModel>)
    {
        const defaults: StateUserIconsModel = CoreUtil.clone<StateUserIconsModel>(StateUserIconsOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionUserIconsGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateUserIconsModel>, { fetch }: ActionUserIconsGetData)
    {
        const state: StateUserIconsModel = getState();

        const id:          string  = this.store.selectSnapshot(StateUser.id);
        const initialized: boolean = StateUserIcons.initialized(state);

        return initialized ? of() : dispatch
        ([
            new ActionUserIconsReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, UserIcon>) =>
                dispatch(new ActionUserIconsSet(data))
            ),
            switchMap(() =>
                StateUserIcons.getAll(state) ? of() : dispatch(new ActionUserIconsSort())
            ),
            switchMap(() =>
                fetch ? dispatch(new ActionUserIconsGet()) : of()
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionUserIconsGet)
    get({ getState, patchState }: StateContext<StateUserIconsModel>)
    {
        return super.page
        (
            getState(),
            this.icons
        ).
        pipe
        (
            tap((partial: Partial<StateUserIconsModel>) =>
                patchState(partial)
            )
        );
    }

    @Action(ActionUserIconsSet)
    set({ patchState }: StateContext<StateUserIconsModel>, { payload }: ActionUserIconsSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionUserIconsSort)
    sortData({ getState, patchState }: StateContext<StateUserIconsModel>)
    {
        const keys: Array<string> = this.sort(getState());

        patchState({ keys });
    }

    @Action(ActionUserIconsAdd)
    add({ patchState, getState }: StateContext<StateUserIconsModel>, { payload }: ActionUserIconsAdd)
    {
        const entity: Icon = payload;

        const partial: Partial<StateUserIconsModel> =
        this.addData
        (
            getState(),
            entity
        );

        patchState(partial);
    }

    @Action(ActionUserIconsRemove)
    remove({ patchState, getState }: StateContext<StateUserIconsModel>, { payload }: ActionUserIconsRemove)
    {
        const state: StateUserIconsModel = getState();

        const partial: Partial<StateUserIconsModel> =
        this.removeData
        (
            getState(),
            payload
        );

        patchState(partial);
    }

    @Action(ActionUserIconsSync)
    sync({ patchState, getState}: StateContext<StateUserIconsModel>, { payload }: ActionUserIconsSync)
    {
        const after: Icon = payload;

        const partial: Partial<StateUserIconsModel> = this.syncData
        (
            getState(),
            after
        );

        patchState(partial);
    }

    @Action(ActionUserIconsDelete)
    delete({ dispatch }: StateContext<StateUserIconsModel>)
    {
        return dispatch
        ([
            new ActionUserIconsReset()
        ]);
    }
}
