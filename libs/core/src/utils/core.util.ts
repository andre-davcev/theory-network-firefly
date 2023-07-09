export class CoreUtil {
  public static clone<T>(object: any): T {
    return JSON.parse(JSON.stringify(object));
  }

  public static deepValue(key: string, object: Record<string, any>): any {
    let value = object;

    key
      .split('.')
      .forEach((k: string) => (value = value == null ? undefined : value[k]));

    return value;
  }

  public static page<T>(
    sourceList: Array<T>,
    pagedList: Array<any>,
    pageSize: number,
    page: number
  ): Array<T> {
    const difference: number = sourceList.length - pagedList.length;

    let slice: Array<T> = [];

    if (difference > 0) {
      const count: number = difference > pageSize ? pageSize : difference;
      const start: number = page * pageSize;
      const end: number = start + count;

      slice = sourceList.slice(start, end);
    }

    return slice;
  }
}
