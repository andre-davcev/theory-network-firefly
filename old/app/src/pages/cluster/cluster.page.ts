import {Component, AfterViewInit} from '@angular/core';

import {IonicPage} from 'ionic-angular';

import {Page} from '../page';
import { FormGroup } from '@angular/forms';

@IonicPage()
@Component
({
    selector    : 'app-page-cluster',
    templateUrl : 'cluster.page.html'
})

export class PagePublisherCluster extends Page implements AfterViewInit
{
    segment:string = 'clusters';

    constructor()
    {
        super();
    }

    public formHeader(formHeader: FormGroup): void
    {
        console.log(formHeader);
    }

    public ngAfterViewInit(): void
    {
        console.log('ngAfterViewInit');
/*
        this.form.addControl('childForm', this.childComponent.form);
  this.childComponent.form.setParent(this.form);
*/
    }
}