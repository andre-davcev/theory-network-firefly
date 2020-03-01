import { State, Action, StateContext, Store } from '@ngxs/store';

import { Interest } from '@firefly/cloud';
import { ServiceInterests } from '@firefly/core/services';
import { StateQuery } from '@theory/ngxs';

import { StateUserInterestsModel } from './user-interests.state.model';
import { StateUserInterestsOptions } from './user-interests.state.options';
import {
    ActionUserInterestsAdd,
    ActionUserInterestsRemove,
    ActionUserInterestsGetData,
    ActionUserInterestsGet,
    ActionUserInterestsSync,
    ActionUserInterestsReset
} from './user-interests.actions';
import { StateUser } from '../../document/user/user.state';
import { Query } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@State<StateUserInterestsModel>(StateUserInterestsOptions)
@Injectable()
export class StateUserInterests extends StateQuery<Interest, StateUserInterestsModel>
{
    constructor
    (
        private store:   Store,
        private service: ServiceInterests
    )
    {
        super
        (
            StateUserInterestsOptions.defaults,
            {
                ActionReset   : ActionUserInterestsReset,
                ActionGetData : ActionUserInterestsGetData,
                ActionGet     : ActionUserInterestsGet,
                ActionAdd     : ActionUserInterestsAdd,
                ActionRemove  : ActionUserInterestsRemove,
                ActionSync    : ActionUserInterestsSync
            }
        );
    }

    @Action(ActionUserInterestsReset)
    reset(context: StateContext<StateUserInterestsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id());
        const query: Query   = userId == null ? undefined : this.service.collection('clusters').ref.where('userId', '==', userId);

        return super.reset(context, { query });
    }

    @Action(ActionUserInterestsGetData)
    getData(context: StateContext<StateUserInterestsModel>)
    {
        return super.getData(context);
    }

    @Action(ActionUserInterestsGet)
    get(context: StateContext<StateUserInterestsModel>)
    {
        return super.get(context);
    }

    @Action(ActionUserInterestsAdd)
    add(context: StateContext<StateUserInterestsModel>, action: ActionUserInterestsAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserInterestsRemove)
    remove(context: StateContext<StateUserInterestsModel>, action: ActionUserInterestsRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserInterestsSync)
    sync(context: StateContext<StateUserInterestsModel>, action: ActionUserInterestsSync)
    {
        return super.sync(context, action);
    }
}
