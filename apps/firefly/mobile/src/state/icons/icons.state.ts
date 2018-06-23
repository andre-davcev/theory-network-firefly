import { FormGroup } from '@angular/forms';
import { Icon } from '../../models/icon.model';
import { State, Selector, Select, Action, StateContext } from '@ngxs/store';
import { FormIcon } from '../../app/forms/icon.form';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { StateUser } from '../user/user.state';
import { GetIcons, SetIconId, SetIcon } from './icons.actions';
import { map, switchMap } from 'rxjs/operators';
import { ServiceIcons } from '../../services/icons.service';

export interface StateIconsModel
{
    id       : string;
    form     : FormGroup;
    entities : {[id: string]: Icon};
}

@State<StateIconsModel>
({
    name : 'icons',

    defaults :
    {
        id       : undefined,
        form     : undefined,
        entities : {}
    }
})


export class StateIcons
{
    constructor(private serviceIcons: ServiceIcons, private formIcon: FormIcon) {}

    @Selector() static entities(state: StateIconsModel) {return state.entities;}
    @Selector() static id(state: StateIconsModel)       {return state.id;}
    @Selector() static form(state: StateIconsModel)     {return state.form;}

    @Selector() static clusters(state: StateIconsModel) {return Object.keys(state.entities).map(id => state.entities[id]);}
    @Selector() static entity(state: StateIconsModel)   {return state.entities[state.id];}

    @Select(StateUser.user) user$:Observable<User>;

    @Action(GetIcons)
    getClusters({ patchState, dispatch } : StateContext<StateIconsModel>)
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
                        const entities:{ [id: number]: Icon } = {};

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

    @Action(SetIconId)
    setClusterId({patchState, getState} : StateContext<StateIconsModel>, { payload }: SetIconId)
    {
        const id    : string          = payload;
        const state : StateIconsModel = getState();

        patchState
        ({
            id,
            form: id === 'new' ? this.formIcon.build() : this.formIcon.build(state.entities[id])
        });
    }

    @Action(SetIcon)
    setCluster({patchState, dispatch} : StateContext<StateIconsModel>, { payload }: SetIcon)
    {
        return this.serviceIcons.

        set(payload).

        pipe
        (
            map((icon: Icon) =>
            {
                const entities:{ [id: number]: Icon } = {};

                entities[icon.id] = icon;

                patchState({entities});
            })
        )
    }
}
