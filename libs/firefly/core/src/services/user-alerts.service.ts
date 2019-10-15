import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

import { Alert, UserAlert } from '@firefly/core/models';
import { MockAlerts } from '@firefly/core/mocks';
import { ServiceAsset } from '@theory/firebase';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Injectable({ providedIn: 'root' })
export class ServiceUserAlerts extends ServiceAsset<Record<string, UserAlert>>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage,
        webview:     WebView
    )
    {
        super('user-alerts', firestore, formBuilder, storage, webview, true);
    }

    public getMock(uid: string): Observable<Array<Alert>>
    {
        return of(MockAlerts);
    }
}
