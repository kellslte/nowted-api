import { ApplicationError } from '../helpers/error.helper.js';

const errorHandler = function ( error, req, res )
{
    if ( error instanceof ApplicationError )
    {
        return res.status( error.statuscode ).json( {
            success: false,
            message: error.message,
            error_code: error.statuscode
        } );
    }

    return res.status( 500 ).json( {
        success: false,
        message: error.message
    })
}

export default errorHandler;