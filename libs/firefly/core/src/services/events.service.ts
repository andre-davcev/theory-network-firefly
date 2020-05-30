
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Event } from '@firefly/cloud';
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

    private static validateTimeNotify(): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            const value: string = control.value;

            let valid: boolean = false;

            if (value != null)
            {
                const timeNotify: Date = new Date(value);
                const threshold:  Date = DateUtil.atHourNext(new Date(), 2);

                valid = timeNotify.getTime() >= threshold.getTime();
            }

            return valid ? null : { timeNotifyInvalid: true };
        };

        return validator;
    }

    public formDataNew(userId: string, defaults: Event): Event
    {
        const event: Event =
        {
            ...super.formDataNew(userId, defaults),

            timeStart:  DateUtil.atHourNext().toISOString(),
            timeEnd:    DateUtil.atHourNext(new Date(), 2).toISOString(),
            timeNotify: DateUtil.atHourNext(new Date(), 2).toISOString()
        };

        return event;
    }

    public formCreate(event: Event): FormGroup
    {
        //temporary
        if(!event.metadata)
        {
          event.metadata = {
            icon : '',
            image : ''
          }
        }

        return super.formCreate
        ({
            ...event,

            description : [event.description,    [Validators.required, ValidatorsExtended.minLength(1)]],
            geopoint    : [event.geopoint,       [Validators.required]],
            interests   : [event.interests,      []],
            name        : [event.name,           [Validators.required, ValidatorsExtended.minLength(1)]],
            tagline     : [event.tagline,        [Validators.required, ValidatorsExtended.minLength(1)]],
            timeStart   : [event.timeStart,      [ServiceEvents.validateTime()]],
            timeEnd     : [event.timeEnd,        [ServiceEvents.validateTime()]],
            timeNotify  : [event.timeNotify,     [ServiceEvents.validateTimeNotify()]],

            metadata : this.formBuilder.group
            ({
                icon  : [event.metadata.icon,  [Validators.required]],
                image : [event.metadata.image, [Validators.required]]
            })
        });
    }
}
