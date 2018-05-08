export enum ActionsDevice
{
    DeviceInitialize  = '[Device] Device Initialize'
}

export class DeviceInitialize
{
    static readonly type = ActionsDevice.DeviceInitialize;

    constructor() {}
}
