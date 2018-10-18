export enum ActionsDevice
{
    DeviceInitialize  = '[Device] Device Initialize'
}

export class ActionDeviceInitialize
{
    static readonly type = ActionsDevice.DeviceInitialize;

    constructor() {}
}
