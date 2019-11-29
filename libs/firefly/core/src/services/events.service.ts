
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Event } from '@firefly/core/models';
import { ServiceFirestore } from '@theory/firebase';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DateUtil, ValidatorsExtended } from '@theory/core';

@Injectable({ providedIn: 'root' })
export class ServiceEvents extends ServiceFirestore<Event>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder
    )
    {
        super(firestore, formBuilder);
    }

    private static validateTime(): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            const form: FormGroup = control.parent as FormGroup;

            let valid: boolean = false;

            if (form != null)
            {
                const start: string    = form.get('timeStart').value;
                const end:   string    = form.get('timeEnd').value;

                if (start != null && end != null)
                {
                    const timeStart: Date = new Date(start);
                    const timeEnd:   Date = new Date(end);

                    valid = timeEnd.getTime() > timeStart.getTime();
                }
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

    public formDataNew(userId: string, defaults: Event): Event
    {
        const now: Date = DateUtil.now();

        const event: Event =
        {
            ...super.formDataNew(userId, defaults),

            timeStart: DateUtil.atHourStart(now).toISOString(),
            timeEnd:   DateUtil.atHourNext(now).toISOString()
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

            tagline       : [event.tagline,       [Validators.required, ValidatorsExtended.minLength(1)]],
            bucketPath    : [event.bucketPath,    [ServiceEvents.validateImage()]],
            coordinates   : [event.coordinates,   Validators.required],
            locationTypes : [event.locationTypes, Validators.required],
            timeStart     : [event.timeStart,     [ServiceEvents.validateTime()]],
            timeEnd       : [event.timeEnd,       [ServiceEvents.validateTime()]]
        });
    }
}
