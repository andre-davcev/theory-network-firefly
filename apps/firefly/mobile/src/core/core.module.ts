import {NgModule}               from '@angular/core';
import {AngularFireAuthModule}  from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';

@NgModule
({
    imports :
    [
        AngularFireAuthModule,
        AngularFirestoreModule
    ],

    providers: []
})

export class CoreModule
{ 

}