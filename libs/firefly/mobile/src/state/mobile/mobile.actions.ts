

import { ActionsMobile } from './mobile.actions.enum';
import { Observable } from 'rxjs';

export class ActionMobileLoadingShow
{
    static readonly type = ActionsMobile.LoadingShow;

    constructor() { }
}

export class ActionMobileLoadingHide
{
    static readonly type = ActionsMobile.LoadingHide;
}

export class ActionMobileToast
{
    static readonly type = ActionsMobile.Toast;

    constructor(public payload: string) { }
}
