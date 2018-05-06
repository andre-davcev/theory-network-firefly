import {State, Action, Store, StateContext} from '@ngxs/store';

import { LocationWatch } from './location.state';
import { LanguageInitialize } from './language.state';
import { UserAuthenticate } from './user.state';

export class AppInitialize   {constructor() {}}

export interface StateAppModel
{

}

@State<StateAppModel>
({
    name : 'app',

    defaults :
    {

    }
})

export class StateApp
{
    constructor() {}

    @Action(AppInitialize)
    appInitialize({ dispatch} : StateContext<StateAppModel>)
    {
        dispatch(new LanguageInitialize());
        dispatch(new LocationWatch());
    }
}
