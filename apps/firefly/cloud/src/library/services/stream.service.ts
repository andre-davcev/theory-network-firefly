import { StreamVariable } from '../enums';

export class ServiceStreams
{
    /**
     * ((t - d)/t)^4
     *
     * @param distance
     */
    public static cityDistanceScore(distance: number): number
    {
        return distance >= StreamVariable.DistanceThreshold ?
            0 :
            Math.pow((StreamVariable.DistanceThreshold - distance) / StreamVariable.DistanceThreshold, StreamVariable.DistanceScorePower);
    }
}
