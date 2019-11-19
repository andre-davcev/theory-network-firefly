import { StateContext } from '@ngxs/store';
import { Observable, from, of } from 'rxjs';

import { StateQueryModel } from '../interfaces';
import { ImageSize, ServiceAsset, Model, ActionStorageGetUrls, OrderBy } from '@theory/firebase';
import { Query } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { map, tap, switchMap } from 'rxjs/operators';
import { CoreUtil } from '@theory/core';

export class StateQuery<E extends Model, S extends ServiceAsset<E>, M extends StateQueryModel<E, S>>
{
    public init({ patchState }: StateContext<M>, query: Query, service: S): void
    {
        patchState
        ({
            query,
            service
        } as M);
    }

    public reset(context: StateContext<M>, defaults: M): void
    {
        const { patchState, getState } = context;
        const { service, query } = getState();

        const clone: M = CoreUtil.clone<M>(defaults);

        patchState
        ({
            ...clone,
            service,
            query
        });
    }

    public query(context: StateContext<M>, defaults: M): Observable<void>
    {
        const { getState, patchState } = context;

        const state: M = getState();
        const { pageSize, orderBy, orderByDirection, query } = state;

        this.reset(context, defaults);

        patchState
        ({
            query       : query.orderBy(orderBy, orderByDirection).limit(pageSize),
            initialized : true
        } as M);

        return this.get(context);
    }

    public get(context: StateContext<M>): Observable<any>
    {
        const { getState, patchState, dispatch } = context;

        const state : M = getState();

        const { snapshots, snapshotLookup, finishedPaging, imageSize, initialized } = state;

        let query : Query = state.query;

        if (!initialized)
        {
            patchState({ initialized: true} as M);
        }
        else if (!finishedPaging)
        {
            query = query.startAfter(snapshots[snapshots.length - 1]);
        }

        return finishedPaging ?
            of(null) :
            from(query.get()).pipe
            (
                tap((snapshot: firestore.QuerySnapshot) =>
                    patchState({ finishedPaging: snapshot.empty } as M)
                ),
                map((snapshot: firestore.QuerySnapshot) =>
                    snapshot.docs
                ),
                tap((page: Array<firestore.QueryDocumentSnapshot>) =>
                    page.forEach((document: firestore.QueryDocumentSnapshot) => {
                        snapshots.push(document);
                        snapshotLookup[document.id] = document;
                    })
                ),
                map((page: Array<firestore.QueryDocumentSnapshot>) =>
                    page.map((document: firestore.QueryDocumentSnapshot) => document.data() as E)
                ),
                tap((list: Array<E>) =>
                    patchState({ list } as M)
                ),
                map((list: Array<E>) =>
                    imageSize === ImageSize.None ?
                        [] :
                        list.map((item: E) => item['bucketPath'])
                ),
                switchMap((bucketPaths: Array<string>) =>
                    bucketPaths.length === 0 ?
                        of(null) :
                        dispatch(new ActionStorageGetUrls(bucketPaths, imageSize))
                )
            );
    }
}
