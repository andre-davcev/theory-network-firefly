import { State, Action, StateContext, Store } from '@ngxs/store';
import { Icon } from '@firefly/core/models';
import { ServiceIcons } from '@firefly/core/services';
import { StateQuery } from '@theory/ngxs';

import { StateUserIconsModel } from './user-icons.state.model';
import { StateUserIconsOptions } from './user-icons.state.options';
import {
    ActionUserIconsAdd,
    ActionUserIconsReset,
    ActionUserIconsRemove,
    ActionUserIconsGetData,
    ActionUserIconsGet,
    ActionUserIconsSync
} from './user-icons.actions';
import { StateUser } from '../../document/user';
import { Query } from '@angular/fire/firestore';

@State<StateUserIconsModel>(StateUserIconsOptions)

export class StateUserIcons extends StateQuery<Icon, StateUserIconsModel>
{
    constructor
    (
        private store:   Store,
        private service: ServiceIcons
    )
    {
        super
        (
            StateUserIconsOptions.defaults,
            {
                ActionReset   : ActionUserIconsReset,
                ActionGetData : ActionUserIconsGetData,
                ActionGet     : ActionUserIconsGet,
                ActionAdd     : ActionUserIconsAdd,
                ActionRemove  : ActionUserIconsRemove,
                ActionSync    : ActionUserIconsSync
            }
        );
    }

    @Action(ActionUserIconsReset)
    reset(context: StateContext<StateUserIconsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id);
        const query: Query   = userId == null ? undefined : this.service.collection('clusters').ref.where('userId', '==', userId);

        return super.reset(context, query);
    }

    @Action(ActionUserIconsGetData)
    getData(context: StateContext<StateUserIconsModel>)
    {
        return super.getData(context);
    }

    @Action(ActionUserIconsGet)
    get(context: StateContext<StateUserIconsModel>)
    {
        return super.get(context);
    }

    @Action(ActionUserIconsAdd)
    add(context: StateContext<StateUserIconsModel>, action: ActionUserIconsAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserIconsRemove)
    remove(context: StateContext<StateUserIconsModel>, action: ActionUserIconsRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserIconsSync)
    sync(context: StateContext<StateUserIconsModel>, action: ActionUserIconsSync)
    {
        return super.sync(context, action);
    }
}
