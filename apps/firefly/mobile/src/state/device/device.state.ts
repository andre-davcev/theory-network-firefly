import {State, Action, Store, StateContext, Selector} from '@ngxs/store';
import { DeviceInitialize } from './device.actions';
import { DeviceInfo, Plugins } from '@capacitor/core';
import { tap, take } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { DeviceEnum } from '../../enums/device.enum';

export interface StateDeviceModel
{
    loading : boolean;
    info    : DeviceInfo;
}

@State<StateDeviceModel>
({
    name : 'device',

    defaults :
    {
        loading : false,
        info    : undefined
    }
})

export class StateDevice
{
    @Selector() static info(state: StateDeviceModel)    {return state.info;}
    @Selector() static loading(state: StateDeviceModel) {return state.loading;}

    @Selector() static device(state: StateDeviceModel) {return state.info != null && state.info.platform !== DeviceEnum.Web;}
    @Selector() static web(state: StateDeviceModel)    {return state.info != null && state.info.platform === DeviceEnum.Web;}

    @Selector() static android(state: StateDeviceModel) {return state.info != null && state.info.platform === DeviceEnum.Android;}
    @Selector() static ios(state: StateDeviceModel)     {return state.info != null && state.info.platform === DeviceEnum.iOS;}

    constructor() {}

    @Action(DeviceInitialize)
    deviceInitialize({ patchState } : StateContext<StateDeviceModel>)
    {
        return fromPromise(Plugins.Device.getInfo()).pipe
        (
            tap((info: DeviceInfo) => patchState({ info }))
        );
    }
}
