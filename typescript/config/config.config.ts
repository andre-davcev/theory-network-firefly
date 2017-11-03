import {TNConfigProvider} from './config.provider';
import {TNConfigService}  from './config.service';
import {TNConfigView}     from './config.view';

export interface TNConfig
{
    providers : {[id:string]:TNConfigProvider},
    language  : string,
    services  : {[id:string]:TNConfigService},
    views     : {[id:string]:TNConfigView}
}