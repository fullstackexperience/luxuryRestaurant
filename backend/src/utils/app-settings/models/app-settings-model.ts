import { BcryptModel } from "./bcrypt-model";
import { DataBaseConfigurationModel } from "./data-base-configuration-model";

export default interface AppSettingsModel{
    DataBaseConfiguration: DataBaseConfigurationModel
    Bcrypt: BcryptModel
}