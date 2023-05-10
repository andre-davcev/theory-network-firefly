import { StyleOptions } from '@capacitor/status-bar';

import { Platform } from '../../enums';

export interface StateDeviceModel
{
    platform : Platform;
    loading  : boolean;
    device   : boolean;
    ios      : boolean;
    android  : boolean;

    statusBar: StyleOptions;
    statusBarVisible: boolean;
}
