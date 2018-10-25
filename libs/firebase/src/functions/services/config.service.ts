import { config } from 'firebase-functions';
import { initializeApp, app, firestore } from 'firebase-admin';

export class Config
{
    private _application: app.App;
    private _firestore: firestore.Firestore;

    constructor()
    {
        this.application = initializeApp(config().firebase);
        this.firestore   = firestore();
    }

    public get application(): app.App
    {
        return this._application;
    }

    public set application(application: app.App)
    {
        this._application = application;
    }

    public get firestore(): firestore.Firestore
    {
        return this._firestore;
    }

    public set firestore(database: firestore.Firestore)
    {
        this._firestore = database;
    }
}

