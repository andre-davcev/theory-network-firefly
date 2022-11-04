import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/compat/firestore';
import { State, Action, StateContext, Store } from '@ngxs/store';

import { Interest, Collection } from '@firefly/cloud';
import { StateQuery } from '@theory/ngxs';
import { ServiceStorage } from '@theory/firebase';

import { ServiceInterests } from '../../../services';
import { StateClusterInterestsModel } from './cluster-events.state.model';
import { StateClusterInterestsOptions } from './cluster-events.state.options';
import {
    ActionClusterEventsAdd,
    ActionClusterEventsRemove,
    ActionClusterEventsGetData,
    ActionClusterEventsGet,
    ActionClusterEventsSync,
    ActionClusterEventsReset,
    ActionClusterEventsFilter
} from './cluster-events.actions';
import { StateUser } from '../../document/user/user.state';

@State<StateClusterInterestsModel>(StateClusterInterestsOptions)
@Injectable()
export class StateClusterInterests extends StateQuery<Interest, StateClusterInterestsModel>
{
    constructor
    (
        private store:   Store,
        private service: ServiceInterests,
                storage: ServiceStorage
    )
    {
        super
        (
            StateClusterInterestsOptions.defaults,
            {
                ActionReset   : ActionClusterEventsReset,
                ActionGetData : ActionClusterEventsGetData,
                ActionGet     : ActionClusterEventsGet,
                ActionAdd     : ActionClusterEventsAdd,
                ActionRemove  : ActionClusterEventsRemove,
                ActionSync    : ActionClusterEventsSync,
                ActionFilter  : ActionClusterEventsFilter
            },
            storage
        );
    }

    @Action(ActionClusterEventsReset)
    reset(context: StateContext<StateClusterInterestsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id());
        const query: Query   = userId == null ? undefined : this.service.collection(Collection.Interests).ref.where('userId', '==', userId);

        return super.reset(context, { query });
    }

    @Action(ActionClusterEventsGetData)
    getData(context: StateContext<StateClusterInterestsModel>)
    {
        return super.getData(context);
    }

    @Action(ActionClusterEventsGet)
    get(context: StateContext<StateClusterInterestsModel>)
    {
        return super.get(context);
    }

    @Action(ActionClusterEventsAdd)
    add(context: StateContext<StateClusterInterestsModel>, action: ActionClusterEventsAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionClusterEventsRemove)
    remove(context: StateContext<StateClusterInterestsModel>, action: ActionClusterEventsRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionClusterEventsSync)
    sync(context: StateContext<StateClusterInterestsModel>, action: ActionClusterEventsSync)
    {
        return super.sync(context, action);
    }

    @Action(ActionClusterEventsFilter)
    filter(context: StateContext<StateClusterInterestsModel>, action: ActionClusterEventsFilter)
    {
        return super.filter(context, action);
    }
}
