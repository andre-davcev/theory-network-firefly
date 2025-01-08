import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import {
  ActionEventsTagSet,
  Colors,
  StateEvents,
  StateTags,
  StateUser,
  TagEvent
} from '@firefly/shared';
import { BaseComponent } from '@theory/core';

import { Style } from '@capacitor/status-bar';
import { ActionDeviceStatusBarSet, StateLocation } from '@theory/capacitor';

import { Tag } from '@theory/ionic';
import { ActionMobileAuthSelect, StateMobile } from '../../state';

@Component({
  selector: 'app-page-events',
  templateUrl: 'events.page.html',
  styleUrls: ['./events.page.scss']
})
export class PageEvents extends BaseComponent {
  @Select(StateUser.isUser) isUser$!: Observable<boolean>;
  @Select(StateMobile.menuOpen) menuOpen$!: Observable<boolean>;
  @Select(StateLocation.permissionDenied) locationDenied$!: Observable<boolean>;
  @Select(StateTags.tagsEvents) tagsEvents$!: Observable<Array<Tag<TagEvent>>>;
  @Select(StateEvents.tagIndex) tagIndex$!: Observable<number>;

  public Colors = Colors;

  constructor(private store: Store, private menu: MenuController) {
    super();
  }

  public ionViewWillEnter(): void {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));
  }

  public menuOpen(): void {
    this.isUser$
      .pipe(
        take(1),
        switchMap((isUser: boolean) =>
          isUser
            ? from(this.menu.open())
            : this.store.dispatch(new ActionMobileAuthSelect())
        )
      )
      .subscribe();
  }

  public chipSelected(tag: Tag<TagEvent>): void {
    this.store.dispatch(new ActionEventsTagSet(tag));
  }
}
