import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/firestore';

import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { of, Observable, forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { StateQuery } from '@theory/ngxs';
import { ImageSize, ServiceStorage } from '@theory/firebase';

import { Interest, StreamInterest, SubscriptionPartial } from '@firefly/cloud';
import { ServiceInterests } from '@firefly/core/services';
import { InterestType, Collection } from '@firefly/core/enums';

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
import { StateUserStream } from '../../child/user-stream/user-stream.state';
import { ImageType } from '../../../enums';

@State<StateUserInterestsModel>(StateUserInterestsOptions)
@Injectable()
export class StateUserInterests extends StateQuery<Interest, StateUserInterestsModel>
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

    @Selector([StateUserStream.data(), StateUser.subscriptionsStatus, StateUser.interestType])
    public static stream
    (
        state         : StateUserInterestsModel,
        stream        : Array<StreamInterest>,
        subscriptions : Record<string, SubscriptionPartial>,
        interestType  : InterestType
    ) : Array<StreamInterest>
    {
        return interestType === InterestType.Created ?
            StateUserInterests.
                dataState(state).
                map((interest: Interest) => {
                    return {
                        ...interest,
                        score : 0,
                        on    : subscriptions[interest.id] == null ? false : true
                    };
                }) :
            stream.
                filter((interest: StreamInterest) =>
                    (interestType === InterestType.Subscribed && subscriptions[interest.id] != null) ||
                    (interestType === InterestType.Unsubscribed && (subscriptions[interest.id] == null || interest.on != null))
                );
    }

    @Selector([StateUserStream.data(), StateUser.subscriptionsStatus, StateUser.interestType])
    public static streamFound
    (
        state         : StateUserInterestsModel,
        stream        : Array<StreamInterest>,
        subscriptions : Record<string, SubscriptionPartial>,
        interestType  : InterestType
    ): boolean
    {
        return StateUserInterests.stream(state, stream, subscriptions, interestType).length > 0;
    }

    @Selector([StateUserStream.data(), StateUser.subscriptionsStatus, StateUser.interestType])
    public static streamAdd
    (
        state         : StateUserInterestsModel,
        stream        : Array<StreamInterest>,
        subscriptions : Record<string, SubscriptionPartial>,
        interestType  : InterestType
    ): boolean
    {
        return StateUserInterests.streamFound(state, stream, subscriptions, interestType) && interestType === InterestType.Created;
    }

    @Selector([StateUserStream.data(), StateUser.subscriptionsStatus, StateUser.interestType])
    public static streamEmpty
    (
        state         : StateUserInterestsModel,
        stream        : Array<StreamInterest>,
        subscriptions : Record<string, SubscriptionPartial>,
        interestType  : InterestType
    ): boolean
    {
        return !StateUserInterests.streamFound(state, stream, subscriptions, interestType);
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
        return super.get(context).
        pipe
        (
            switchMap(() =>
                super.getMedia(context, 'interests', ImageType.Image)
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
}
