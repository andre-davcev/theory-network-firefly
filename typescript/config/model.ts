import {TNModelSettings}  from './model.settings';
import {TNModelProvider}  from './model.provider';
import {TNModelService}   from './model.service';
import {TNModelView}      from './model.view';

export interface TNModel
{
    settings    : TNModelSettings,
    providers?  : {[id:string]:TNModelProvider},
    services?   : {[id:string]:TNModelService},
    views?      : {[id:string]:TNModelView},
    dictionary? : {[id:string]:any}
}