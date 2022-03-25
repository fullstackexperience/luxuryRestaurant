import express from "express";
import { RolesEnum } from "../enums/roles-enum";
import authorizeMiddleware from "../middlewares/authorize-middleware";
import { ProductContoller } from "../controllers/product-controller";

const ENDPOINT_PREFIX = 'product';
const REQUIRED_PERMISSIONS_PRODUCT: RolesEnum[] = [RolesEnum.admin, RolesEnum.write];
const productController = new ProductContoller();

const productRoutes = express.Router();

productRoutes.post(
    `/${ENDPOINT_PREFIX}`,
    authorizeMiddleware(REQUIRED_PERMISSIONS_PRODUCT),
    async (req, res) => {
        await productController.registerProductAsync(req, res);
    }
);

productRoutes.get(
    `/${ENDPOINT_PREFIX}/:id`,
    async (req, res) => {
        await productController.getProductByIdAsync(req, res);
    }
);

productRoutes.get(
    `/${ENDPOINT_PREFIX}/restaurant/:id`,
    async (req, res) => {
        await productController.getProducstByRestaurantIdAsync(req, res);
    }
);

productRoutes.post(
    `/${ENDPOINT_PREFIX}/update`,
    authorizeMiddleware(REQUIRED_PERMISSIONS_PRODUCT),
    async (req, res) => {
        await productController.updateProductAsync(req, res);
    }
);

productRoutes.post(
    `/${ENDPOINT_PREFIX}/delete`,
    authorizeMiddleware(REQUIRED_PERMISSIONS_PRODUCT),
    async (req, res) => {
        await productController.deleteProductAsync(req, res);
    }
);

export default productRoutes;