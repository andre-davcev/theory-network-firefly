
import { Action, StateContext, State, NgxsOnInit, Actions } from '@ngxs/store';

import { StateMobileModel } from './mobile.state.model';
import { ActionMobileLoading, ActionMobileWatchNavigation } from './mobile.actions';
import { ActionIonicLoadingOptions, ActionIonicLoading } from '@theory/ionic';
import { StateMobileOptions } from './mobile.state.options';

@State<StateMobileModel>(StateMobileOptions)

export class StateMobile implements NgxsOnInit
{
    constructor(private actions$: Actions) { }

    public ngxsOnInit(context: StateContext<StateMobileModel>)
    {
        context.dispatch
        ([
            new ActionMobileWatchNavigation()
        ]);
    }

    @Action(ActionMobileWatchNavigation)
    watchNavigation({ }: StateContext<StateMobileModel>)
    {
        // https://ngxs.gitbook.io/ngxs/advanced/action-handlers
    }

    @Action(ActionMobileLoading)
    loading({ dispatch }: StateContext<StateMobileModel>, { payload }: ActionMobileLoading)
    {
        const options: ActionIonicLoadingOptions =
        {
            observable$: payload.observable$,
            options:
            {
                spinner:     'crescent',
                translucent: false,
                cssClass:    'cpt-loading'
            }
        };

        if (payload.message != null || payload.error != null)
        {
            options.toast =
            {
                message: payload.message,
                error:   payload.error,
                options:
                {
                    duration: 3000
                }
            }
        }

        return dispatch(new ActionIonicLoading(options));
    }
}
