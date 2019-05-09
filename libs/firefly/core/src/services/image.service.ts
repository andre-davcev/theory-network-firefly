import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { ServiceMedia } from './media.service';
import { Image } from '../models';
import { ServiceUser } from './user.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Injectable({ providedIn: 'root' })
export class ServiceImage extends ServiceMedia<Image>
{
    constructor
    (
        firestore: AngularFirestore,
        storage:   AngularFireStorage,
        user:      ServiceUser,
        webview:   WebView
    )
    {
        super('images', firestore, storage, user, webview);
    }
}
