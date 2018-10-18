import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Platform } from '@ionic/angular';

import { ActionDeviceInitialize, StateDeviceModel, StateDeviceOptions } from '@firefly/mobile';

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
        patchState
        ({
            device  : this.platform.is('cordova'),
            ios     : this.platform.is('ios'),
            android : this.platform.is('android'),
        });
    }
}
