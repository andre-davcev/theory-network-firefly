import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Alert } from '@firefly/core/models';
import { ServiceBase, ServiceAsset } from '@theory/firebase';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({ providedIn: 'root' })
export class ServiceAlerts extends ServiceAsset<Alert>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage,
        webview:     WebView
    )
    {
        super('alerts', firestore, formBuilder, storage, webview);
    }

    public formCreate(object: Alert): FormGroup
    {
        return super.formCreate(
        {
            ...object
        });
    }
}

