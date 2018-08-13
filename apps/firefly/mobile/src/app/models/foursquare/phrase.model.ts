export interface Phrase
{
    phrase : string;
    sample : {entities: Array<{indices: Array<number>; type: string;}>; text: string;};
    count  : number;
}
