import express from  "express";
import { AuthorizeController } from "../controllers/authorize-contreller";

const ENDPOINT_PREFIX = 'authorize';

const authorizeController = new AuthorizeController()

const authorizeRoutes = express.Router();

authorizeRoutes.post(`/${ENDPOINT_PREFIX}`, async (req, res) => {
    await authorizeController.authenticateUserAsync(req, res);
});

export default authorizeRoutes;