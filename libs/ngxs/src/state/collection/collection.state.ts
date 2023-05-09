import { createSelector, StateContext } from '@ngxs/store';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';

import { CoreUtil, CoreEnum, TypeOf, ImageType } from '@theory/core';
import { OrderBy, ImageSize, ServiceStorage, FirebaseDocument, DocumentSnapshot } from '@theory/firebase';

import { PageSize } from '../../enums';
import { ActionsCollection } from './collection.actions';
import { StateCollectionModel } from './collection.model';

export abstract class StateCollection<T extends FirebaseDocument, M extends StateCollectionModel<T>>
{
    protected defaults: M;
    protected actions:  ActionsCollection;
    protected storage:  ServiceStorage;

    constructor
    (
        defaults : M,
        actions  : ActionsCollection,
        storage  : ServiceStorage
    )
    {
        this.defaults = CoreUtil.clone<M>(defaults);
        this.actions  = actions;
        this.storage  = storage;
    }

    protected static initializedState(state: any):      boolean                          { return state.initialized; }
    protected static loadingState(state: any):          boolean                          { return state.loading; }
    protected static pageSizeState(state: any):         number                           { return state.pageSize; }
    protected static finishedPagingState(state: any):   boolean                          { return state.finishedPaging; }
    protected static orderByState(state: any):          string                           { return state.orderBy; }
    protected static orderByDirectionState(state: any): OrderBy                          { return state.orderByDirection; }
    protected static keysState(state: any):             Array<string>                    { return state.keys; }
    protected static keysFilteredState(state: any):     Array<string>                    { return state.keysFiltered || state.keys; }
    protected static snapshotLookupState(state: any):   Record<string, DocumentSnapshot> { return state.snapshotLookup; }
    protected static dataLookupState(state: any):       Record<string, any>              { return state.dataLookup; }
    protected static dataState(state: any):             Array<any>                       { return state.data; }
    protected static countState(state: any):            number                           { return StateCollection.keysState(state).length; }
    protected static foundState(state: any):            boolean                          { return StateCollection.countState(state) > 0; }
    protected static emptyState(state: any):            boolean                          { return StateCollection.countState(state) === 0; }
    protected static canPageState(state: any):          boolean                          { return StateCollection.pageSizeState(state) !== PageSize.None; }
    protected static noDataState(state: any):           boolean                          { return StateCollection.initializedState(state) && !StateCollection.loadingState(state) && !StateCollection.foundState(state); }

    public static initialized()      { return createSelector([this as any], (state: any) => StateCollection.initializedState(state)); }
    public static loading()          { return createSelector([this as any], (state: any) => StateCollection.loadingState(state)); }
    public static pageSize()         { return createSelector([this as any], (state: any) => StateCollection.pageSizeState(state)); }
    public static finishedPaging()   { return createSelector([this as any], (state: any) => StateCollection.finishedPagingState(state)); }
    public static orderBy()          { return createSelector([this as any], (state: any) => StateCollection.orderByState(state)); }
    public static orderByDirection() { return createSelector([this as any], (state: any) => StateCollection.orderByDirectionState(state)); }
    public static keys()             { return createSelector([this as any], (state: any) => StateCollection.keysState(state)); }
    public static keysFiltered()     { return createSelector([this as any], (state: any) => StateCollection.keysFilteredState(state)); }
    public static snapshotLookup()   { return createSelector([this as any], (state: any) => StateCollection.snapshotLookupState(state)); }
    public static data()             { return createSelector([this as any], (state: any) => StateCollection.dataState(state)); }
    public static dataLookup()       { return createSelector([this as any], (state: any) => StateCollection.dataLookupState(state)); }
    public static count()            { return createSelector([this as any], (state: any) => StateCollection.countState(state)); }
    public static found()            { return createSelector([this as any], (state: any) => StateCollection.foundState(state)); }
    public static empty()            { return createSelector([this as any], (state: any) => StateCollection.emptyState(state)); }
    public static canPage()          { return createSelector([this as any], (state: any) => StateCollection.canPageState(state)); }
    public static noData()           { return createSelector([this as any], (state: any) => StateCollection.noDataState(state)); }

    public getValue(value: any, type: TypeOf = TypeOf.String): any
    {
        return type === TypeOf.Timestamp ?
            value.toDate().getTime() :
            value;
    }

    public reset(context: StateContext<M>, action: any): Observable<any>
    {
        const { patchState } = context;

        const defaults: M = CoreUtil.clone<M>(this.defaults);

        return of(patchState(defaults));
    }

