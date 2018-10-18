import { State } from '@ngxs/store';
import { StoreOptions } from '@ngxs/store/src/symbols';

export interface StateAppModel
{

}

export const StateAppOptions: StoreOptions<StateAppModel> =
{
    name : 'app',

    defaults :
    {

    }
};

@State<StateAppModel>(StateAppOptions)

export class StateApp
{
    constructor() {}
}
