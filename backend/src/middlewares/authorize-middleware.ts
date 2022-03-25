import { RolesEnum } from "../enums/roles-enum";
import { AuthorizeService } from "../services/authorize-service";

const authorizeService = new AuthorizeService();

const authorizeMiddleware = (requiredPermissions: Array<RolesEnum>) =>{
    return async (req: any, res: any, next: any) =>{
            
        const authorizationHeader = req.header('authorization');
        const jwtToken = authorizationHeader?.split(' ')[1];
    
        if(!jwtToken)
            return res.status(401).json({message: 'Invalid Header.'});
    
        if(!await authorizeService.checkJwtToken(jwtToken))
            return res.status(401).json({message: 'Invalid Token.'});
        
        const userPermission = await authorizeService.getUserPermissions(jwtToken);
    
        if(!requiredPermissions.some(x => userPermission.some(y => y == x)))
            return res.status(401).json({message: "Do not have permission."});
    
        return next();
    }
} 


export default authorizeMiddleware;