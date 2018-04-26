import {Component} from '@angular/core';
import {ViewChild} from '@angular/core';

import {MenuController} from 'ionic-angular';
import {NavController}  from 'ionic-angular';
import {Slides}         from 'ionic-angular';
import {IonicPage}      from 'ionic-angular';

import {Storage} from '@ionic/storage';

import {PageTabs} from '../tabs/tabs';

@IonicPage()
@Component
({
    selector    : 'app-page-tutorial',
    templateUrl : 'tutorial.html'
})

export class PageTutorial
{
    public showSkip = true;

    @ViewChild('slides')
    slides: Slides;

    constructor(public navCtrl: NavController, public menu: MenuController, public storage: Storage)
    {

    }

    startApp()
    {
        this.navCtrl.push(PageTabs).then(() =>
        {
            this.storage.set('hasSeenTutorial', 'true');
        });
    }

    onSlideChangeStart(slider: Slides)
    {
        this.showSkip = !slider.isEnd();
    }

    ionViewWillEnter()
    {
        this.slides.update();
    }

    ionViewDidEnter()
    {
        this.menu.enable(false);
    }

    ionViewDidLeave()
    {
        this.menu.enable(true);
    }
}
