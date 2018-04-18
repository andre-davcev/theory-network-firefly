import {State} from '@ngxs/store';

import { StateLocation } from './location.state';
import { StateLanguage } from './language.state';
import { StateUser } from './user.state';

export interface StateAppModel
{

}

@State<StateAppModel>
({
    name : 'app',
    defaults : {}
})

export class StateApp 
{

}