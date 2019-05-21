
import { State, Action, StateContext } from '@ngxs/store';

import { StateMobileModel } from './mobile.state.model';
import { StateMobileOptions } from './mobile.state.options';
import { ActionMobileLoading } from './mobile.actions';
import { ActionIonicLoadingOptions, ActionIonicLoading } from '@theory/ionic';

@State<StateMobileModel>(StateMobileOptions)

export class StateMobile
{
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
