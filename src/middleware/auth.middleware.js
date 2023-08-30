import asyncWrapper from "../helpers/async-wrapper.helper.js";
import { ApplicationError } from "../helpers/error.helper.js";
import * as jwtService from '../services/jwt.service.js';

const authMiddleware = asyncWrapper( async function ( req, res, next )
{ 
    const authHeader = req.headers[ 'authorization' ];
    
    const token = authHeader?.split( ' ' )[ 1 ];

    if ( !token ) throw new ApplicationError( "Unauthorized access", 401 );

    const payload = jwtService.verify( token );

    if ( !payload ) throw new ApplicationError( "Unathorized access", 401 );
    
    req.user = payload;

    next();
} );

export default authMiddleware;
