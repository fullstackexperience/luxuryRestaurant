const loggerMiddleware = (req: any, res: any, next: any) => {
    console.log(`${new Date().toUTCString()} - rota: "${req.path}" - metodo: ${req.method}`);

    next();
}

export default loggerMiddleware;