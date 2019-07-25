import { ActionsAlert } from './alert.actions.enum';

export class ActionAlertGet
{
    static readonly type = ActionsAlert.Get;

    constructor(public payload: string) { }
}
