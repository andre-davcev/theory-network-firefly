import {ModelSettings}  from './model.settings';
import {ModelProvider}  from './model.provider';
import {ModelService}   from './model.service';
import {ModelView}      from './model.view';

export interface Model
{
    settings    : ModelSettings,
    providers?  : {[id:string]:ModelProvider},
    services?   : {[id:string]:ModelService},
    views?      : {[id:string]:ModelView},
    dictionary? : {[id:string]:any}
}