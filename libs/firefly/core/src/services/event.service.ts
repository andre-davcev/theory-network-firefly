
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Event, AssetKey, EventKey, Time, Location } from '@firefly/core/models';
import { ServiceBase } from './base.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DateUtil, CoreEnum, ValidatorsExtended } from '@theory/core';
import { ModelKey } from '@theory/firebase';
import { RepeatType } from '@firefly/core/enums';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { MapboxPlaceType } from '@theory/mapbox';

@Injectable({ providedIn: 'root' })
export class ServiceEvent extends ServiceBase<Event>
{
    constructor
    (
        firestore: AngularFirestore,
        private formBuilder: FormBuilder
    )
    {
        super('events', firestore);
    }

    private _form: FormGroup;

    private static validateTime(): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            const times: Array<Time> = control.value;

            let valid: boolean = false;

            if (times != null && times.length > 0)
            {
                const timeStart: Date = new Date(times[0].start);
                const timeEnd:   Date = new Date(times[0].end);

                valid = timeEnd.getTime() > timeStart.getTime();
            }

            return valid ? null : { timeEndInvalid: true };
        };

        return validator;
    }

    private static validateImage(): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            const url: string = control.value;

            return url != null ? null : { imageUrlInvalid: true };
        };

        return validator;
    }

    public build(userId: string, defaults: Event): Event
    {
        const now: Date = DateUtil.now();

        const event: Event =
        {
            ...this.clone(defaults),
            [ModelKey.Id]: CoreEnum.IdNew,
            [AssetKey.UserId]: userId,
            times:
            [
                {
                    start:      DateUtil.atHourStart(now).toISOString(),
                    end:        DateUtil.atHourNext(now).toISOString(),
                    repeatType: RepeatType.Never
                }
            ]
        };

        return event;
    }

    public formCreate(event: Event): FormGroup
    {
        const form: FormGroup = this.formBuilder.group
        ({
            [ModelKey.Id]          : event[ModelKey.Id],
            [ModelKey.DateCreated] : event[ModelKey.DateCreated],
            [ModelKey.DateUpdated] : event[ModelKey.DateUpdated],

            [AssetKey.UserId]      : event[AssetKey.UserId],
            [AssetKey.Name]        : [event[AssetKey.Name],        [Validators.required, ValidatorsExtended.minLength(1)]],
            [AssetKey.Description] : [event[AssetKey.Description], [Validators.required, ValidatorsExtended.minLength(1)]],
            [AssetKey.Private]     : event[AssetKey.Private],
            [AssetKey.Draft]       : event[AssetKey.Draft],

            [EventKey.Version]   : event[EventKey.Version],
            [EventKey.Tagline]   : [event[EventKey.Tagline], ValidatorsExtended.minLength(1)],
            [EventKey.ImageId]   : [event[EventKey.ImageId], [ServiceEvent.validateImage()]],
            [EventKey.Clusters]  : [event[EventKey.Clusters], ValidatorsExtended.minLength(1)],
            [EventKey.Location]  : [event[EventKey.Location], Validators.required],
            [EventKey.Times]     : [event[EventKey.Times], [ServiceEvent.validateTime()]],
            [EventKey.Url]       : event[EventKey.Url]
        });

        this._form = form;

        return form;
    }

    public timeSet(form: FormGroup, key: EventKey.TimeStart | EventKey.TimeEnd, value: string): void
    {
        const control: AbstractControl = form.controls[EventKey.Times];
        const times: Array<Time>       = control.value;
        const time: Time               = times[0];

        time[key] = value;

        control.patchValue([time]);
//        control.updateValueAndValidity();
    }

    public locationSet(form: FormGroup, result: Result): void
    {
        const location: Location = result == null ? undefined :
        {
            latitude  : result.center[0],
            longitude : result.center[1],
            types     : result.place_type as Array<MapboxPlaceType>
        };

        this.patchValue(form, EventKey.Location, location);
    }

    public get form(): FormGroup
    {
        return this._form;
    }
}
