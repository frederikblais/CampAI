require('dotenv').config()

import { Context } from "koa";
import { logger } from "./utils/logger";
import { healthCheckRouter } from "./routers/healthCheck.router";
import { userRouter } from "./routers/user.router";
import { chatRouter } from "./routers/chat.router";
import { reservationRouter } from "./routers/reservation.router";

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const auth = require('koa-basic-auth')

const app = new Koa();
const line = '---------------------------------------'

// Koa Auth
app.use(auth({ name: process.env.USERNAME, pass: process.env.PASS }));

// bodyparser
app.use(bodyParser())

// Routing
app.use(healthCheckRouter.routes());
app.use(userRouter.routes());
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
})

// logger
app.use(logger());

// error handling
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
})

const port = process.env.PORT || 8080; 
app.listen(port, () => {
    console.log(line)
    console.log(`Server started. Listening on port ${port}`);
    console.log(line)
});