import {OnDestroy}     from '@angular/core';
import {OnChanges}     from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {Input}         from '@angular/core';
import {HostBinding}   from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

export class ComponentApp implements OnChanges, OnDestroy
{
    @HostBinding('class')
    @Input()
    public class: string;

    private _classPrefix = 'app-';
    public classes: { [id: string]: string } = {};

    private _subscriptions: Array<Subscription> = [];

    constructor()
    {

    }

    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes.class)
        {
            if (changes.class.firstChange && changes.class.currentValue != null)
            {
                this.classesAdd(changes.class.currentValue.trim().split(' '));
            }
        }
    }

    ngOnDestroy()
    {
        for (const subscription of this._subscriptions)
        {
            subscription.unsubscribe();
        }
    }

    public subscriptionsAdd(...subscriptions: Array<Subscription>)
    {
        this._subscriptions.concat(subscriptions);
    }

    public getClass(className: string)
    {
        return `${this._classPrefix}${className}`;
    }

    public classesAdd(...classes: Array<string>): void {
        for (const elementClass of classes) {
          if (elementClass != null) {
            this.classes[elementClass] = '';
          }
        }

        this.classesRender();
    }

    public classesRemove(...classes: Array<string>): void
    {
        for (const elementClass of classes)
        {
            if (elementClass != null)
            {
                delete this.classes[elementClass];
            }
        }

        this.classesRender();
    }

    private classesRender()
    {
        this.class = Object.keys(this.classes).join(' ');
    }

    get classPrefix(): string
    {
        return this._classPrefix;
    }

    set classPrefix(classPrefix: string)
    {
        this._classPrefix = classPrefix;
    }
}