    public add(context: StateContext<M>, action: any): Observable<any>
    {
        const { getState, patchState } = context;
        const state: M = getState();
        const { keys, snapshotLookup, dataLookup, orderBy, orderByDirection, orderByType, initialized } = getState();

        if (!initialized) { return of(null); }

        const snapshot: DocumentSnapshot = action.snapshot;

        const entity   : T       = action.entity == null ? snapshot.data() : action.entity;
        const id       : string  = entity.id;
        const inKeys   : boolean = keys.findIndex((key: string) => key === id) !== -1;
        const inLookup : boolean = StateCollection.dataLookupState(state)[id] != null;

        let sortIndex: number = -1;

        if (!(inKeys && !inLookup))
        {
          const count:  number = StateCollection.countState(state);
          const value:  any    = this.getValue(entity[orderBy], orderByType);

          sortIndex = StateCollection.
              dataState(state).
              findIndex((object: T) =>
                  ((orderByDirection === OrderBy.Ascending  && this.getValue(object[orderBy], orderByType) > value) ||
                  (orderByDirection === OrderBy.Descending && this.getValue(object[orderBy], orderByType) < value))
              );

          sortIndex = sortIndex === -1 ? count : sortIndex;

          keys.splice(sortIndex, 0, id);
        }

        snapshotLookup[id] = snapshot;
        dataLookup[id]     = entity;

        patchState
        ({
            keys,
            snapshotLookup,
            dataLookup
        } as M);

        patchState({ keysFiltered: this.keys(context) } as M);
        patchState({ data: this.data(context) } as M);

        return of(sortIndex);
    }

    public remove(context: StateContext<M>, action: any): Observable<any>
    {
        const { getState, patchState } = context;

        const { keys, snapshotLookup, dataLookup, initialized } = getState();

        if (!initialized) { return of(null); }

        const id:    string = action.id;
        const index: number = keys.findIndex((key: string) => key === id);

        delete snapshotLookup[id];
        delete dataLookup[id];

        keys.splice(index, 1);

        patchState
        ({
            keys,
            snapshotLookup,
            dataLookup
        } as M);

        patchState({ keysFiltered: this.keys(context) } as M);
        patchState({ data: this.data(context) } as M);

        return of(index);
    }

    public sync(context: StateContext<M>, action: any): Observable<any>
    {
        const { getState, patchState }  = context;

        if (!StateCollection.initializedState(getState())) { return of(null); }

        const after: T       = action.object;
        const id:    string  = after.id;
        const state: M       = getState();
        const sync:  boolean = id !== CoreEnum.IdNew;

        let changedOrderBy: boolean = false;
        let indexOld:       number  = -1;
        let indexNew:       number  = -1;

        if (sync)
        {
            const { keys, dataLookup, orderBy } = getState();

            const before : T = dataLookup[id];

            indexOld       = keys.findIndex((key: string) => key === id);
            changedOrderBy = before == null ||  before[orderBy] !== after[orderBy];
            dataLookup[id] = after;

            if (changedOrderBy)
            {
                const { orderByDirection, orderByType } = state;

                const count : number = keys.length;
                const value : any    = this.getValue(after[orderBy], orderByType);

                keys.splice(indexOld, 1);

                indexNew = StateCollection.dataState(state).findIndex((object: T) =>
                    ((orderByDirection === OrderBy.Ascending  && this.getValue(object[orderBy], orderByType) > value) ||
                     (orderByDirection === OrderBy.Descending && this.getValue(object[orderBy], orderByType) < value))
                );

                indexNew = indexNew === -1 ? count : indexNew;

                keys.splice(indexNew, 0, id);

                patchState({ keys } as M);
            }

            patchState({ keys, dataLookup } as M);
        }

        return of
        ({
            sync,
            changedOrderBy,
            indexOld,
            indexNew
        });
    }

    public get(context: StateContext<M>): Observable<any>
    {
        return of(null);
    }

    public filter(context: StateContext<M>, action?: any): Observable<any>
    {
        const { patchState } = context;

        const keysFiltered: Array<string> = this.keys(context);

        patchState({ keysFiltered } as M);

        const data: Array<T> = this.data(context);

        return of(patchState({ data } as M));
    }

    public keys({ getState }: StateContext<M>): Array<string>
    {
        return getState().keys;
    }

    public data(context: StateContext<M>): Array<any>
    {
        const { getState } = context;

        const state        : M                 = getState();
        const keysFiltered : Array<string>     = StateCollection.keysFilteredState(state);
        const dataLookup   : Record<string, T> = StateCollection.dataLookupState(state);

        return keysFiltered.
            map((id: string) =>
                dataLookup[id]
            );
    }

    public setMedia(context: StateContext<M>, collection: string, imageType: string): Observable<any>
    {
        return this.getMediaWithData(context, collection, imageType);
    }

    protected getMediaWithData(context: StateContext<M>, collection: string, imageType: string): Observable<any>
    {
        const imageSize: ImageSize = imageType === ImageType.Icon ? ImageSize.Small : ImageSize.Medium;

        const { getState, patchState } = context
        const state: M = getState();

        const data       : Array<T>          = StateCollection.dataState(state);
        const dataLookup : Record<string, T> = StateCollection.dataLookupState(state);

        return of(data).
        pipe
        (
            takeWhile((list: Array<T>) =>
                list.length > 0
            ),
            map((list: Array<T>) =>
                list.
                    filter((item: T) =>
                        item.metadata[imageType] == null
                    ).
                    map((item: T) =>
                        of(item).
                        pipe
                        (
                            switchMap(() =>
                                this.storage.downloadUrl(`${collection}/${item.id}/${imageType}.jpeg`, imageSize)
                            ),
                            tap((image: string) =>
                                item.metadata[imageType] = image
                            ),
                            tap(() =>
                                dataLookup[item.id] = item
                            )
                        )
                    )
            ),
            switchMap((items$: Array<Observable<string>>) =>
                forkJoin(items$)
            ),
            map(() =>
                patchState({ data, dataLookup } as M)
            )
        );
    }
}
