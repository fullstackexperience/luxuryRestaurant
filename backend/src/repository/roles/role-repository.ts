import { RoleModel } from "../../database/models/role-model";
import { Mapper } from "../../mapper/mapper";
import { BaseRepository } from "../base-repositoty";

export class RoleRepository extends BaseRepository{
    private _rolesTableName: string  = '[dbo].[luxury_roles]';
    private _userTableName: string  = '[dbo].[luxury_user]';
    private _userRolesTableName: string  = '[dbo].[luxury_user_roles]';

    public async getUserRolesByUserId(userId: string) : Promise<Array<RoleModel>>{
        const result = await this.instaceDataBaseContext.knexContext
        .select(
            `${this._rolesTableName}.Id`,
            `${this._rolesTableName}.Name`
        )
        .from(this._rolesTableName)
        .join(this._userRolesTableName, `${this._userRolesTableName}.RoleId`, `${this._rolesTableName}.Id`)
        .where({UserId: userId});

        return Mapper.mapperList<any, RoleModel>(result, RoleModel);
    }
}