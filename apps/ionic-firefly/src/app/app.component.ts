import { Component } from '@angular/core';

import { isCapacitorNative } from '@ionic/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { AppInitialize } from './state/app/app.actions';
import { Store } from '@ngxs/store';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(private platform: Platform, private store: Store) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (isCapacitorNative(window)) {
        StatusBar.setStyle({
          style: StatusBarStyle.Dark
        });
      }

      this.store.dispatch(new AppInitialize());
    });
  }
}
