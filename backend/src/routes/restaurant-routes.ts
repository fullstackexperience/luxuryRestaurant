import express from "express";
import { RolesEnum } from "../enums/roles-enum";
import authorizeMiddleware from "../middlewares/authorize-middleware";
import RestaurantController from "../controllers/restaurant-controller";

const ENDPOINT_PREFIX = 'restaurant';
const REQUIRED_PERMISSIONS_RESTAURANT: RolesEnum[] = [RolesEnum.admin, RolesEnum.write];
const restaurantController = new RestaurantController();

const restaurantRoutes = express.Router();

restaurantRoutes.post(
    `/${ENDPOINT_PREFIX}`,
    authorizeMiddleware(REQUIRED_PERMISSIONS_RESTAURANT),
    async (req, res) => {
        await restaurantController.registerRestaurantAsync(req, res);
    }
);

restaurantRoutes.get(
    `/${ENDPOINT_PREFIX}`,
    authorizeMiddleware(REQUIRED_PERMISSIONS_RESTAURANT),
    async (req, res) => {
        await restaurantController.getRestaurantsAsync(req, res);
    }
);

restaurantRoutes.post(
    `/${ENDPOINT_PREFIX}/update`,
    authorizeMiddleware(REQUIRED_PERMISSIONS_RESTAURANT),
    async (req, res) => {
        await restaurantController.updateRestaurantAsync(req, res);
    }
);

restaurantRoutes.post(
    `/${ENDPOINT_PREFIX}/delete`,
    authorizeMiddleware(REQUIRED_PERMISSIONS_RESTAURANT),
    async (req, res) => {
        //await restaurantController.deleteProductAsync(req, res);
    }
);

export default restaurantRoutes;