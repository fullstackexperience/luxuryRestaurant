import { UserAuthenticateDto } from "../dtos/user/user-authenticate-dto";
import { UserRegisterDto } from "../dtos/user/user-register-dto";
import { UserUpdateDto } from "../dtos/user/user-update-dto";
import { BaseError } from "../errors/base-error";
import { UserService } from "../services/user-service"

export class UserController {
    private _userService: UserService;

    constructor(){
        this._userService = new UserService();
    }

    public async registerUserAsync(req: any, res: any){
        const userDto = req.body as UserRegisterDto;

        try{
            await this._userService.registerUserAsync(userDto);
            
            res.status(200).send('Usuario Cadastrado com sucesso');
        }catch(err: any){
            if(err instanceof BaseError){
                res.status(err.status).json({message:err.message});
            }else{
                res.status(500).json({Error: err.message});
            }
        }
    }

    public async updateUserAsync(req: any, res: any){
        const userDto = req.body as UserUpdateDto;

        try{
            await this._userService.updateUserAsync(userDto);
            
            res.status(200).json({message:'Usuario Atualizado com sucesso'});
        }catch(err: any){
            if(err instanceof BaseError){
                res.status(err.status).json({message:err.message});
            }else{
                res.status(500).json({Error: err.message});
            }
        }
    }
}