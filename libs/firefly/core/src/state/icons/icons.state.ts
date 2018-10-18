import { State, Selector, Select, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  User,
  Icon,
  ServiceIcon,
  ActionGetIcons,
  ActionSetIconId,
  ActionSetIcon,
  StateUser,
  StateIconsModel,
  StateIconsOptions,
  FormIcon
} from '@firefly/core';

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
