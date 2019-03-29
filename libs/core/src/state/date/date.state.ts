
import { State, Selector, Action, StateContext, NgxsOnInit } from '@ngxs/store';

import { StateDateModel } from './date.state.model';
import { StateDateOptions } from './date.state.options';
import { ActionDateRefreshNow } from './date.actions';

@State<StateDateModel>(StateDateOptions)

export class StateDate implements NgxsOnInit
{

    constructor() {}

    @Selector() static now(state: StateDateModel): Date {return state.now;}

    public ngxsOnInit(context: StateContext<StateDateModel>)
    {
        context.dispatch(new ActionDateRefreshNow());
    }

    @Action(ActionDateRefreshNow)
    refreshNow({ patchState }: StateContext<StateDateModel>)
    {
        const now:               Date = new Date();
        const nowAtPreviousHour: Date = new Date(now);
        const nowAtNextHour:     Date = new Date(now);

        nowAtPreviousHour.setMinutes(0, 0, 0);
        nowAtNextHour.setHours(nowAtNextHour.getHours() + 1, 0, 0, 0);

        patchState
        ({
            now,
            nowAtPreviousHour,
            nowAtNextHour
        });
    }
}
