export class DateUtil
{
    public static now(): Date
    {
        return new Date();
    }

    public static atHourStart(date = DateUtil.now()): Date
    {
        date.setMinutes(0, 0, 0);

        return date;
    }

    public static atHourNext(date = DateUtil.now()): Date
    {
        date.setHours(date.getHours() + 1, 0, 0, 0);

        return date;
    }
}
