import {Input}         from '@angular/core';
import {OnChanges}     from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {Component}     from '@angular/core';
import {ElementRef}    from '@angular/core';
import {Renderer}      from '@angular/core';
import {HostListener}  from '@angular/core';

import {PopoverController} from 'ionic-angular';

import {TNComponent}         from '../component';
import {TNRatingPopoverPage} from './rating.popover';

/**
 * @name TNRating
 * @description
 */

@Component
({
    selector : 'tn-rating',
    
    template :
    `
    <ion-icon class="tn-star" name="star" *ngIf="stars[0]"></ion-icon>
    <ion-icon class="tn-star-half" name="star-half" *ngIf="halfs[0]"></ion-icon>
    <ion-icon class="tn-star-outline" name="star-outline"></ion-icon>

    <ion-icon class="tn-star" name="star" *ngIf="stars[1]"></ion-icon>
    <ion-icon class="tn-star-half" name="star-half" *ngIf="halfs[1]"></ion-icon>
    <ion-icon class="tn-star-outline" name="star-outline"></ion-icon>

    <ion-icon class="tn-star" name="star" *ngIf="stars[2]"></ion-icon>
    <ion-icon class="tn-star-half" name="star-half" *ngIf="halfs[2]"></ion-icon>
    <ion-icon class="tn-star-outline" name="star-outline"></ion-icon>

    <ion-icon class="tn-star" name="star" *ngIf="stars[3]"></ion-icon>
    <ion-icon class="tn-star-half" name="star-half" *ngIf="halfs[3]"></ion-icon>
    <ion-icon class="tn-star-outline" name="star-outline"></ion-icon>

    <ion-icon class="tn-star" name="star" *ngIf="stars[4]"></ion-icon>
    <ion-icon class="tn-star-half" name="star-half" *ngIf="halfs[4]"></ion-icon>
    <ion-icon class="tn-star-outline" name="star-outline"></ion-icon>

    <label class="tn-count" *ngIf="ratingCount != null">{{ratingCount}}</label>
    `
})


export class TNRating extends TNComponent implements OnChanges
{
    @Input()
    protected rating:number;

    @Input()
    protected ratingCount:number;

    @Input()
    protected ratingUser:number;

    @Input()
    protected edit:boolean = false;

    protected stars:Array<boolean> =
    [
        false,
        false,
        false,
        false,
        false
    ];

    protected halfs:Array<boolean> =
    [
        false,
        false,
        false,
        false,
        false
    ];

    constructor(elementRef:ElementRef, renderer: Renderer, protected popoverController:PopoverController)
    {
        super
        ({
            elementRef : elementRef,
            renderer   : renderer,
            component  : 'rating'
        });
    }

    ngOnChanges(changes: SimpleChanges)
    {
        let rating = changes['rating'] == null ? 0 : changes['rating'].currentValue;

        this.changeRating(rating);
    }

    protected changeRating(rating:number)
    {
        let stars:Array<boolean> = this.stars;
        let halfs:Array<boolean> = this.halfs;

        if (rating < 0)
        {
            rating = 0;
        }
        else if (rating > 5)
        {
            rating = 5;
        }

        for (let i = 0; i < 5; i++)
        {
            if (rating >= (i + 1))
            {
                stars[i] = true;
            }
            else if (rating >= i + 0.5)
            {
                halfs[i] = true;
            }
        }
    }

    @HostListener('click', ['$event'])
    click(event)
    {
        if (this.edit)
        {
            let popover = this.popoverController.create(TNRatingPopoverPage, {rating : this.ratingUser});

            popover.present();
        }
    }
}