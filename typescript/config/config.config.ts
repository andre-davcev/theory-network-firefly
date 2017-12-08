import {ConfigProvider} from './config.provider';
import {ConfigService}  from './config.service';
import {ConfigView}     from './config.view';

export interface Config
{
    providers : {[id:string]:ConfigProvider},
    language  : string,
    services  : {[id:string]:ConfigService},
    views     : {[id:string]:ConfigView}
}