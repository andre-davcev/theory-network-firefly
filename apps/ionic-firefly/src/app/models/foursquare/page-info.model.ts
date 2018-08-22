export interface PageInfo
{
    description: string;
    banner: string;
    links: {count: number; items: Array<{url: string;}>};
}
