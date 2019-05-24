export interface NgxsForm
{
    value:  any;
    errors: Record<string, string> | null;
    dirty:  boolean | null;
    status: string | null;
    path:   string;
}
