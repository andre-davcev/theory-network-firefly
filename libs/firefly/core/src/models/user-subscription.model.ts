import { ReferenceTable } from '@theory/state';

export interface UserSubscription extends ReferenceTable
{
    on: boolean;
}
