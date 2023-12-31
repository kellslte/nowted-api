import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './middleware/error.middleware.js';
import config from './config/main.config.js';
import router from './routes/api.routes.js';
import listAppRoutes from 'express-list-routes';
import http from 'http';

// define application
const app = express();
const server = http.createServer(app);

// define application middleware
app.use( express.json( { extended: true } ) );
app.use( compression() );
app.use( morgan( 'dev' ) );
app.use( cors( {
    credentials: true,
} ) );

// connect to database
config.connectToDatabase();

// define application routes
app.use( '/api/v1', router );


// define application error handlers
app.use( errorHandler );

// list application routes
listAppRoutes(app);

// start application server
server.listen(config.server.port, () => console.log(`Starting server at ${config.server.port}`));