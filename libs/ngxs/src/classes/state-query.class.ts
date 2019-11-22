import { StateContext, Selector } from '@ngxs/store';
import { Observable, from, of } from 'rxjs';

import { StateQueryModel } from '../interfaces';
import { ImageSize, Model, ActionStorageGetUrls, OrderBy } from '@theory/firebase';
import { Query } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { map, tap, switchMap } from 'rxjs/operators';
import { CoreUtil } from '@theory/core';

export class StateQuery<T extends Model, M extends StateQueryModel<T>>
{
    private query:    Query;
    private defaults: M;

    @Selector() static initialized(state: any):      boolean                                    { return state.initialized; }
    @Selector() static loading(state: any):          boolean                                    { return state.loading; }
    @Selector() static pageSize(state: any):         number                                     { return state.pageSize; }
    @Selector() static finishedPaging(state: any):   boolean                                    { return state.finishedPaging; }
    @Selector() static orderBy(state: any):          string                                     { return state.orderBy; }
    @Selector() static orderByDirection(state: any): OrderBy                                    { return state.orderByDirection; }
    @Selector() static imageSize(state: any):        ImageSize                                  { return state.imageSize; }
    @Selector() static snapshots(state: any):        Array<firestore.DocumentSnapshot>          { return state.snapshots; }
    @Selector() static snapshotLookup(state: any):   Record<string, firestore.DocumentSnapshot> { return state.snapshotLookup; }
    @Selector() static data(state: any):             Array<any>                                 { return state.data; }
    @Selector() static dataLookup(state: any):       Record<string, any>                        { return state.dataLookup; }
    @Selector() static count(state: any):            number                                     { return StateQuery.snapshots(state).length; }
    @Selector() static found(state: any):            boolean                                    { return StateQuery.count(state) > 0; }

    constructor
    (
        query:    Query,
        defaults: M
    )
    {
        this.query    = query;
        this.defaults = CoreUtil.clone<M>(defaults);
    }

    public reset(context: StateContext<M>): Observable<any>
    {
        const { patchState } = context;

        const defaults: M = CoreUtil.clone<M>(this.defaults);

        return of(patchState(defaults));
    }

    public get(context: StateContext<M>): Observable<any>
    {
        const { getState, patchState, dispatch } = context;

        const state : M = getState();

        const
        {
            snapshots,
            snapshotLookup,
            data,
            dataLookup,
            finishedPaging,
            imageSize,
            initialized
        } = state;

        if (!initialized)
        {
            const { pageSize, orderBy, orderByDirection } = state;

            this.query = this.query.orderBy(orderBy, orderByDirection).limit(pageSize);

            patchState({ initialized: true} as M);
        }
        else if (!finishedPaging)
        {
            this.query = this.query.startAfter(snapshots[snapshots.length - 1]);
        }

        patchState({ loading: true } as M);

        return finishedPaging ?
            of(null) :
            from(this.query.get()).pipe
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

                        data.push(document.data() as T);
                        dataLookup[document.id] = document.data() as T;
                    })
                ),
                tap(() =>
                    patchState
                    ({
                        snapshots,
                        snapshotLookup,
                        data,
                        dataLookup
                    } as M)
                ),
                map(() =>
                    imageSize === ImageSize.None ?
                        [] :
                        data.map((item: T) => item['bucketPath'])
                ),
                switchMap((bucketPaths: Array<string>) =>
                    dispatch(new ActionStorageGetUrls(bucketPaths, imageSize))
                ),
                tap(() =>
                    patchState({ loading: false } as M)
                )
            );
    }

    public add(context: StateContext<M>, action: any): Observable<any>
    {
        const { getState, patchState } = context;
        const { snapshots, snapshotLookup, data, dataLookup, orderBy, orderByDirection } = getState();

        const snapshot: firestore.DocumentSnapshot = action.snapshot;

        const id:   string  = snapshot.id;
        const entity: T     = action.entity == null ? snapshot.data() : action.entity;
        const count: number = data.length;
        const value: any    = entity[orderBy];

        const sortIndex: number = data.findIndex((object: T, index: number) =>
            (orderByDirection === OrderBy.Ascending  && value > object[orderBy]) ||
            (orderByDirection === OrderBy.Descending && value < object[orderBy]) ||
            index === count
        );

        snapshotLookup[id] = snapshot;
        dataLookup[id]     = entity;

        return of(patchState
        ({
            snapshotLookup,
            dataLookup,

            snapshots: snapshots.splice(sortIndex, 0, snapshot),
            data:      data.splice(sortIndex, 0, entity)
        } as M))
    }
}
