import { FormGroup } from '@angular/forms';
import { State, Selector, Select, Action, StateContext } from '@ngxs/store';
import { StoreOptions } from '@ngxs/store/src/symbols';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { User, Icon } from '@firefly/core';

import { ServiceIcon } from '../../services/icon.service';
import { ActionGetIcons, ActionSetIconId, ActionSetIcon } from './icons.actions';
import { FormIcon } from '../../forms/icon.form';
import { StateUser } from '../user/user.state';

export interface StateIconsModel
{
    id       : string;
    form     : FormGroup;
    entities : Record<string, Icon>;
}

export const StateIconsOptions: StoreOptions<StateIconsModel> =
{
    name : 'icons',

    defaults :
    {
        id       : undefined,
        form     : undefined,
        entities : {}
    }
};

@State<StateIconsModel>(StateIconsOptions)

export class StateIcons
{
    constructor(private serviceIcons: ServiceIcon, private formIcon: FormIcon) {}

    @Selector() static entities(state: StateIconsModel) {return state.entities;}
    @Selector() static id(state: StateIconsModel)       {return state.id;}
    @Selector() static form(state: StateIconsModel)     {return state.form;}

    @Selector() static clusters(state: StateIconsModel) {return Object.keys(state.entities).map(id => state.entities[id]);}
    @Selector() static entity(state: StateIconsModel)   {return state.entities[state.id];}

    @Select(StateUser.user) user$:Observable<User>;

    @Action(ActionGetIcons)
    getClusters({ patchState } : StateContext<StateIconsModel>)
    {
        return this.user$.pipe
        (
            map((user:User) => user.uidInternal),

            switchMap((uidInternal: string) =>
            {
                return this.serviceIcons.

                get(uidInternal).

                pipe
                (
                    map((icons: Array<Icon>) =>
                    {
                        const entities: Record<number, Icon> = {};

                        for(const icon of icons)
                        {
                            entities[icon.id] = icon;
                        }

                        patchState({entities});
                    })
                )
            })
        )
    }

    @Action(ActionSetIconId)
    setClusterId({patchState, getState} : StateContext<StateIconsModel>, { payload }: ActionSetIconId)
    {
        const id    : string          = payload;
        const state : StateIconsModel = getState();

        patchState
        ({
            id,
            form: id === 'new' ? this.formIcon.build() : this.formIcon.build(state.entities[id])
        });
    }

    @Action(ActionSetIcon)
    setCluster({patchState, dispatch} : StateContext<StateIconsModel>, { payload }: ActionSetIcon)
    {
        return this.serviceIcons.

        set(payload).

        pipe
        (
            map((icon: Icon) =>
            {
                const entities: Record<number, Icon> = {};

                entities[icon.id] = icon;

                patchState({entities});
            })
        )
    }
}
