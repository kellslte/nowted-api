import asyncWrapper from "../helpers/async-wrapper.helper.js";
import { sendMail } from "../providers/mail/mail.provider.js";
import * as authService from '../services/auth.service.js';
import * as userService from '../services/user.service.js';

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

export const refreshToken = asyncWrapper( async ( req, res ) => { } );

// export const logout = asyncWrapper( async ( req, res ) => { } );

export const requestPasswordReset = asyncWrapper( async ( req, res ) =>
{
    const { token, user } = await authService.generateUserResetToken(req.body);

    // send an email to the user with the token;
    sendMail( `${user.name} <${user.email}>`, 'reset-password', "You reqested a Password Reset!", {
        name: user.name,
        token
    } );
    
    return res.status( 200 ).json( {
        success: true,
        message: 'Please check your email for your password reset token.',
    })
 } );

export const resetPassword = asyncWrapper( async ( req, res ) =>
{ 
    const { email } = req.body;

    const passwordReset = await authService.resetPassword( req.body );

    if ( passwordReset )
    {
        const user = await userService.getUser(email);
    
        // send an email if the password change was successful
        sendMail( `${user.name} <${email}>`, 'password-reset', "You password has been changed!", {
            name: user.name,
        } );
        
        return res.status( 200 ).json( {
            success: true,
            message: 'Your password has been successfully changed!'
        } );  
     }
} );