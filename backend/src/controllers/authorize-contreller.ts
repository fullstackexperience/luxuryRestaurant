import { UserAuthenticateDto } from "../dtos/user/user-authenticate-dto";
import { BaseError } from "../errors/base-error";
import { Mapper } from "../mapper/mapper";
import { AuthorizeService } from "../services/authorize-service";

export class AuthorizeController{

    private _authorizeService : AuthorizeService;

    constructor(){
        this._authorizeService = new AuthorizeService();
    }


    public async authenticateUserAsync(req: any, res: any){

        const user = Mapper.mapper<any, UserAuthenticateDto>(req.body, UserAuthenticateDto);

        try{
            const token = await this._authorizeService.authenticateUserAsync(user);

            res.status(200).json({message: 'Usuario Autenticado com Sucesso', token: token});
        }catch(err: any){
            if(err instanceof BaseError){
                res.status(err.status).json({message:err.message});
            }else{
                res.status(500).json({Error: err.message});                
            }
        }
    }
}
