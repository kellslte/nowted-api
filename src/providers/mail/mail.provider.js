import hbs from "nodemailer-express-handlebars";
import nodemailer from 'nodemailer';
import config from "../../config/main.config.js";
import { join } from 'path';

const mailer = nodemailer.createTransport( config.services.mail );

mailer.use( 'compile', hbs( {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: 'templates/',
        defaultLayout: false,
    },
    viewPath: join( __dirname, './templates/' ),
    extName: '.hbs'
}) );

export const sendMail = function (){}