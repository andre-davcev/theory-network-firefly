import {MobileConfiguration} from '../mobile/theory.mobile.configuration';

export class TNPage
{
    protected configuration:MobileConfiguration;
    protected dictionary:Object = {};
    protected key:string;

    constructor(configuration:MobileConfiguration, key?:string)
    {
        this.configuration = configuration;
        this.key           = key;
    }

    onPageLoaded()
    {
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
