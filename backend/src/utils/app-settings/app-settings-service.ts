import 'dotenv/config';
import AppSettingsModel from './models/app-settings-model';

export default class AppSettingsService{

    private static _instance: AppSettingsService;
    private _appSettings: AppSettingsModel;

    constructor(){
        this._appSettings =  this._buildAppSettings();
    }

    static getInstace() : AppSettingsService{
        if(this._instance)            
            return this._instance;
            
        this._instance = new AppSettingsService();

        return this._instance;
    }

    public getAppSettings(): AppSettingsModel{
           return this._appSettings;
    }

    private _buildAppSettings(){
        const rawAppSettings = process.env.APP_SETTINGS;
        
        const appSettings = rawAppSettings? JSON.parse(rawAppSettings) as AppSettingsModel : null;

        if(!appSettings)
            throw new Error('Erro ao ler os AppSettings');

        return appSettings;
    }
}