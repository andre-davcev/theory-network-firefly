export class CoreUtil
{
    public static clone<T>(object: any): T
    {
        return JSON.parse(JSON.stringify(object));
    }
}
