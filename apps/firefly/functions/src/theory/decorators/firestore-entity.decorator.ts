import { FirestoreEntityOptions } from './firestore-entity.options';

export function FirestoreEntity<T extends {new(...args:any[]):{}}>(options: FirestoreEntityOptions)
{
     return (constructor:T) => {
         return class extends constructor {
             entityKey = options.key;
         }
     };
 }
