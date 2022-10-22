
import { FirebaseDocument, CityInfo } from '../interfaces';

export interface City extends FirebaseDocument, CityInfo
{
    nearby: Record<string, number>;
}
