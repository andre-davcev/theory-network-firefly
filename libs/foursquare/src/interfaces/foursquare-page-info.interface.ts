export interface FoursquarePageInfo
{
    description: string;
    banner: string;
    links: {count: number; items: Array<{url: string;}>};
}
