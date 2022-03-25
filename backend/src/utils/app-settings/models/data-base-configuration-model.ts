export interface DataBaseConfigurationModel{
    User: string;
    Password: string;
    DataBase: string;
    Server: string;
    Options: DataBaseConfigurationOptionsModel;
    Client: string;
}

interface DataBaseConfigurationOptionsModel{
    Encrypt: boolean;
    InstanceName: string;
    Port: number;
    TrustServerCertificate: boolean;
}

