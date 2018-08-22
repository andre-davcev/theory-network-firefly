import * as firebase from 'firebase/app';

import { Asset } from './asset.model';

export interface Image extends Asset
{
    url: string;
}
