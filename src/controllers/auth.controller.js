import asyncWrapper from "../helpers/async-wrapper.helper.js";
import { sendMail } from "../providers/mail/mail.provider.js";
import * as authService from '../services/auth.service.js';

export const register = asyncWrapper( async ( req, res ) =>
{
    const user = await authService.register( req.body );

    return res.status( 200 ).json( {
        success: true,
        message: 'User successfully registered',
        data: {
            user: user
        }
    })
} );
 
export const login = asyncWrapper( async ( req, res ) =>
{ 
    const token = await authService.login( req.body );

    return res.status( 200 ).json( {
        success: true,
        authorization: {
            type: 'bearer',
            token: token
        }
    })
} );

// export const logout = asyncWrapper( async ( req, res ) => { } );

export const requestPasswordReset = asyncWrapper( async ( req, res ) =>
{
    const { token, user } = await authService.generateUserResetToken(req.body);

    // send an email to the user with the token;
    sendMail( `${user.name} <${user.email}>`, 'reset-password', "You reqested a Password Reset!", {
        name: user.name,
        token
    } )
    
    return res.status( 200 ).json( {
        success: true,
        message: 'Please check your email for your password reset token.',
    })
 } );

export const resetPassword = asyncWrapper( async ( req, res ) => { } );