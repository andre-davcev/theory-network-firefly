import { StatusBarStyleOptions } from '@capacitor/core';
import { Platform } from '../../enums';

export interface StateDeviceModel
{
    platform : Platform;
    loading  : boolean;
    device   : boolean;
    ios      : boolean;
    android  : boolean;

    statusBar: StatusBarStyleOptions;
    statusBarVisible: boolean;
}
