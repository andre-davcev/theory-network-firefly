import { ReferenceTable, StateReferenceTableModel } from '../interfaces';
import { TypeOf } from '@theory/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Default } from '../enums';
import { ServiceBase } from '@theory/firebase';
import { take, tap, switchMap, map } from 'rxjs/operators';

export class StateReferenceTable<R extends ReferenceTable, T, S extends StateReferenceTableModel<R, T>>
{
    public sortFields(sortFields: Record<string, TypeOf>, data: T): Record<string, any>
    {
        return Object.
            keys(sortFields).
            reduce((sort: Record<string, any>, key: string) =>
                sort[key] = data[key]
            , {});
    }

    public sort(data: Record<string, R>, name: string, ascending: boolean, type: TypeOf): Array<string>
    {
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
                    a = (a as string).toLowerCase();
                    b = (b as string).toLowerCase();
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

    public page
    (
        service:  ServiceBase<T>,
        keys:     Array<string>,
        lookup:   Record<string, T>,
        list:     Array<T>,
        pageSize: number,
        offset:   number
    ): Observable<Partial<S>>
    {
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
        id:            string,
        event:         T,
        refTable:      R,
        data:          Record<string, R>,
        keys:          Array<string>,
        lookup:        Record<string, T>,
        list:          Array<T>,
        offset:        number,
        sortField:     string,
        sortAscending: boolean,
        sortType:      TypeOf
    ): Partial<StateReferenceTableModel<R, T>>
    {
        data[id]   = refTable;
        lookup[id] = event;

        keys = this.sort(data, sortField, sortAscending, sortType);
        const index: number = keys.findIndex((key: string) => key === id)

        if (offset >= index)
        {
            offset += 1;
            list.splice(index, 0, event);
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
        id:       string,
        data:     Record<string, R>,
        keys:     Array<string>,
        lookup:   Record<string, T>,
        list:     Array<T>,
        offset:   number
    ): Partial<StateReferenceTableModel<R, T>>
    {
        const index: number = keys.findIndex((key: string) => key === id);

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
}
