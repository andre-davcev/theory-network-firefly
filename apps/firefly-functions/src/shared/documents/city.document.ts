
import { FirebaseDocument, CityInfo } from '../../library/interfaces';

export interface City extends FirebaseDocument, CityInfo
{
    nearby: Record<string, number>;
}
