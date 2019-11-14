import { ReferenceTable, StateReferenceTableModel } from '../interfaces';
import { TypeOf, CoreUtil } from '@theory/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Default } from '../enums';
import { Model, ServiceAsset, ImageSize } from '@theory/firebase';
import { tap, switchMap, map } from 'rxjs/operators';

export class StateReferenceTable<R extends ReferenceTable, T extends Model, S extends StateReferenceTableModel<R, T>>
{
    public getSortFields(sortFields: Record<string, TypeOf>, data: T): Record<string, any>
    {
        return Object.
            keys(sortFields).
            filter((key: string) =>
                CoreUtil.deepValue(key, data) !== undefined
            ).
            reduce((sort: Record<string, any>, key: string) =>
                sort[key] = CoreUtil.deepValue(key, data)
            , {});
    }

    public sort(state: StateReferenceTableModel<R, T>): Array<string>
    {
        const getAll:    boolean           = state.pageSize === Default.None;
        const lookup:    Record<string, T> = state.lookup;
        const data:      Record<string, R> = state.data;
        const field:     string            = state.sortField;
        const ascending: boolean           = state.sortAscending;
        const type:      TypeOf            = state.sortFields[field];

        const GREATER: number = ascending ?  1 : -1;
        const LESSER:  number = ascending ? -1 : 1;
        const EQUAL:   number = 0;

        let sort: number;
        let a: any;
        let b: any;

        return Object.
            keys(data).
            sort((keyA: string, keyB: string) =>
            {
                a = getAll ? CoreUtil.deepValue(field, lookup[keyA]) : data[keyA].sort[field];
                b = getAll ? CoreUtil.deepValue(field, lookup[keyB]) : data[keyB].sort[field];
                sort = 0;

                if (type === TypeOf.String)
                {
                    a = a == null ? '' : (a as string).toLowerCase();
                    b = b == null ? '' : (b as string).toLowerCase();
                }

                if (type === TypeOf.Boolean)
                {
                    if (a as boolean === b as boolean) { sort = EQUAL; }
                    else if (a as boolean)             { sort = GREATER; }
                    else                               { sort = LESSER; }
                }
                else
                {
                    if (a > b)      { sort = GREATER; }
                    else if (b < a) { sort = LESSER; }
                }

                return sort;
            });
    }

    public page(state: StateReferenceTableModel<R, T>, service: ServiceAsset<T>, imageSize: ImageSize = ImageSize.Small): Observable<Partial<S>>
    {
        let keys: Array<string> = state.keys;

        const getAll:       boolean           = Object.keys(state.sortFields).length > 0 && state.sortByEntity;
        const pageSize:     number            = state.pageSize;
        const list:         Array<T>          = state.list;
        const keysLength:   number            = keys.length;
        const finished:     boolean           = list.length === keysLength;
        const lookup:       Record<string, T> = state.lookup;

        const start: number = state.offset;
        const end:   number = (start + pageSize) > keysLength ? keysLength : (start + pageSize);

        const imageIdKey:  string = state.imageIdKey;
       
        let imageUrlKey: string = imageIdKey == null ? null : imageIdKey === 'id' ? 'url' : imageIdKey.replace('Id', 'Url');

        imageUrlKey = `${imageUrlKey}${imageSize === ImageSize.Small ? 'Small' : ''}`;

        return finished ? of({}) : of({}).
        pipe
        (
            map(() =>
                getAll ? keys : keys.slice(start, end)
            ),
            map((slice: Array<string>) =>
                slice.map((id: string) =>
                    lookup[id] != null ?
                        of(lookup[id]) :
                        service.snapshot(id).pipe(tap((object: T) => lookup[id] = object))
                )
            ),
            switchMap((slice$: Array<Observable<T>>) =>
                forkJoin(slice$)
            ),
            tap(() =>
                (keys = getAll ? this.sort(state) : keys)
            ),
            map((entities: Array<T>) =>
                !getAll ? entities : keys.slice(start, end).map((key: string) => lookup[key])
            ),
            switchMap((entities: Array<T>) =>
                forkJoin
                (
                    entities.map((entity: T) => imageIdKey == null ?
                        of(entity) :
                        service.
                            getDownloadUrl(entity[imageIdKey], imageSize).
                            pipe(map((url: string) => ({ ...entity, [imageUrlKey]: url })))
                    )
                )
            ),
            map((slice: Array<T>) =>
            ({
                keys,
                lookup,
                offset: list.length + 1,

                list:
                [
                    ...list,
                    ...slice
                ]
            }))
        );
    }

    public addData
    (
        state:      StateReferenceTableModel<R, T>,
        entity:     T,
        refPartial: Partial<R> = {}
    ): Partial<StateReferenceTableModel<R, T>>
    {
        const id:         string                 = entity.id;
        const data:       Record<string, R>      = state.data;
        const lookup:     Record<string, T>      = state.lookup;
        const list:       Array<T>               = state.list;
        const sortFields: Record<string, TypeOf> = state.sortFields;
        const sortLater:  boolean                = Object.keys(state.sortFields).length === 0 || state.sortByEntity;

        const refTable: R =
        {
            ...refPartial,
            sort: this.getSortFields(sortFields, entity)
        } as R;

        let offset: number = state.offset;

        data[id]   = refTable;
        lookup[id] = entity;
        state.data = data;

        const keys:  Array<string> = sortLater ? Object.keys(data) : this.sort(state);
        const index: number = keys.findIndex((key: string) => key === id)

        if (offset >= index)
        {
            offset += 1;
            list.splice(index, 0, entity);
        }

        return {
            data,
            keys,
            lookup,
            list,
            offset
        };
    }

    public removeData
    (
        state: StateReferenceTableModel<R, T>,
        id:    string

    ): Partial<StateReferenceTableModel<R, T>>
    {
        const data:   Record<string, R> = state.data;
        const keys:   Array<string>     = state.keys;
        const lookup: Record<string, T> = state.lookup;
        const list:   Array<T>          = state.list;
        const index:  number            = keys.findIndex((key: string) => key === id);

        let offset: number = state.offset;

        delete data[id];
        delete lookup[id];

        keys.splice(index, 1);
        list.splice(index, 1);

        if (offset < index)
        {
            offset -= 1;
        }

        return {
            data,
            keys,
            lookup,
            list,
            offset
        };
    }

    public syncData
    (
        state: StateReferenceTableModel<R, T>,
        after: T
    ): Partial<StateReferenceTableModel<R, T>>
    {
        const lookup:    Record<string, T> = state.lookup;
        const data:      Record<string, R> = state.data;
        const id:        string            = after.id;
        const before:    T                 = lookup[id];
        const refTable:  R                 = data[id] == null ? {} as R : data[id];
        const sortField: string            = state.sortField;

        let list: Array<T> = state.list;

        lookup[id] = after;

        refTable.sort =
        {
            ...(refTable.sort == null ? {} : refTable.sort),
            ...this.getSortFields(state.sortFields, after)
        };

        if (CoreUtil.deepValue(sortField, before) !== CoreUtil.deepValue(sortField, after))
        {
            list = this.sort(state).map((key: string) => lookup[key]);
        }
        else
        {
            const index: number = list.findIndex((item: T) => item.id === id);

            if (index >= 0)
            {
                list[index] = after;
            }
        }

        return {
            list,
            data,
            lookup
        };
    }
}
