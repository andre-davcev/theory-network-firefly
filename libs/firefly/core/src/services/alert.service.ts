import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Alert } from '@firefly/core/models';
import { ServiceBase } from '@theory/firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsExtended } from '@theory/core';
import { ServiceEvents } from './events.service';


@Injectable({ providedIn: 'root' })
export class ServiceAlerts extends ServiceBase<Alert>
{
    constructor(firestore: AngularFirestore, formBuilder: FormBuilder)
    {
        super('alerts', firestore, formBuilder);
    }
}

