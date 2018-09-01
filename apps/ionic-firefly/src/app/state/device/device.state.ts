import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Platform } from '@ionic/angular';
import { DeviceInitialize } from './device.actions';

export interface StateDeviceModel
{
    loading : boolean;
    device  : boolean;
    ios     : boolean;
    android : boolean;
}

@State<StateDeviceModel>
({
    name : 'device',

    defaults :
    {
        loading : false,
        device  : false,
        ios     : false,
        android : false
    }
})

export class StateDevice
{
    @Selector() static loading(state: StateDeviceModel) {return state.loading;}

    @Selector() static device(state: StateDeviceModel) {return this.device;}
    @Selector() static web(state: StateDeviceModel)    {return !this.device;}

    @Selector() static android(state: StateDeviceModel) {return this.android;}
    @Selector() static ios(state: StateDeviceModel)     {return this.ios;}

    constructor(public platform: Platform) {}

    @Action(DeviceInitialize)
    deviceInitialize({ patchState } : StateContext<StateDeviceModel>)
    {
        patchState
        ({
            device  : this.platform.is('cordova'),
            ios     : this.platform.is('ios'),
            android : this.platform.is('android'),
        });
    }
}
