import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const config = {
    server: {
        port: process.env.PORT,
        secret: process.env.APP_SECRET,
        mode: process.env.NODE_ENV,
    },
    connectToDatabase: function ()
    {
        mongoose.Promise = Promise;

        mongoose.connect(process.env.MONGODB_URI);

        mongoose.connection.on( 'error', ( e ) => console.error( `Could not connect to MongoDB database. Error: ${e.message} ☣ ` ) );
        
        mongoose.connection.on( 'open', () => console.info( `Database connection established 🚀 ` ) );
    },
    services: {
        mail: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASS
            }
        },
        jwt: {
            secret: process.env.JWT_SECRET,
            expires: process.env.JWT_EXPIRES
        }
    }
}

export default config;