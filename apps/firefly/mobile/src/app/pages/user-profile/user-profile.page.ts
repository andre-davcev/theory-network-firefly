import { Component } from '@angular/core';
import { IconType, Color, StateUserProfile, ActionUserIsPublisherSet } from '@firefly/core';
import { Select, Store } from '@ngxs/store';
import { StateMobile } from '@firefly/mobile';
import { Observable } from 'rxjs';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StatusBarStyle } from '@capacitor/core';
import { MenuController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

@Component
({
    selector    : 'app-page-user-profile',
    templateUrl : 'user-profile.page.html',
    styleUrls   : ['./user-profile.page.scss']
})

export class PageUserProfile
{
    @Select(StateUserProfile.formGroup()) form$:     Observable<FormGroup>
    @Select(StateMobile.menuOpen)         menuOpen$: Observable<boolean>;

    public IconType : any = IconType;
    public Color    : any = Color;

    constructor
    (
        private menu  : MenuController,
        private store : Store
    )
    { }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Light}));
    }

    public menuOpen(): void
    {
        this.menu.open();
    }

    public selectIcon(): void
    {

    }

    public toggleIsPublisher(event: any): void
    {
        const isPublisher: boolean = event.detail.checked;

        this.store.dispatch(new ActionUserIsPublisherSet(isPublisher));
    }
}
