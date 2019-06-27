import { State, Selector, Select, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { StateUser } from '@firefly/core/state/user';
import { User, Icon } from '@firefly/core/models';
import { ServiceIcon } from '@firefly/core/services';
import { FormIcon } from '@firefly/core/forms';
import { StateIconsModel } from './icons.state.model';
import { StateIconsOptions } from './icons.state.options';
import { ActionGetIcons, ActionSetIconId, ActionSetIcon } from './icons.actions';

@State<StateIconsModel>(StateIconsOptions)

export class StateIcons
{
    @Select(StateUser.user) user$:Observable<User>;

    constructor(private serviceIcons: ServiceIcon, private formIcon: FormIcon) {}

    @Selector() static entities(state: StateIconsModel) {return state.entities;}
    @Selector() static id(state: StateIconsModel)       {return state.id;}
    @Selector() static form(state: StateIconsModel)     {return state.form;}

    @Selector() static clusters(state: StateIconsModel) {return Object.keys(state.entities).map(id => state.entities[id]);}
    @Selector() static entity(state: StateIconsModel)   {return state.entities[state.id];}

    @Action(ActionGetIcons)
    getClusters({ patchState } : StateContext<StateIconsModel>)
    {
        return this.user$.pipe
        (
            map((user:User) => user.id),

            switchMap((userId: string) =>
            {
                return this.serviceIcons.

                get(userId).

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

        setIcon(payload).

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
