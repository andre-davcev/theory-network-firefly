import { NgModule } from '@angular/core';

// xplat
import { UIModule } from '@theory/ionic';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

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
