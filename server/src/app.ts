require('dotenv').config()

import { Context } from "koa";
import { logger } from "./utils/logger";
import { healthCheckRouter } from "./routers/healthCheck.router";
import { userRouter } from "./routers/user.router";
import { chatRouter } from "./routers/chat.router";
import { reservationRouter } from "./routers/reservation.router";
import * as jwt from "jsonwebtoken";

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const auth = require('koa-basic-auth')
const cors = require('koa-cors');

const app = new Koa();
const line = '---------------------------------------'

// Koa Auth
// Basic Auth => do not use
// app.use(auth({ name: process.env.USERNAME, pass: process.env.PASS }));

// cors
app.use(cors());

// Bodyparser
app.use(bodyParser())

// Unprotected Routes
app.use(userRouter.routes());

// Authenticate
app.use(async (ctx: Context, next) => {
    if(ctx.headers && ctx.headers['authorization']) {
        try {
            await jwt.verify(ctx.headers['authorization'], process.env.SECRET);
            next();
        } catch (err) {
            ctx.status = 401;
            ctx.body = 'Unauthorized: bad JWT';
        }
    } else {
        ctx.status = 401;
        ctx.body = 'Unauthorized: missing Header';
    }
});

// Protected Routes
app.use(healthCheckRouter.routes());
app.use(chatRouter.routes());
app.use(reservationRouter.routes());

// 404 Handler
app.use(async (ctx: Context) => {
    if (ctx.status == 404) {
        ctx.response.status = 400;
        ctx.body = 'Bad Request. Refer to API documentation for list of accepted parameters.'
        console.log('Bad request.')
        console.log(line)
    }
});

// Logger
app.use(logger());

// Error handling
app.use(async (ctx: Context, next: () => any) => {
    try {
        await next();
    } catch (err: any) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
});

// Console Output
const port = process.env.PORT || 8080; 
app.listen(port, () => {
    console.log(line)
    console.log(`Server started. Listening on port ${port}`);
    console.log(line)
});