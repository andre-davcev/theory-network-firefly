import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { UIModule } from '@theory/ionic';

const MODULES = [
  UIModule,
  AngularFireAuthModule,
  AngularFirestoreModule
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES]
})
export class SharedModule {}
