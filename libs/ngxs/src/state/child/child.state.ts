import { StateContext, createSelector } from '@ngxs/store';
import { Observable, of, forkJoin } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';

import { CoreUtil, TypeOf } from '@theory/core';
import { FirebaseDocument, OrderBy, ServiceFirestore, ServiceStorage, DocumentSnapshot } from '@theory/firebase';

import { StateChildModel } from './child.model';
import { ActionsCollection, StateCollection } from '../collection';
import { SortField, SyncResult } from '../../interfaces';

export class StateChild<T extends FirebaseDocument, M extends StateChildModel<T>> extends StateCollection<T, M>
{
    protected collection:      string;
    protected collectionChild: string;
    protected service:         ServiceFirestore<T>;

    constructor
    (
        defaults:   M,
        actions:    ActionsCollection,
        storage:    ServiceStorage,
        service:    ServiceFirestore<T>,
        collection: string
    )
    {
        super(defaults, actions, storage);

        this.service    = service;
        this.collection = collection;
    }

    protected static idState(state: any):          string                        { return state.id; }
    protected static childLookupState(state: any): Record<string, Partial<any>>  { return state.childLookup; }
    protected static sortFieldsState(state: any):  Record<string, SortField>     { return state.sortFields; }

    public static id()          { return createSelector([this], (state: any) => StateChild.idState(state)); }
    public static childLookup() { return createSelector([this], (state: any) => StateChild.childLookupState(state)); }
    public static sortFields()  { return createSelector([this], (state: any) => StateChild.sortFieldsState(state)); }

    protected static offsetState(state: any): number
    {
        const dataLookup: Record<string, any> = StateCollection.dataLookupState(state);

        return StateChild.
            keysFilteredState(state).
            findIndex((id: string) =>
                dataLookup[id] == null
            );
    }

    protected static finishedPagingState(state: any): boolean
    {
        return StateChild.initializedState(state) &&
            StateChild.dataState(state).length === StateChild.keysFilteredState(state).length;
    }

    public static data()           { return createSelector([this], (state: any) => StateChild.dataState(state)); }
    public static offset()         { return createSelector([this], (state: any) => StateChild.offsetState(state)); }
    public static finishedPaging() { return createSelector([this], (state: any) => StateChild.finishedPagingState(state)); }

    public getData(context: StateContext<M>, action: any): Observable<any>
    {
        const id:    string  = action.id;
        const fetch: boolean = action.fetch;

        const { getState, dispatch, patchState } = context;
        const { ActionReset, ActionSetData } = this.actions;

        patchState({ id, loading: true } as M);

        const initialized: boolean = StateChild.initializedState(getState());
        return initialized ?
            of(null) :
            dispatch(new ActionReset()).
            pipe
            (
                switchMap(() =>
                    this.service.documentGet(this.collectionChild, id)
                ),
                map((snapshot: DocumentSnapshot) =>
                    snapshot.data()
                ),
                switchMap((childLookup: Record<string, Partial<T>>) =>
                    dispatch(new ActionSetData(childLookup, fetch))
                )
            );
    }

    public setData(context: StateContext<M>, action: any): Observable<any>
    {
        const childLookup : Record<string, Partial<T>> = action.data;
        const fetch       : boolean                    = action.fetch;

        const { dispatch, patchState } = context;
        const { ActionGet } = this.actions;

        return Object.keys(childLookup).length === 0 ?
            of(patchState({ initialized: true } as M)) :
            of(patchState({ childLookup } as M)).
            pipe
            (
                tap(() =>
                    patchState({ keys: this.sort(context) } as M)
                ),
                switchMap(() =>
                    fetch ?
                        dispatch(new ActionGet()) :
                        of(patchState({ loading: false } as M))
                ),
                map(() =>
                    patchState({ initialized: true } as M)
                )
            );
    }

