import {Input}         from '@angular/core';
import {OnInit}        from '@angular/core';
import {OnChanges}     from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {Component}     from '@angular/core';
import {ElementRef}    from '@angular/core';
import {Renderer}      from '@angular/core';

import {TNComponent} from '../component';

/**
 * @name TNRating
 * @description
 */

@Component
({
    selector : 'tn-rating',
    
    template :
    `
    <ion-icon name="star-outline"></ion-icon>
    <ion-icon name="star"></ion-icon>
    <ion-icon name="star-half"></ion-icon>

    <ion-icon name="star-outline"></ion-icon>
    <ion-icon name="star"></ion-icon>
    <ion-icon name="star-half"></ion-icon>

    <ion-icon name="star-outline"></ion-icon>
    <ion-icon name="star"></ion-icon>
    <ion-icon name="star-half"></ion-icon>

    <ion-icon name="star-outline"></ion-icon>
    <ion-icon name="star"></ion-icon>
    <ion-icon name="star-half"></ion-icon>

    <ion-icon name="star-outline"></ion-icon>
    <ion-icon name="star"></ion-icon>
    <ion-icon name="star-half"></ion-icon>

    <div>{{ratingCount}}</div>
    `
})

export class TNRating extends TNComponent implements OnInit, OnChanges
{
    @Input()
    protected rating:number;

    @Input()
    protected ratingCount:number;

    constructor(elementRef:ElementRef, renderer: Renderer)
    {
        super
        ({
            elementRef : elementRef,
            renderer   : renderer
        });
    }

    ngOnInit()
    {
        
    }

    ngOnChanges(changes: SimpleChanges)
    {
        if (changes['rating'] != null)
        {
            this.changeRating(changes['rating'].currentValue);
        }
    }

    protected changeRating(rating:number)
    {

    }
}