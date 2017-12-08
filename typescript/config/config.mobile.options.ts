import {Geolocation} from '@ionic-native/geolocation';
import {StatusBar}   from '@ionic-native/status-bar';

import {ConfigOptions} from './config.options';

export interface MobileConfigOptions extends ConfigOptions
{
    statusBar       : StatusBar,
    geolocation     : Geolocation,
    statusBarStyle? : number,
    statusBarHide?  : boolean,
    statusBarHex?   : string,
    getLocation?    : boolean,
    locationFound?  : boolean
}