    public get(context: StateContext<M>, action?: any): Observable<any>
    {
        const { getState, patchState, dispatch } = context;

        const state: M = getState();

        const { snapshotLookup, dataLookup, childLookup } = state;

        const { ActionFilter } = this.actions;

        const collection: string = action?.collection;
        const imageType:  string = action?.imageType;

        const fetchMedia: boolean = collection != null && imageType != null;

        const finishedPaging : boolean       = StateChild.finishedPagingState(state);
        const keysFiltered   : Array<string> = this.keys(context);

        return finishedPaging ? of(null) :
        of(null).
        pipe
        (
            map(() =>
                this.keysGet(context, keysFiltered).
                map((id: string) =>
                    this.service.documentGet(this.collection, id)
                )
            ),
            switchMap((slice$: Array<Observable<DocumentSnapshot>>) =>
                slice$.length === 0 ?
                    of([]) :
                    forkJoin(slice$)
            ),
            map((page: Array<QueryDocumentSnapshot<any>>) =>
                page.
                    filter((document: QueryDocumentSnapshot<any>) =>
                        document.exists
                    ).
                    forEach((document: QueryDocumentSnapshot<any>) =>
                    {
                        const id: string = document.id;
                        const object: T =
                        {
                            ...childLookup[id],
                            ...(document.data() as T)
                        };

                        object.metadata = object.metadata == null ? {} : object.metadata;

                        snapshotLookup[id] = document;
                        dataLookup[id]     = object;
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
                patchState
                ({
                    dataLookup,
                    initialized: true,
                    loading: false
                } as M)
            ),
            switchMap(() =>
                dispatch(new ActionFilter())
            ),
            switchMap(() =>
                !fetchMedia ?
                    of(null) :
                    this.setMedia(context, collection, imageType)
            ),
        );
    }

    public remove(context: StateContext<M>, action: any): Observable<any>
    {
        const { getState, patchState } = context;

        const { childLookup, initialized }: M = getState();

        if (!initialized) { return of(null); }

        const id: string = action.id;

        delete childLookup[id];

        patchState({ childLookup } as M);

        return super.remove(context, action);
    }

    public sync(context: StateContext<M>, action: any): Observable<any>
    {
        const { getState, patchState, dispatch }  = context;
        const { keys, initialized } = getState();

        const { ActionFilter } = this.actions;

        if (!initialized) { return of(null); }

        const id: string = action.object.id;

        return super.sync(context, action).
        pipe
        (
            tap((result: SyncResult) =>
            {
                if (result.sync && result.changedOrderBy)
                {
                    keys.splice(result.indexOld, 1);
                    keys.splice(result.indexNew, 0, id);

                    patchState({ keys } as M);
                }
            }),
            switchMap(() =>
                dispatch(new ActionFilter())
            )
        );
    }

    protected sort(context: StateContext<M>): Array<string>
    {
        const { getState } = context;

        const state: M = getState();

        const { childLookup, orderBy, orderByDirection, sortFields } = state;

        const lookup: Record<string, Partial<T>> = childLookup;

        const type:      TypeOf  = sortFields[orderBy];
        const ascending: boolean = orderByDirection === OrderBy.Ascending;

        const sort: any = type === TypeOf.String ?
            this.sortString :
            type === TypeOf.Number ?
            this.sortNumber :
            type === TypeOf.Date ?
            this.sortDate :
            type === TypeOf.Timestamp ?
            this.sortTimestamp :
            this.sortBoolean;

        let a: any;
        let b: any;

        const keys: Array<string> = Object.
        keys(lookup).
        sort((keyA: string, keyB: string) =>
        {
            a = CoreUtil.deepValue(orderBy, childLookup[keyA]);
            b = CoreUtil.deepValue(orderBy, childLookup[keyB]);

            return sort(a, b, ascending);
        });

        return keys;
    }

    public data(context: StateContext<M>): Array<any>
    {
        const { getState } = context;

        const state        : M                   = getState();
        const lookup       : Record<string, any> = StateCollection.dataLookupState(state);
        const keysFiltered : Array<string>       = StateCollection.keysFilteredState(state);

        if (keysFiltered.length === 0) { return []; }

        const offset : number = keysFiltered.findIndex((id: string) => lookup[id] == null);
        const end    : number = offset === -1 ? keysFiltered.length : offset;

        return keysFiltered.
            slice(0, end).
            map((id: string) =>
                lookup[id]
            ).
            map((item: any, index: number) =>
                ({
                    ...item,
                    metadata:
                    {
                        ...item.metadata,
                        index
                    }
                })
            );
    }

    public setMedia(context: StateContext<M>, collection: string, imageType: string): Observable<any>
    {
        return this.getMediaWithData(context, collection, imageType);
    }

    private keysGet(context: StateContext<M>, keysFiltered?: Array<string>): Array<string>
    {
        const { getState } = context;

        const state : M             = getState();
        const keys  : Array<string> = keysFiltered || StateChild.keysFilteredState(state);

        if (StateChild.canPageState(state))
        {
            const { pageSize } = state;

            const offset : number = StateChild.offsetState(state);
            const start  : number = offset === -1 ? 0 : offset;
            const end    : number = start + pageSize;

            return keys.slice(start, end);
        }

        return keys;
    }

    private sortString(a: string, b: string, ascending: boolean): number
    {
        a = a == null ? '' : a.toLowerCase().trim();
        b = b == null ? '' : b.toLowerCase().trim();

        if (a > b)      { return ascending ?  1 : -1; }
        else if (a < b) { return ascending ? -1 : 1; }

        return 0;
    }

    private sortNumber(a: number, b: number, ascending: boolean): number
    {
        if (a > b)      { return ascending ?  1 : -1; }
        else if (a < b) { return ascending ? -1 : 1; }

        return 0;
    }

    private sortDate(aString: string, bString: string, ascending: boolean): number
    {
        const a: number = Date.parse(aString);
        const b: number = Date.parse(bString);

        if (a > b)      { return ascending ?  1 : -1; }
        else if (a < b) { return ascending ? -1 : 1; }

        return 0;
    }

    private sortTimestamp(aTimestamp: Timestamp, bTimestamp: Timestamp, ascending: boolean): number
    {
        const a: number = aTimestamp.toDate().getTime();
        const b: number = bTimestamp.toDate().getTime();

        if (a > b)      { return ascending ?  1 : -1; }
        else if (a < b) { return ascending ? -1 : 1; }

        return 0;
    }

    private sortBoolean(a: boolean, b: boolean, ascending: boolean): number
    {
        if (a as boolean === b as boolean) { return 0; }
        else if (a as boolean)             { return ascending ?  1 : -1; }

        return ascending ? -1 : 1;
    }
}
