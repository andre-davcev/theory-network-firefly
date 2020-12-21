import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/firestore';

import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { switchMap } from 'rxjs/operators';

import { StateQuery } from '@theory/ngxs';

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
import { StateCityStream } from '../../child/city-stream/city-stream.state';
import { ImageType } from '../../../enums';
import { ServiceStorage } from '@theory/firebase';

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

    @Selector
    ([
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static streamSubscribedKeys
    (
        state         : StateUserInterestsModel,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<string>
    {
        return keys.
            filter((id: string) =>
                subscriptions[id] != null
            );
    };

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static streamSubscribed
    (
        state         : StateUserInterestsModel,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<StreamInterest>
    {
        const keysFiltered : Array<string> = StateUserInterests.streamSubscribedKeys(state, keys, subscriptions);

        if (keysFiltered.length === 0) { return []; }

        const offset : number = keysFiltered.findIndex((id: string) => lookup[id] == null);
        const end    : number = offset === -1 ? keys.length : offset;

        return keysFiltered.
            splice(0, end).
            map((id: string) =>
                lookup[id]
            );
    };

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static streamUnsubscribedKeys
    (
        state         : StateUserInterestsModel,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<string>
    {
        return keys.
            filter((id: string) =>
                subscriptions[id] == null || lookup[id]?.on != null
            );
    };

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static streamUnsubscribed
    (
        state         : StateUserInterestsModel,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<StreamInterest>
    {
        const keysFiltered : Array<string> = StateUserInterests.streamUnsubscribedKeys(state, lookup, keys, subscriptions);

        if (keysFiltered.length === 0) { return []; }

        const offset : number = keysFiltered.findIndex((id: string) => lookup[id] == null);
        const end    : number = offset === -1 ? keys.length : offset;

        return keysFiltered.
            slice(0, end).
            map((id: string) =>
                lookup[id]
            );
    };

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus,
        StateUser.interestType,
        StateUser.interestVirtual
    ])
    public static stream
    (
        state         : StateUserInterestsModel,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>,
        interestType  : InterestType,
        virtual       : boolean
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
        interestType === InterestType.Subscribed ?
            StateUserInterests.streamSubscribed(state, lookup, keys, subscriptions) :
            StateUserInterests.streamUnsubscribed(state, lookup, keys, subscriptions);
    }

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus,
        StateUser.interestType,
        StateUser.interestVirtual
    ])
    public static streamFound
    (
        state         : StateUserInterestsModel,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>,
        interestType  : InterestType,
        virtual       : boolean
    ): boolean
    {
        return StateUserInterests.stream(state, lookup, keys, subscriptions, interestType, virtual).length > 0;
    }

    @Selector([StateUser.interestType, StateUser.isPublisher])
    public static streamAdd
    (
        state         : StateUserInterestsModel,
        interestType  : InterestType,
        isPublisher   : boolean
    ): boolean
    {
        return isPublisher && interestType === InterestType.Created;
    }

    @Selector
    ([
        StateCityStream.finishedPaging()
    ])
    public static pageFinished
    (
        state          : StateUserInterestsModel,
        finishedPaging : boolean
    ) : boolean
    {
        return StateUserInterests.finishedPagingState(state) &&
            finishedPaging;
    }

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus,
        StateUser.interestType,
        StateUser.interestVirtual
    ])
    public static streamEmpty
    (
        state         : StateUserInterestsModel,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>,
        interestType  : InterestType,
        virtual       : boolean
    ): boolean
    {
        return !StateUserInterests.streamFound(state, lookup, keys, subscriptions, interestType, virtual);
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
}
