
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Event, Time, Location } from '@firefly/core/models';
import { ServiceBase } from '@theory/firebase';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DateUtil, ValidatorsExtended } from '@theory/core';
import { RepeatType } from '@firefly/core/enums';
import { Result } from 'ngx-mapbox-gl/lib/control/geocoder-control.directive';
import { MapboxPlaceType } from '@theory/mapbox';
import { firestore as fire } from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class ServiceEvents extends ServiceBase<Event>
{
    constructor
    (
        firestore: AngularFirestore,
        formBuilder: FormBuilder
    )
    {
        super('events', firestore, formBuilder);
    }

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

    public static validateImage(): ValidatorFn
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
            ...super.build(userId, defaults),

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
        return super.formCreate
        ({
            ...event,

            name        : [event.name,        [Validators.required, ValidatorsExtended.minLength(1)]],
            description : [event.description, [Validators.required, ValidatorsExtended.minLength(1)]],

            tagline     : [event.tagline, ValidatorsExtended.minLength(1)],
            imageId     : [event.imageId, [ServiceEvents.validateImage()]],
            coordinates : [event.coordinates, Validators.required],
            location    : [event.location, Validators.required],
            times       : [event.times, [ServiceEvents.validateTime()]],
        });
    }

    public timeSet(form: FormGroup, key: 'start' | 'end', value: string): void
    {
        const control: AbstractControl = form.controls.times;
        const times: Array<Time>       = control.value;
        const time: Time               = times[0];

        time[key] = value;

        control.patchValue([time]);
//        control.updateValueAndValidity();
    }

    public locationSet(form: FormGroup, result: Result): void
    {
        const types: Array<MapboxPlaceType> = result.place_type as Array<MapboxPlaceType>;

        let coordinates: fire.GeoPoint;
        let location:    Location;

        if (result != null)
        {
            coordinates = new fire.GeoPoint(result.center[0], result.center[1]);
            location    = { types };
        }

        this.patchValue(form, 'coordinates', coordinates);
        this.patchValue(form, 'location',    location);
    }

    public imageIdSet(form: FormGroup, imageId: string): void
    {
        this.patchValue(form, 'imageId', imageId);
    }
}
