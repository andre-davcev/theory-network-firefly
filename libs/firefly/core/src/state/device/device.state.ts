import { State, Action, StateContext, Selector } from '@ngxs/store';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DeviceInfo } from '@capacitor/core';

import { Platform, Device } from '@theory/capacitor';

import { StateDeviceModel } from './device.state.model';
import { StateDeviceOptions } from './device.state.options';
import { ActionDeviceInitialize } from './device.actions';

@State<StateDeviceModel>(StateDeviceOptions)

export class StateDevice
{
    @Selector() static loading(state: StateDeviceModel) {return state.loading;}

    @Selector() static device(state: StateDeviceModel) {return state.device;}
    @Selector() static web(state: StateDeviceModel)    {return !state.device;}

    @Selector() static android(state: StateDeviceModel) {return state.android;}
    @Selector() static ios(state: StateDeviceModel)     {return state.ios;}

    constructor(public platform: Platform) {}

    ngxsOnInit(context: StateContext<StateDeviceModel>)
    {
        context.dispatch(new ActionDeviceInitialize());
    }

    @Action(ActionDeviceInitialize)
    deviceInitialize({ patchState } : StateContext<StateDeviceModel>)
    {
        return from(Device.getInfo()).pipe
        (
            tap((deviceInfo: DeviceInfo) =>
            {
                const platform: string = deviceInfo.platform;
                patchState
                ({
                    device  : platform !== Platform.Web,
                    ios     : platform !== Platform.iOS,
                    android : platform !== Platform.Android
                });
            })
        );
    }
}
