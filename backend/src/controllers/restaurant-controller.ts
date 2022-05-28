import RestaurantRegisterDto from "../dtos/restaurant/restaurant-register-dto";
import UpdateRestaurantDto from "../dtos/restaurant/update-restaurant-dto";
import { BaseError } from "../errors/base-error";
import RestaurantService from "../services/restaurant-service";

export default class RestaurantController{
    private _restaurantService: RestaurantService;

    constructor(){
        this._restaurantService = new RestaurantService();
    }

    public async registerRestaurantAsync(req: any, res: any) {
        const productDto = req.body as RestaurantRegisterDto;

        try{
            await this._restaurantService.registerRestaurantAsync(productDto);
            
            res.status(200).send({message:'Restaurante cadastrado com sucesso.'});
        }catch(err: any){
            if(err instanceof BaseError){
                res.status(err.status).json({message:err.message});
            }else{
                res.status(500).json({Error: err.message});
            }
        }
        
    }

    public async getRestaurantsAsync(req: any, res: any) {
        try{
            const restaurant = await this._restaurantService.getRestaurantsAsync();
            
            res.status(200).send({restaurants: restaurant});
        }catch(err: any){
            if(err instanceof BaseError){
                res.status(err.status).json({message:err.message});
            }else{
                res.status(500).json({Error: err.message});
            }
        }
        
    }

    public async updateRestaurantAsync(req: any, res: any) {
        const updateRestaurantDto = req.body as UpdateRestaurantDto;

        try{
            await this._restaurantService.updateRestaurantAsync(updateRestaurantDto);
            
            res.status(200).send({message:'Restaurante atualizado com sucesso.'});
        }catch(err: any){
            if(err instanceof BaseError){
                res.status(err.status).json({message:err.message});
            }else{
                res.status(500).json({Error: err.message});
            }
        }
        
    }
}