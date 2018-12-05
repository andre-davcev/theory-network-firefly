
import { StatusBarStyleOptions } from '@capacitor/core';

import { ActionsDevice } from './device.actions.enum';

export class ActionDeviceInitialize
{
    static readonly type = ActionsDevice.DeviceInitialize;

    constructor() {}
}

export class ActionDeviceStatusBarSet
{
    static readonly type = ActionsDevice.StatusBarSet;

    constructor(public payload: StatusBarStyleOptions) {}
}

export class ActionDeviceStatusBarShow
{
    static readonly type = ActionsDevice.StatusBarShow;

    constructor() {}
}

export class ActionDeviceStatusBarHide
{
    static readonly type = ActionsDevice.StatusBarHide;

    constructor() {}
}
