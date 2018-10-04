import { State } from '@ngxs/store';

export interface StateAppModel
{

}

@State<StateAppModel>
({
    name : 'app',

    defaults :
    {

    }
})

export class StateApp
{
    constructor() {}
}
