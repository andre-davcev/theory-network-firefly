

import { ActionsIonic } from './ionic.actions.enum';
import { ActionIonicLoadingOptions, ActionIonicToastOptions } from './ionic.actions.options';

export class ActionIonicLoading
{
    static readonly type = ActionsIonic.Loading;

    constructor(public payload: ActionIonicLoadingOptions) { }
}

export class ActionIonicToast
{
    static readonly type = ActionsIonic.Toast;

    constructor(public payload: ActionIonicToastOptions) { }
}
