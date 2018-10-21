import { FormGroup } from '@angular/forms';

export abstract class FormGenerator<T>
{
    public build(model?: T): FormGroup
    {
        return this.buildFrom(model == null ? this.empty() : model);
    }

    protected abstract empty(): T;

    protected abstract buildFrom(model: T): FormGroup;
}
