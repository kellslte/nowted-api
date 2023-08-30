import jwt from 'jsonwebtoken';
import config from '../config/main.config.js';

export const sign = function ( payload )
{
    return jwt.sign(payload, config.services.jwt.secret, { expiresIn: "1h" });
}

export const refreshToken = function ( payload ) 
{
    return jwt.sign(payload, config.services.jwt.refreshSecret, { expiresIn: "30d" });    
}

export const verify = function ( token )
{
    return jwt.verify( token, config.services.jwt.secret );
}

export const verifyRefresh = function ( token )
{
    return jwt.verify( token, config.services.jwt.refreshToken );
}