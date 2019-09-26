import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { StateUser } from '@firefly/core/state';
import { Icon, UserIcon } from '@firefly/core/models';
import { ServiceUserIcons, ServiceIcons } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

import { StateUserIconsModel } from './user-icons.state.model';
import { StateUserIconsOptions } from './user-icons.state.options';
import {
    ActionUserIconsAdd,
    ActionUserIconsReset,
    ActionUserIconsRemove,
    ActionUserIconsGetData,
    ActionUserIconsSort,
    ActionUserIconsGet,
    ActionUserIconsSet
} from './user-icons.actions';

@State<StateUserIconsModel>(StateUserIconsOptions)

export class StateUserIcons extends StateReferenceTable<UserIcon, Icon, StateUserIconsModel>
{
    @Selector() static data(state: StateUserIconsModel):      Record<string, UserIcon> { return state.data; }
    @Selector() static keys(state: StateUserIconsModel):      Array<string>            { return state.keys; }
    @Selector() static lookup(state: StateUserIconsModel):    Record<string, Icon>     { return state.lookup; }
    @Selector() static list(state: StateUserIconsModel):      Array<Icon>              { return state.list; }
    @Selector() static offset(state: StateUserIconsModel):    number                   { return state.offset; }
    @Selector() static pageSize(state: StateUserIconsModel):  number                   { return state.pageSize; }
    @Selector() static sortField(state: StateUserIconsModel): SortField                { return state.sortField; }

    constructor
    (
        private store: Store,
        private service: ServiceUserIcons,
        private icons: ServiceIcons
    )
    {
        super();
    }

    @Action(ActionUserIconsReset)
    reset({ patchState }: StateContext<StateUserIconsModel>)
    {
        const defaults: StateUserIconsModel = CoreUtil.clone<StateUserIconsModel>(StateUserIconsOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionUserIconsGetData)
    getData({ dispatch }: StateContext<StateUserIconsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id);

        return dispatch(new ActionUserIconsReset()).
        pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            switchMap((data: Record<string, UserIcon>) =>
                dispatch([
                    new ActionUserIconsSet(data),
                    new ActionUserIconsSort()
                ])
            )
        );
    }

    @Action(ActionUserIconsGet)
    get({ getState, patchState }: StateContext<StateUserIconsModel>)
    {
        const state: StateUserIconsModel = getState();

        return super.page
        (
            this.icons,
            StateUserIcons.keys(state),
            StateUserIcons.lookup(state),
            StateUserIcons.list(state),
            StateUserIcons.pageSize(state),
            StateUserIcons.offset(state)
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
    sortData({ getState, patchState }: StateContext<StateUserIconsModel>, { payload }: ActionUserIconsSort)
    {
        const state:     StateUserIconsModel      = getState();
        const data:      Record<string, UserIcon> = StateUserIcons.data(state);
        const sortField: SortField                 = payload == null ? StateUserIcons.sortField(state) : payload;
        const keys:      Array<string>             = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionUserIconsAdd)
    add({ patchState, getState }: StateContext<StateUserIconsModel>, { payload }: ActionUserIconsAdd)
    {
        const state: StateUserIconsModel = getState();
        const icon: Icon              = payload;

        const userIcon: UserIcon =
        {
            sort: { name: icon.name }
        };

        const partial: Partial<StateUserIconsModel> =
        this.addData
        (
            icon.id,
            icon,
            userIcon,
            StateUserIcons.data(state),
            StateUserIcons.keys(state),
            StateUserIcons.lookup(state),
            StateUserIcons.list(state),
            StateUserIcons.offset(state),
            StateUserIcons.sortField(state)
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
            payload,
            StateUserIcons.data(state),
            StateUserIcons.keys(state),
            StateUserIcons.lookup(state),
            StateUserIcons.list(state),
            StateUserIcons.offset(state)
        );

        patchState(partial);
    }
}
