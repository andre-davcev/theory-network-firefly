import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/firestore';

import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { switchMap } from 'rxjs/operators';

import { StateQuery } from '@theory/ngxs';

import { Interest, StreamInterest, SubscriptionPartial } from '@firefly/cloud';
import { ServiceInterests } from '@firefly/core/services';
import { Collection, InterestType } from '@firefly/core/enums';

import { StateUserInterestsModel } from './user-interests.state.model';
import { StateUserInterestsOptions } from './user-interests.state.options';
import {
    ActionUserInterestsAdd,
    ActionUserInterestsRemove,
    ActionUserInterestsGetData,
    ActionUserInterestsGet,
    ActionUserInterestsSync,
    ActionUserInterestsReset,
    ActionUserInterestsFilter
} from './user-interests.actions';
import { ImageType } from '../../../enums';
import { ServiceStorage } from '@theory/firebase';
import { of } from 'rxjs';
import { ActionAppLoadingHide, ActionAppLoadingShow } from '../../document/app/app.actions';
import { InterestsFilter } from '../../composite/interests/interests.filter.model';
import { StateUser } from '../../document/user/user.state';

@State<StateUserInterestsModel>(StateUserInterestsOptions)
@Injectable()
export class StateUserInterests extends StateQuery<Interest, StateUserInterestsModel>
{
    @Selector() static filter(state: StateUserInterestsModel)        : InterestsFilter                     { return state.filter; }
    @Selector() static type(state: StateUserInterestsModel)          : InterestType                        { return StateUserInterests.filter(state).type; }
    @Selector() static virtual(state: StateUserInterestsModel)       : boolean                             { return StateUserInterests.filter(state).virtual; }
    @Selector() static subscriptions(state: StateUserInterestsModel) : Record<string, SubscriptionPartial> { return StateUserInterests.filter(state).subscriptions; }

    @Selector() static dataCreated(state: StateUserInterestsModel): Array<StreamInterest>
    {
        const subscriptions: Record<string, SubscriptionPartial> = StateUserInterests.subscriptions(state);

        return StateUserInterests.dataState(state).
            map((item: StreamInterest) =>
                ({
                    ...item,
                    score: 0,
                    on: subscriptions[item.id]?.on
                })
            );
    }

    constructor
    (
        private store:   Store,
        private service: ServiceInterests,
                storage: ServiceStorage
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
            },
            storage
        );
    }

    @Action(ActionUserInterestsReset)
    reset(context: StateContext<StateUserInterestsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id());
        const query: Query   = userId == null ? undefined : this.service.collection(Collection.Interests).ref.where('userId', '==', userId);

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
        return super.get(context).
        pipe
        (
            switchMap(() =>
                super.getMedia(context, Collection.Interests, ImageType.Image)
            )
        );
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

    @Action(ActionUserInterestsFilter)
    filter({ dispatch, getState, patchState }: StateContext<StateUserInterestsModel>, { filter }: ActionUserInterestsFilter)
    {
        // patchState({ filter });

        const initialized: boolean = StateUserInterests.initializedState(getState());

        return initialized ?
            of(null) :
            dispatch(new ActionAppLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserInterestsGetData())),
                switchMap(() => this.store.dispatch(new ActionAppLoadingHide()))
            );
    }
}
