import {Geolocation} from '@ionic-native/geolocation';
import {StatusBar}   from '@ionic-native/status-bar';

import {TNConfigOptions} from './config.options';

export interface TNMobileConfigOptions extends TNConfigOptions
{
    statusBar       : StatusBar,
    geolocation     : Geolocation,
    statusBarStyle? : number,
    statusBarHide?  : boolean,
    statusBarHex?   : string,
    getLocation?    : boolean,
    locationFound?  : boolean
}