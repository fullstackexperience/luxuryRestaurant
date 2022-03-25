import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';

//Rotas
import userRoutes from  "./src/routes/user-routes";
import authorizeRoutes from "./src/routes/authorize-routes";
import productRoutes from "./src/routes/product-routes";
import restaurantRoutes from "./src/routes/restaurant-routes";

//Middleware
import loggerMiddleware from "./src/middlewares/logger-middleware";


import DataBaseContext from "./src/database/database-context";
import AppSettingsService from "./src/utils/app-settings/app-settings-service";

const APP = express();
const PORT = 3000;


APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(bodyParser.json());

//Adicona middlewares
APP.use(cors());
APP.use(loggerMiddleware);

//Adiciona rotas
APP.use(userRoutes);
APP.use(authorizeRoutes);
APP.use(productRoutes);
APP.use(restaurantRoutes);

//Cria a conexão com o banco
DataBaseContext.getInstace();

//Carrega os AppSettings
AppSettingsService.getInstace();

//Inicia server
APP.listen(PORT, () =>{
    console.log(`Example app listening on port ${PORT}`);
});