import {State, Action, StateContext} from '@ngxs/store';

import { LocationWatch } from '../location/location.actions';
import { LanguageInitialize } from '../language/language.actions';
import { AppInitialize } from './app.actions';
import { DeviceInitialize } from '../device/device.actions';

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
        dispatch(new DeviceInitialize());
        dispatch(new LanguageInitialize());
        dispatch(new LocationWatch());
    }
}
