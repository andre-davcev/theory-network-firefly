export class DateUtil {
  public static now(): Date {
    return new Date();
  }

  public static atHourStart(date = DateUtil.now()): Date {
    date.setMinutes(0, 0, 0);

    return date;
  }

  public static atHourNext(
    date: Date = DateUtil.now(),
    hours: number = 1
  ): Date {
    date.setHours(date.getHours() + hours, 0, 0, 0);

    return date;
  }
}
