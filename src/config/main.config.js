import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const config = {
    server: {
        port: process.env.PORT
    },
    connectToDatabase: function ()
    {
        mongoose.Promise = Promise;

        mongoose.connect( process.env.MONGODB_URL );

        mongoose.on( 'error', ( e ) => console.error( `Could not connect to MongoDB database. Error: ${e.message} ☣ ` ) );
        
        mongoose.on( 'connection', () => console.info( `Database connection established 🚀 ` ) );
    },
    services: {
        mail: {}
    }
}

export default config;