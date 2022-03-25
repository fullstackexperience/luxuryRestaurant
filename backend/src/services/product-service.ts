import { ProductModel } from "../database/models/product-model";
import { RegisterProductDto } from "../dtos/product/register-product";
import { BadRequestError } from "../errors/bad-request-error";
import { Mapper } from "../mapper/mapper";
import { ProductRepository } from "../repository/product/product-repository";
import AppSettingsService from "../utils/app-settings/app-settings-service";
import AppSettingsModel from "../utils/app-settings/models/app-settings-model";

export class ProductService{
    private _appSettings: AppSettingsModel;
    private _productRepository: ProductRepository;

    constructor(){
        this._appSettings =  AppSettingsService.getInstace().getAppSettings();
        this._productRepository = new ProductRepository();
    }

    public async registerProductAsyn(product: RegisterProductDto) : Promise<void>{
        const productEntity = Mapper.mapper<RegisterProductDto, ProductModel>(product, ProductModel);
        
        productEntity.generateId();

        await this._productRepository.insertProductAsync(productEntity);
    }

    public async updateProductAsyn(){

    }

    public async deleteProductByIdAsyn(){

    }

    public async getProductByIdAsyn(productId: string){
        if(!productId)
            throw new BadRequestError('Parametro esta vazio.');

        const productEntity = await this._productRepository.getProductByIdAsync(productId);

        return Mapper.mapper<ProductModel, RegisterProductDto>(productEntity, RegisterProductDto);
    }

    public async getProductsByRestaurantIdAsyn(restaurantId: string){
        if(!restaurantId)
            throw new BadRequestError('Parametro esta vazio.');

        const productEntity = await this._productRepository.getProductsByRestaurantIdAsync(restaurantId);

        return Mapper.mapperList<ProductModel, RegisterProductDto>(productEntity, RegisterProductDto);
    }
}