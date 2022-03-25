import { RestaurantModel } from "../../database/models/restaurant-model";
import { Mapper } from "../../mapper/mapper";
import { BaseRepository } from "../base-repositoty";

export default class RestaurantRepository extends BaseRepository{
    private _restaurantTable: string  = '[dbo].[luxury_restaurant]';

    public async registerRestaurantAsync(restaurant: RestaurantModel){
        this.insertAsync(restaurant, this._restaurantTable);
    }

    public async getRestaurantByCnpj(cnpj: string){
        const result = await this.instaceDataBaseContext.knexContext
            .select()
            .from(this._restaurantTable)
            .where({Cnpj: cnpj});
            
       return Mapper.mapperList<Array<any>, RestaurantModel>(result, RestaurantModel);
    }

    public async getRestaurantsAsync(){
        const result  = await this.instaceDataBaseContext.knexContext
        .select()
        .from(this._restaurantTable);

        return Mapper.mapperList<any, RestaurantModel>(result, RestaurantModel);
    }

    public async getRestaurantByIdAsync(idRestaurant: string){
        const result = this.instaceDataBaseContext.knexContext
            .select()
            .from(this._restaurantTable)
            .where({Id: idRestaurant})
            .first();

        return Mapper.mapper<any, RestaurantModel>(result, RestaurantModel);
    }

    public async updateRestaurant(restaurantModel: RestaurantModel) : Promise<void>{
        await this.instaceDataBaseContext.knexContext
            .update({
                SocialReason: restaurantModel.SocialReason,
                FantasyName: restaurantModel.FantasyName,
                Cnpj: restaurantModel.Cnpj,
                Address1: restaurantModel.Address1,
                Address2: restaurantModel.Address2,
                Address3: restaurantModel.Address3,
                AddressNumber: restaurantModel.AddressNumber,
                City: restaurantModel.City,
                StateId: restaurantModel.StateId
            })
            .from(this._restaurantTable)
            .where({Id: restaurantModel.Id? restaurantModel.Id : ''});
    }
}