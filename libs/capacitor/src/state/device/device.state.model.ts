import { StatusBarStyleOptions } from '@capacitor/core';

export interface StateDeviceModel
{
    loading : boolean;
    device  : boolean;
    ios     : boolean;
    android : boolean;

    statusBar: StatusBarStyleOptions;
    statusBarVisible: boolean;
}
