import {MobileConfiguration} from '../config/config.mobile';

export class Page
{
    protected configuration:MobileConfiguration;
    protected dictionary:any = {};
    protected key:string;

    constructor(configuration:MobileConfiguration, key?:string)
    {
        this.configuration = configuration;
        this.key           = key;

        this.configuration.load().subscribe
        (
            (data) =>
            {
                if (this.key != null)
                {
                    this.configuration.dictionary(this.key, this);
                }
            },

            (error) =>
            {
                console.log('error happened');
            }
        )
    }
}
