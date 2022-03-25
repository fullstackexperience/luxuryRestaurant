import express from  "express";
import { UserController } from "../controllers/user-controller";
import { RolesEnum } from "../enums/roles-enum";
import authorizeMiddleware from "../middlewares/authorize-middleware";

const ENDPOINT_PREFIX = 'user';
const REQUIRED_PERMISSIONS_UPDATE : RolesEnum[] = [RolesEnum.admin];
const REQUIRED_PERMISSIONS_REGISTER : RolesEnum[] = [RolesEnum.admin, RolesEnum.reader];
const userController = new UserController();

const userRoutes = express.Router();

userRoutes.post(
    `/${ENDPOINT_PREFIX}`, 
    authorizeMiddleware(REQUIRED_PERMISSIONS_REGISTER),
    async (req, res) => {
        await userController.registerUserAsync(req, res);
    }
);

userRoutes.post(
    `/${ENDPOINT_PREFIX}/update`,
    authorizeMiddleware(REQUIRED_PERMISSIONS_UPDATE),
    async (req, res) => {
        await userController.updateUserAsync(req, res);
    }
);

export default userRoutes;