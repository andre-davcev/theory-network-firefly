import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ServiceAsset } from '@theory/firebase';
import { IconCluster } from '@firefly/core/models';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Injectable({ providedIn: 'root' })
export class ServiceIconClusters extends ServiceAsset<Record<string, IconCluster>>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage,
        webview:     WebView
    )
    {
        super('icon-clusters', firestore, formBuilder, storage, webview, true);
    }
}
