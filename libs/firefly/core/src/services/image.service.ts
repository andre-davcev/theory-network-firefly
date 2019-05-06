import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { ServiceMedia } from './media.service';
import { Image } from '../models';
import { ServiceUser } from './user.service';

@Injectable({ providedIn: 'root' })
export class ServiceImage extends ServiceMedia<Image>
{
    constructor
    (
        firestore: AngularFirestore,
        storage:   AngularFireStorage,
        user:      ServiceUser
    )
    {
        super('images', firestore, storage, user);
    }
}
