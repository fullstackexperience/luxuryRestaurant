import { UserModel } from "../../database/models/user-model";
import { Mapper } from "../../mapper/mapper";
import { BaseRepository } from "../base-repositoty";

export class UserRepository extends BaseRepository{
    private _userTableName: string  = '[dbo].[luxury_user]';

    public async insertUser(user: UserModel){
        await this.insertAsync(user, this._userTableName);
    }

    public async getUserByEmailAsync(email: string) : Promise<UserModel | null>{
        const user = await this.instaceDataBaseContext.knexContext
            .select()
            .from(this._userTableName)
            .where({Email: email? email : ''})
            .first(); 
        
        if(!user)
            return null;            
        return Mapper.mapper<any, UserModel>(user, UserModel);
    }

    public async getUserByIdAsync(Id: string) : Promise<UserModel>{
        const user = await this.instaceDataBaseContext.knexContext
            .select()
            .from(this._userTableName)
            .where({Id: Id? Id : ''})
            .first() 
            
            return Mapper.mapper<any, UserModel>(user, UserModel);
    }

    public async updateUser(userModel: UserModel) : Promise<void>{
        await this.instaceDataBaseContext.knexContext
            .update({
                FirstName: userModel.FirstName,
                LastName: userModel.LastName,
                DisplayName: userModel.DisplayName,
                Email: userModel.Email
            })
            .from(this._userTableName)
            .where({Id: userModel.Id? userModel.Id : ''});
    }
}