import { Mapper } from "../mapper/mapper";
import { UserModel } from "../database/models/user-model";
import { UserAuthenticateDto } from "../dtos/user/user-authenticate-dto";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { NotFoundError } from "../errors/not-found-error";
import { UserRepository } from "../repository/user/user-repository";
import { RoleRepository } from "../repository/roles/role-repository";
import jwt from 'jsonwebtoken';
import { UserAuthenticatedDto } from "../dtos/user/user-authenticated-dto";
import { RoleModel } from "../database/models/role-model";
import { RoleDto } from "../dtos/role/role-dto";
import AppSettingsModel from "../utils/app-settings/models/app-settings-model";
import AppSettingsService from "../utils/app-settings/app-settings-service";

export class AuthorizeService{

    private _userRepository: UserRepository;
    private _roleRepository: RoleRepository;
    private _appSettings: AppSettingsModel;

    constructor(){
        this._userRepository = new UserRepository();
        this._roleRepository = new RoleRepository();
        this._appSettings =  AppSettingsService.getInstace().getAppSettings();
    }

    public async authenticateUserAsync(userAuthenticateDto: UserAuthenticateDto) {
        let userModel = await this._userRepository.getUserByEmailAsync(userAuthenticateDto.Email);          

        if(!userModel)
            throw new NotFoundError('User Not Found');

        if(!await userModel.checkPassWord(userAuthenticateDto.Password, this._appSettings.Bcrypt.PasswordSecret))
            throw new UnauthorizedError('Invalid Password');

        const rolesModel = await this._roleRepository.getUserRolesByUserId(userModel.Id);

        const userDto = Mapper.mapper<UserModel, UserAuthenticatedDto>(userModel, UserAuthenticatedDto);
        const rolesDto = Mapper.mapperList<RoleModel, RoleDto>(rolesModel, RoleDto);

        userDto.Roles = rolesDto;

        const token = jwt.sign(
            { User: userDto },
            this._appSettings.Bcrypt.JwtSecret,
            { expiresIn: '1h' }
        );

        return token;
    }

    public async checkJwtToken(token: string) : Promise<boolean>{
        return await new Promise((resolve, reject)=> {
            jwt.verify(token, this._appSettings.Bcrypt.JwtSecret, (err, userInfo)=>{
                if(err)
                    resolve(false);
    
                resolve(true);
            });
        });
    }

    public async getUserPermissions(token: string) : Promise<Array<number>>{
        const userAuthenticatedDto = await this._getUserFromPayloadFromToken(token);

        const userRoles = await this._roleRepository.getUserRolesByUserId(userAuthenticatedDto.Id);

        return userRoles.map(role => role.Id);
    }


    private async _getUserFromPayloadFromToken(token: string) : Promise<UserAuthenticatedDto>{
        const rawPayload = await new Promise((resolve, reject)=> {
            jwt.verify(token, this._appSettings.Bcrypt.JwtSecret, (err, userInfo)=>{
                if(err)
                    resolve(err);
    
                resolve(userInfo);
            });
        }) as any;

        return Mapper.mapper<any, UserAuthenticatedDto>(rawPayload.User, UserAuthenticatedDto);
    }
}