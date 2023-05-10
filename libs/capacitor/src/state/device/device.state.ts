import { State, Action, StateContext, Selector } from '@ngxs/store';
import { from, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StatusBar, StyleOptions } from '@capacitor/status-bar';
import { Device, DeviceInfo } from '@capacitor/device';
import { Injectable } from '@angular/core';

import { Platform } from '../../enums';
import { StateDeviceModel } from './device.state.model';
import { StateDeviceOptions } from './device.state.options';
import { ActionDeviceInitialize, ActionDeviceStatusBarSet, ActionDeviceStatusBarShow, ActionDeviceStatusBarHide } from './device.actions';

@State<StateDeviceModel>(StateDeviceOptions)
@Injectable()
export class StateDevice
{
    @Selector() static platform(state: StateDeviceModel): Platform {return state.platform;}
    @Selector() static loading(state: StateDeviceModel): boolean {return state.loading;}

    @Selector() static device(state: StateDeviceModel): boolean {return state.device;}
    @Selector() static web(state: StateDeviceModel): boolean    {return !state.device;}

    @Selector() static android(state: StateDeviceModel): boolean {return state.android;}
    @Selector() static ios(state: StateDeviceModel): boolean     {return state.ios;}

    @Selector() static statusBar(state: StateDeviceModel): StyleOptions {return state.statusBar;}
    @Selector() static statusBarVisible(state: StateDeviceModel): boolean {return state.statusBarVisible;}

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
                const platform: Platform = deviceInfo.platform as Platform;

                patchState
                ({
                    platform,
                    device  : platform !== Platform.Web,
                    ios     : platform !== Platform.iOS,
                    android : platform !== Platform.Android
                });
            })
        );
    }

    @Action(ActionDeviceStatusBarSet)
    statusBarSet({ getState, patchState } : StateContext<StateDeviceModel>, { payload }: ActionDeviceStatusBarSet)
    {
        const options: StyleOptions = payload;
        const state: StateDeviceModel = getState();
        const optionsPrevious: StyleOptions = StateDevice.statusBar(state);
        const isDevice: boolean = StateDevice.device(state);
        const setStatusBarOptions: boolean = isDevice && (optionsPrevious == null || options.style !== optionsPrevious.style);

        patchState({ statusBar: options });

        return setStatusBarOptions ? from(StatusBar.setStyle(options)) : of(null);
    }

    @Action(ActionDeviceStatusBarShow)
    statusBarShow({ getState, patchState } : StateContext<StateDeviceModel>)
    {
        const state: StateDeviceModel = getState();
        const showStatusBar: boolean = StateDevice.device(state) && !StateDevice.statusBarVisible(state);

        patchState({ statusBarVisible: true });

        return showStatusBar ? from(StatusBar.show()) : of(null);
    }

    @Action(ActionDeviceStatusBarHide)
    statusBarHide({ getState, patchState } : StateContext<StateDeviceModel>)
    {
        const state: StateDeviceModel = getState();
        const hideStatusBar: boolean = StateDevice.device(state) && StateDevice.statusBarVisible(state);

        patchState({ statusBarVisible: false });

        return hideStatusBar ? from(StatusBar.hide()) : of(null);
    }
}
