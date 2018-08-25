import {Component} from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar';
import { Select, Store } from '@ngxs/store';
import { StateIcons } from '../../state/icons/icons.state';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { SetIconId } from '../../state/icons/icons.actions';

@Component
({
    selector    : 'app-page-assets-icon',
    templateUrl : 'assets-icon.page.html',
    styleUrls   : ['./assets-icon.page.scss']
})

export class PageAssetsIcon
{
    @Select(StateIcons.form) form$: Observable<FormGroup>;

    constructor(private store: Store, private statusBar: StatusBar)
    {
        this.store.dispatch(new SetIconId('new'));
    }

    ionViewWillEnter()
    {
        this.statusBar.styleDefault();
    }
}
