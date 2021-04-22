import { Component, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { StatusBarStyle } from '@capacitor/core';

import { StateUser, Color, IconType, AuthType } from '@firefly/core';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { Pages } from '@firefly/mobile';
import { FirebaseError } from '@theory/firebase';

@Component
({
    selector    : 'app-page-login',
    templateUrl : 'login.page.html',
    styleUrls   : ['./login.page.scss']
})

export class PageLogin
{
    @Select(StateUser.authenticating) authenticating$ : Observable<boolean>;
    @Select(StateUser.errorAuth)      error$          : Observable<FirebaseError>;

    @Input() page: Pages.Login | Pages.SignUp | Pages.ResetPassword | Pages.SignUpSlides = Pages.Login;

    public Pages    : any = Pages;
    public Color    : any = Color;
    public IconType : any = IconType;
    public AuthType : any = AuthType;

    constructor
    (
        private store : Store,
        private modal : ModalController
    ) { }

    public ionViewWillEnter(): void
    {
        this.store.dispatch(new ActionDeviceStatusBarSet({style: StatusBarStyle.Dark}));
    }

    public finishedAuth(successful: boolean): void
    {
        if (successful)
        {
            if (this.page === Pages.Login || this.page === Pages.ResetPassword)
            {
                this.close();
            }
            else
            {
                this.page = Pages.SignUpSlides;
            }
        }
    }

    public close(): void
    {
        this.modal.dismiss();
    }
}
