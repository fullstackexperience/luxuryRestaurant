import { ProductModel } from "../../database/models/product-model";
import { Mapper } from "../../mapper/mapper";
import { BaseRepository } from "../base-repositoty";

export class ProductRepository extends BaseRepository{
    private _productTableName: string  = '[dbo].[luxury_product]';

    public async insertProductAsync(product: ProductModel): Promise<void>{
        await this.insertAsync(product, this._productTableName);
    }

    public async getProductByIdAsync(productId: string){
        const result = await this.instaceDataBaseContext.knexContext
            .select()
            .from(this._productTableName)
            .where({Id: productId})
            .first();
        
        return Mapper.mapper<any, ProductModel>(result, ProductModel);
    }

    public async getProductsByRestaurantIdAsync(restaurantId: string){
        const result = await this.instaceDataBaseContext.knexContext
            .select()
            .from(this._productTableName)
            .where({RestaurantId: restaurantId});
        
        return Mapper.mapperList<any, ProductModel>(result, ProductModel);
    }
}