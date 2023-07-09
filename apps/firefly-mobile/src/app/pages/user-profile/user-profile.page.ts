import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Style } from '@capacitor/status-bar';
import { MenuController } from '@ionic/angular';

import {
  IconType,
  Color,
  StateUserProfile,
  ActionUserIsPublisherSet,
  StateUser
} from '@firefly/shared';
import { StateMobile } from '@firefly/mobile';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';

@Component({
  selector: 'app-page-user-profile',
  templateUrl: 'user-profile.page.html',
  styleUrls: ['./user-profile.page.scss']
})
export class PageUserProfile {
  @Select(StateUserProfile.formGroup()) form$: Observable<UntypedFormGroup>;
  @Select(StateUser.formGroup()) formUser$: Observable<UntypedFormGroup>;
  @Select(StateUser.email) email$: Observable<string>;
  @Select(StateMobile.menuOpen) menuOpen$: Observable<boolean>;

  public IconType: any = IconType;
  public Color: any = Color;

  constructor(private menu: MenuController, private store: Store) {}

  public ionViewWillEnter(): void {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));
  }

  public menuOpen(): void {
    this.menu.open();
  }
  /*
    public selectIcon(): void
    {

    }
*/
  public toggleIsPublisher(event: any): void {
    const isPublisher: boolean = event.detail.checked;

    this.store.dispatch(new ActionUserIsPublisherSet(isPublisher));
  }
}
