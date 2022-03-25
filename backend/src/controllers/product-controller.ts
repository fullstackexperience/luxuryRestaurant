import { RegisterProductDto } from "../dtos/product/register-product";
import { BaseError } from "../errors/base-error";
import { ProductService } from "../services/product-service";

export class ProductContoller {

    private _productService: ProductService;

    constructor() {
        this._productService = new ProductService();
    }


    public async registerProductAsync(req: any, res: any) {
        const productDto = req.body as RegisterProductDto;
        
        try{
            await this._productService.registerProductAsyn(productDto);
            
            res.status(200).send({message:'Produto cadastrado com sucesso.'});
        }catch(err: any){
            if(err instanceof BaseError){
                res.status(err.status).json({message:err.message});
            }else{
                res.status(500).json({Error: err.message});
            }
        }
    }

    public async updateProductAsync(req: any, res: any) {
        res.status(200).json({ message: 'Rota encontrada' });
    }

    public async deleteProductAsync(req: any, res: any) {
        res.status(200).json({ message: 'Rota encontrada' });
    }

    public async getProductByIdAsync(req: any, res: any) {
        const productId = req.params.id;
        
        try{
            const product = await this._productService.getProductByIdAsyn(productId);
            
            res.status(200).send({product: product});
        }catch(err: any){
            if(err instanceof BaseError){
                res.status(err.status).json({message:err.message});
            }else{
                res.status(500).json({Error: err.message});
            }
        }
    }

    public async getProducstByRestaurantIdAsync(req: any, res: any) {
        const restaurantId = req.params.id;
        
        try{
            const products = await this._productService.getProductsByRestaurantIdAsyn(restaurantId);
            
            res.status(200).send({products: products});
        }catch(err: any){
            if(err instanceof BaseError){
                res.status(err.status).json({message:err.message});
            }else{
                res.status(500).json({Error: err.message});
            }
        }
    }
}