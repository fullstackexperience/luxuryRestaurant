import Knex from 'knex';
import AppSettingsService from '../utils/app-settings/app-settings-service';
import AppSettingsModel from '../utils/app-settings/models/app-settings-model';


export default class DataBaseContext{

    public readonly knexContext;
    private static _instace: DataBaseContext;
    private _appSettings: AppSettingsModel | null;


    constructor(){
        this._appSettings =  AppSettingsService.getInstace().getAppSettings();
        this.knexContext = this._buildKnexConnection();
    }

    static getInstace() : DataBaseContext{
        if(this._instace)            
            return this._instace;
            
        this._instace = new DataBaseContext();

        return this._instace;
    }

    private _buildKnexConnection(): any{
        return Knex({
            client: this._appSettings?.DataBaseConfiguration.Client,
            connection: this._buildConnection()
        });
    }

    private _buildConnection(){
       return {
            password: this._appSettings?.DataBaseConfiguration.Password,
            database: this._appSettings?.DataBaseConfiguration.DataBase,
            options: {
                encrypt: this._appSettings?.DataBaseConfiguration.Options.Encrypt,
                port: this._appSettings?.DataBaseConfiguration.Options.Port,
                trustServerCertificate: this._appSettings?.DataBaseConfiguration.Options.TrustServerCertificate
            },
            user: this._appSettings?.DataBaseConfiguration.User,
            server: this._appSettings?.DataBaseConfiguration.Server
        };
    }
}