import { UserRolesModel } from "../../database/models/user-roles-model";
import { BaseRepository } from "../base-repositoty";

export class UserRolesRepository extends BaseRepository{
    private _userRolesTableName: string  = '[dbo].[luxury_user_roles]';

    public async insertUserRoleAsync(user: Array<UserRolesModel>){
        await this.insertAsync(user, this._userRolesTableName);
    }

    public async getUserRolesByUserIdAsync(userId: string) : Promise<Array<UserRolesModel>>{
        const rawUserRoles = await this.instaceDataBaseContext.knexContext
        .select()
        .from(this._userRolesTableName)
        .where({UserId: userId? userId : ''});

        return rawUserRoles as Array<UserRolesModel>;
    }
}