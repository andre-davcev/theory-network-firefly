import { StateContext } from '@ngxs/store';
import { Query } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { FirebaseDocument, QueryDocumentSnapshot, QuerySnapshot, ServiceStorage } from '@theory/firebase';

import { StateCollection, ActionsCollection, StateCollectionModel } from '../collection';

export abstract class StateQuery<T extends FirebaseDocument, M extends StateCollectionModel<T>> extends StateCollection<T, M>
{
    public query: Query;

    constructor
    (
        defaults : M,
        actions  : ActionsCollection,
        storage  : ServiceStorage
    )
    {
        super(defaults, actions, storage);
    }

    public reset(context: StateContext<M>, action: any): Observable<any>
    {
        this.query = action.query == null ? this.query : action.query;

        return super.reset(context, action);
    }

    public getData(context: StateContext<M>): Observable<any>
    {
        const { getState, dispatch } = context;
        const { ActionReset, ActionGet } = this.actions;

        const initialized: boolean = StateQuery.initializedState(getState());
        return initialized ?
            of(null) :
            dispatch(new ActionReset()).
            pipe
            (
                switchMap(() => dispatch(new ActionGet()))
            );
    }

    public get(context: StateContext<M>): Observable<any>
    {
        const { getState, patchState } = context;

        const state : M = getState();

        const
        {
            snapshotLookup,
            keys,
            dataLookup,
            finishedPaging,
            initialized,
            pageSize
        } = state;

        if (!initialized)
        {
            const { pageSize, orderBy, orderByDirection } = state;

            this.query = this.query.orderBy(orderBy, orderByDirection).limit(pageSize);

            patchState({ initialized: true} as M);
        }
        else if (!finishedPaging)
        {
            this.query = this.query.startAfter(snapshotLookup[keys[keys.length - 1]]);
        }

        patchState({ loading: true } as M);

        return finishedPaging ?
            of(null) :
            from(this.query.get()).pipe
            (
                map((snapshot: QuerySnapshot) =>
                    snapshot.docs
                ),
                tap((page: Array<QueryDocumentSnapshot>) =>
                    patchState({ finishedPaging: page.length < pageSize } as M)
                ),
                tap((page: Array<QueryDocumentSnapshot>) =>
                    page.forEach((document: QueryDocumentSnapshot) =>
                    {
                        const object: T = document.data() as T;

                        keys.push(document.id);
                        snapshotLookup[document.id] = document;

                        object.metadata = object.metadata == null ? {} : object.metadata;

                        dataLookup[document.id] = object;
                    })
                ),
                tap(() =>
                    patchState
                    ({
                        snapshotLookup,
                        dataLookup
                    } as M)
                ),
                tap(() =>
                    patchState({ loading: false } as M)
                )
            );
    }
}
