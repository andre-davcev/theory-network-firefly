import { Observable, from, combineLatest, forkJoin } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { Model } from '@theory/firebase';
import { map, take, switchMap } from 'rxjs/operators';
import { MergeType } from '../enums';
import { FormGroup } from '@angular/forms';

export class ServiceBase<T extends Model>
{
    private _name: string;
    private _collection: AngularFirestoreCollection<T>;
    private _firestore: AngularFirestore

    constructor(name: string, firestore: AngularFirestore)
    {
        this.name       = name;
        this.firestore  = firestore;
        this.collection = firestore.collection<T>(this.name);
    }

    public document(id: string): AngularFirestoreDocument<T>
    {
        return this.collection.doc(id);
    }

    public set(object: T): Observable<void>
    {
        return from(this.document(object.id).set(object));
    }

    public patch(id: string, partial: Partial<T>): Observable<void>
    {
        return from(this.document(id).update(partial));
    }

    public foreignKeyUpdate(id: string, name: string, key: string, mergeType: MergeType = MergeType.Add): Observable<void>
    {
        return this.foreignKeysUpdate(id, name, {[key]: key}, mergeType);
    }

    public foreignKeysUpdate(id: string, name: string, keys: Record<string, string>, mergeType: MergeType = MergeType.Add): Observable<void>
    {
        return this.valuesChanges(id).pipe
        (
            take(1),
            map((object: T) =>
            {
                let collection: Record<string, string> = object[name];

                if (mergeType === MergeType.Remove)
                {
                    Object.keys(keys).forEach((key: string) => delete collection[key]);
                }
                else if (mergeType === MergeType.Add)
                {
                    collection =
                    {
                        ...collection,
                        ...keys
                    };
                }
                else if (mergeType === MergeType.Replace)
                {
                    collection = keys;
                }

                return {
                    ...object,
                    [name]: collection
                };
            }),
            switchMap((object: T) =>
              this.patch(id, { [name]: object[name] } as Partial<T>)
            )
        );
    }

    public create(object: T): Observable<T>
    {
        object.id = this.firestore.createId();

        return this.set(object).pipe
        (
            map(() => object)
        );
    }

    public delete(object: T): Observable<void>
    {
        return from(this.document(object.id).delete());
    }

    public valuesChanges(id: string): Observable<T>
    {
        return this.document(id).valueChanges();
    }

    public snapshotFK(keys: Record<string, string> | Array<string>): Observable<Array<T>>
    {
        keys = keys instanceof Array ? keys : Object.keys(keys);

        const streams$: Array<Observable<T>> = keys.map((id: string) => this.valuesChanges(id).pipe(take(1)));

        return forkJoin(streams$);
    }

    public valuesChangesFK(keys: Record<string, string> | Array<string>): Observable<Array<T>>
    {
        keys = keys instanceof Array ? keys : Object.keys(keys);

        const streams$: Array<Observable<T>> = keys.map((id: string) => this.valuesChanges(id));

        return combineLatest(streams$);
    }

    public keysAreEqual(a: Record<string, string> | Array<string>, b: Record<string, string> | Array<string>): boolean
    {
        const isArray: boolean = a instanceof Array;

        a = a == null ? (isArray ? [] : {}) : a;
        b = b == null ? (isArray ? [] : {}) : b;

        const arrayA: Array<string> = isArray ? a as Array<string> : Object.keys(a);

        const mapB: Record<string, string> = !isArray ?
            b as Record<string, string> :
            (b as Array<string>).reduce((record, key) => record[key] = key, {});

        let equal: boolean = arrayA.length !== Object.keys(mapB).length;

        if (equal)
        {
            arrayA.forEach((key: string) => equal = equal && mapB[key] != null);
        }

        return equal;
    }

    public snapshotChanges(id: string): Observable<Action<DocumentSnapshot<T>>>
    {
        return this.document(id).snapshotChanges();
    }

    public clone(object: T): T
    {
        return JSON.parse(JSON.stringify(object));
    }

    public patchValue(form: FormGroup, key: string, value: any): void
    {
        form.controls[key].patchValue(value);
    }

    public get name(): string
    {
        return this._name;
    }

    public set name(name: string)
    {
        this._name = name;
    }

    protected get collection(): AngularFirestoreCollection<T>
    {
        return this._collection;
    }

    protected set collection(collection: AngularFirestoreCollection<T>)
    {
        this._collection = collection;
    }

    protected get firestore(): AngularFirestore
    {
        return this._firestore;
    }

    protected set firestore(firestore: AngularFirestore)
    {
        this._firestore = firestore;
    }
}
