export interface FoursquarePhrase
{
    phrase : string;
    sample : {entities: Array<{indices: Array<number>; type: string;}>; text: string;};
    count  : number;
}
