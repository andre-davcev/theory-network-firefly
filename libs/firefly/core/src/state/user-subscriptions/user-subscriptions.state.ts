import { State, Action, StateContext, Selector, Select } from '@ngxs/store';

import { CoreUtil } from '@theory/core';
import { UserSubscriptions, UserSubscriptionsKey, Subscription, Cluster, SubscriptionKey, AssetKey } from '@firefly/core/models';

import { StateUserSubscriptionsModel } from './user-subscriptions.state.model';
import { StateUserSubscriptionsOptions } from './user-subscriptions.state.options';
import { ActionUserSubscriptionsWatch, ActionUserSubscriptionsWatchOn, ActionUserSubscriptionsWatchOff } from './user-subscriptions.actions';
import { StateUser, StateClusterOptions } from '@firefly/core/state';
import { Observable, of } from 'rxjs';
import { filter, switchMap, tap, withLatestFrom, map } from 'rxjs/operators';
import { ServiceUserSubscriptions, ServiceCluster } from '@firefly/core/services';

@State<StateUserSubscriptionsModel>(StateUserSubscriptionsOptions)

export class StateUserSubscriptions
{
    @Select(StateUser.userId) userId$: Observable<string>;

    @Selector() static empty(state: StateUserSubscriptionsModel)  { return CoreUtil.clone<UserSubscriptions>(state.empty); }
    @Selector() static data(state: StateUserSubscriptionsModel)   { return state.data == null ? StateUserSubscriptions.empty(state): state.data; }

    @Selector() static onMap(state: StateUserSubscriptionsModel) { return state.onMap == null ? {} : state.onMap; }
    @Selector() static onKeys(state: StateUserSubscriptionsModel): Record<string, string>
    {
        return StateUserSubscriptions.data(state)[UserSubscriptionsKey.On];
    }
    @Selector() static on(state: StateUserSubscriptionsModel): Array<Subscription>
    {
        const onMap: Record<string, Cluster> = StateUserSubscriptions.onMap(state);

        return Object.
            keys(onMap).
            map(((id: string) => onMap[id])).
            map((cluster: Cluster) =>
            ({
                ...cluster,
                [SubscriptionKey.On]: true
            }));
    }
    @Selector() static onFound(state: StateUserSubscriptionsModel): boolean
    {
        return Object.keys(StateUserSubscriptions.onKeys(state)).length > 0;
    }

    @Selector() static offMap(state: StateUserSubscriptionsModel) { return state.offMap == null ? {} : state.offMap; }
    @Selector() static offKeys(state: StateUserSubscriptionsModel): Record<string, string>
    {
        return StateUserSubscriptions.data(state)[UserSubscriptionsKey.Off];
    }
    @Selector() static off(state: StateUserSubscriptionsModel): Array<Subscription>
    {
        const offMap: Record<string, Cluster> = StateUserSubscriptions.offMap(state);

        return Object.
            keys(offMap).
            map(((id: string) => offMap[id])).
            map((cluster: Cluster) =>
            ({
                ...cluster,
                [SubscriptionKey.On]: false
            }));
    }
    @Selector() static offFound(state: StateUserSubscriptionsModel): boolean
    {
        return Object.keys(StateUserSubscriptions.offKeys(state)).length > 0;
    }

    @Selector() static allKeys(state: StateUserSubscriptionsModel): Record<string, string>
    {
        return {
            ...StateUserSubscriptions.onKeys(state),
            ...StateUserSubscriptions.offKeys(state)
        };
    }
    @Selector() static allMap(state: StateUserSubscriptionsModel)
    {
        return {
            ...StateUserSubscriptions.onMap(state),
            ...StateUserSubscriptions.offMap(state)
        };
    }
    @Selector() static all(state: StateUserSubscriptionsModel): Array<Subscription>
    {
        return [
          ...StateUserSubscriptions.on(state),
          ...StateUserSubscriptions.off(state)
        ].
        sort((a: Cluster, b: Cluster) =>
            a[AssetKey.Name].localeCompare(b[AssetKey.Name])
        );
    }
    @Selector() static allFound(state: StateUserSubscriptionsModel): boolean
    {
        return Object.keys(StateUserSubscriptions.allKeys(state)).length > 0;
    }

    constructor
    (
        private service: ServiceUserSubscriptions,
        private cluster: ServiceCluster
    ) { }

    @Action(ActionUserSubscriptionsWatch)
    watch({ getState, dispatch }: StateContext<StateUserSubscriptionsModel>)
    {
        return this.userId$.
        pipe
        (
            filter((userId: string) => userId != null),
            switchMap((userId: string) => this.service.valuesChanges(userId)),
            map((data: UserSubscriptions) => data == null ? StateUserSubscriptions.empty(getState()) : data),
            withLatestFrom(of(StateUserSubscriptions.data(getState()))),

            tap(([subscriptions, previous]) =>
            {
                const keys: Record<string, string> = subscriptions[UserSubscriptionsKey.On];

                const keysAreEqual: boolean = this.service.keysAreEqual(keys, previous[UserSubscriptionsKey.Off]);
                const keysFound:    boolean = Object.keys(keys).length > 0;

                if (!keysFound || !keysAreEqual)
                {
                    dispatch(new ActionUserSubscriptionsWatchOn(keys))
                }
            }),

            tap(([subscriptions, previous]) =>
            {
                const keys: Record<string, string> = subscriptions[UserSubscriptionsKey.Off];

                const keysAreEqual: boolean = this.service.keysAreEqual(keys, previous[UserSubscriptionsKey.Off]);
                const keysFound:    boolean = Object.keys(keys).length > 0;

                if (!keysFound || !keysAreEqual)
                {
                    dispatch(new ActionUserSubscriptionsWatchOff(keys))
                }
            })
        );
    }

    @Action(ActionUserSubscriptionsWatchOn, { cancelUncompleted: true })
    watchOn({ patchState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsWatchOn)
    {
        const keys: Record<string, string> = payload;
        const empty: Cluster = StateClusterOptions.defaults.empty;

        return Object.keys(keys).length === 0 ?
            of() :
            this.cluster.valuesChangesClusters(keys, empty).
            pipe
            (
                tap((onMap: Record<string, Cluster>) => patchState({ onMap }))
            );
    }

    @Action(ActionUserSubscriptionsWatchOff, { cancelUncompleted: true })
    watchOff({ patchState }: StateContext<StateUserSubscriptionsModel>, { payload }: ActionUserSubscriptionsWatchOff)
    {
        const keys: Record<string, string> = payload;
        const empty: Cluster = StateClusterOptions.defaults.empty;

        return Object.keys(keys).length === 0 ?
            of() :
            this.cluster.valuesChangesClusters(keys, empty).
            pipe
            (
                tap((offMap: Record<string, Cluster>) => patchState({ offMap }))
            );
    }
}
