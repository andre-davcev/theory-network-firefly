export class ServiceStorage
{
    public static bucketPaths(bucketPath: string, includeMedium: boolean = true): Array<string>
    {
        const segments:   Array<string> = bucketPath.split('/');
        const fileName:   string        = segments.pop();
        const fileParts:  Array<string> = fileName.split('.');

        const bucketPaths: Array<string> = ['small', 'medium'].
            filter((size: string) =>
                size !== 'medium' || includeMedium
            ).
            map((size: string) =>
                ([
                    ...segments,
                    `${fileParts[0]}@${size}.${fileParts[1]}`
                ].join('/'))
            );

        bucketPaths.push(bucketPath);

        return bucketPaths;
    }
}
