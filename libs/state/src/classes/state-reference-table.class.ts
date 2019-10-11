import { ReferenceTable, StateReferenceTableModel } from '../interfaces';
import { TypeOf } from '@theory/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Default } from '../enums';
import { ServiceBase, Model } from '@theory/firebase';
import { take, tap, switchMap, map } from 'rxjs/operators';

export class StateReferenceTable<R extends ReferenceTable, T extends Model, S extends StateReferenceTableModel<R, T>>
{
    public getSortFields(sortFields: Record<string, TypeOf>, data: T): Record<string, any>
    {
        return Object.
            keys(sortFields).
            reduce((sort: Record<string, any>, key: string) =>
                sort[key] = data[key]
            , {});
    }

    public sort(state: StateReferenceTableModel<R, T>): Array<string>
    {
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
                a = data[keyA].sort[name];
                b = data[keyB].sort[name];
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

    public page(state: StateReferenceTableModel<R, T>, service: ServiceBase<T>): Observable<Partial<S>>
    {
        const keys:     Array<string>     = state.keys;
        const lookup:   Record<string, T> = state.lookup;
        const list:     Array<T>          = state.list;
        const pageSize: number            = state.pageSize;
        const offset:   number            = state.offset;

        const length: number = keys.length;

        let end: number = length;

        if (pageSize !== Default.None)
        {
            end = (offset + pageSize) > length ? length : (offset + pageSize);
        }

        end -= 1;

        return offset >= length ?
            of({}) :
            of(keys.slice(offset, end)).
            pipe
            (
                map((slice: Array<string>) =>
                    slice.map((id: string) =>
                        lookup[id] != null ?
                        of(lookup[id]) :
                        (service.valuesChanges(id) as Observable<T>).
                        pipe
                        (
                            take(1),
                            tap((object: T) => lookup[id] = object)
                        )
                    )
                ),
                switchMap((slice$: Array<Observable<T>>) =>
                    forkJoin(slice$)
                ),
                tap((slice: Array<T>) =>
                    ({
                        list:
                        [
                            ...list,
                            ...slice
                        ],

                        lookup,

                        offset: end + 1
                    })
                )
            );
    }

    public addData
    (
        state:      StateReferenceTableModel<R, T>,
        entity:     T,
        refPartial: Partial<R> = {}
    ): Partial<StateReferenceTableModel<R, T>>
    {
        const id:     string                     = entity.id;
        const data:   Record<string, R>          = state.data;
        const lookup: Record<string, T>          = state.lookup;
        const list:   Array<T>                   = state.list;
        const sortFields: Record<string, TypeOf> = state.sortFields;

        const refTable: R =
        {
            ...refPartial,
            sort: this.getSortFields(sortFields, entity)
        } as R;

        let offset: number = state.offset;

        data[id]   = refTable;
        lookup[id] = entity;
        state.data = data;

        const keys:  Array<string> = this.sort(state);
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
        const sortField: string            = state.sortField;
        const before:    T                 = lookup[after.id];

        const id: string = after.id;

        let list: Array<T> = state.list;
        lookup[id] = after;

        data[id] =
        {
            ...data[id],
            [sortField]: after[sortField]
        };

        state.data = data;

        if (before[sortField] !== after[sortField])
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
