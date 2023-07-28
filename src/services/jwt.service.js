import jwt from 'jsonwebtoken';
import config from '../config/main.config.js';

export const sign = function ( payload )
{
    return jwt.sign(payload, config.services.jwt.secret, { expiresIn: "504h" });
}

export const verify = function ( token )
{
    return jwt.verify( token, config.services.jwt.secret );
}