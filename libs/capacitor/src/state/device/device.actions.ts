
import { StatusBarStyleOptions } from '@capacitor/core';

import { ActionsDevice } from './device.actions.enum';

export class ActionDeviceInitialize
{
    static readonly type = ActionsDevice.DeviceInitialize;
}

export class ActionDeviceStatusBarSet
{
    static readonly type = ActionsDevice.StatusBarSet;

    constructor(public payload: StatusBarStyleOptions) {}
}

export class ActionDeviceStatusBarShow
{
    static readonly type = ActionsDevice.StatusBarShow;
}

export class ActionDeviceStatusBarHide
{
    static readonly type = ActionsDevice.StatusBarHide;
}
