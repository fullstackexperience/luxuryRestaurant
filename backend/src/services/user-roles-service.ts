import { UserRolesModel } from "../database/models/user-roles-model";
import { UserRolesRegisterDto } from "../dtos/user-roles/user-roles-register-dto";
import { ConflictError } from "../errors/conflict-error";
import { Mapper } from "../mapper/mapper";
import { UserRolesRepository } from "../repository/user_roles/user-roles-repository";

export class UserRolesService{
    private _userRoleRepository: UserRolesRepository;

    constructor(){
        this._userRoleRepository = new UserRolesRepository();
    }


    public async insertUserRoleAsync(userRoles: Array<UserRolesRegisterDto>){
        const userRolesModel = Mapper.mapperList<UserRolesRegisterDto, UserRolesModel>(userRoles, UserRolesModel);

        const userRolesRegistered  = await this._userRoleRepository.getUserRolesByUserIdAsync(userRoles[0].UserId);

        const userRolesexist = userRolesRegistered.find(userRoleRegistered =>{
            userRoles.find(userRole => userRoleRegistered.RoleId == userRole.RoleId);
        });
        
        if(userRolesexist)
            throw new ConflictError(`User already has this role: ${userRolesexist.RoleId}`);

        await this._userRoleRepository.insertUserRoleAsync(userRolesModel);
    }
}