import { StateContext } from '@ngxs/store';
import { Observable, from, of, forkJoin } from 'rxjs';

import { StateQueryModel } from '../interfaces';
import { ImageSize, ServiceAsset, Model, ActionStorageGetUrls } from '@theory/firebase';
import { Query } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { map, tap, switchMap } from 'rxjs/operators';
import { CoreUtil } from '@theory/core';

export class StateQuery<E extends Model, S extends ServiceAsset<E>, M extends StateQueryModel<E, S>>
{
    public reset(context: StateContext<M>, defaults: M): void
    {
        const { patchState } = context;

        const clone: M = CoreUtil.clone<M>(defaults);

        patchState(clone);
    }

    public query(context: StateContext<M>, defaults: M): Observable<any>
    {
        const { getState, patchState } = context;

        const state     : M                          = getState();
        const limit     : number                     = state.limit;
        const orderBy   : string                     = state.orderBy;
        const direction : firestore.OrderByDirection = state.orderByDirection;

        this.reset(context, defaults);

        const query : Query = state.query.orderBy(orderBy, direction).limit(limit);

        patchState({ query } as M);

        return this.page(context);
    }

    public page(context: StateContext<M>): Observable<any>
    {
        const { getState, patchState, dispatch } = context;

        const state          : M                                               = getState();
        const snapshots      : Array<firestore.QueryDocumentSnapshot>          = state.snapshots;
        const snapshotLookup : Record<string, firestore.QueryDocumentSnapshot> = state.snapshotLookup;
        const finished       : boolean                                         = state.finishedPaging;
        const imageSize      : ImageSize                                       = state.imageSize;

        let query : Query = state.query;

        if (!state.initialized)
        {
            patchState({ initialized: true} as M);
        }
        else if (!finished)
        {
            query.startAfter(snapshots[snapshots.length - 1]);
        }

        return finished ?
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
