

import { ActionsMobile } from './mobile.actions.enum';
import { ActionMobileLoadingOptions } from './mobile.actions.options';

export class ActionMobileLoading
{
    static readonly type = ActionsMobile.Loading;

    constructor(public payload: ActionMobileLoadingOptions) { }
}

export class ActionMobileWatchNavigation
{
    static readonly type = ActionsMobile.WatchNavigsation;
}
