import { NgModule } from '@angular/core';

// libs
import { AppIonicCoreModule } from '@theory/ionic';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    AppIonicCoreModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ]
})
export class CoreModule {}
