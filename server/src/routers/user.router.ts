import { authenticate, createUser, deleteUser, readUserById, updateUser, upsertUser } from "../services/user.service";
import { Context } from "koa";
import * as jwt from 'jsonwebtoken';
const Router = require('@koa/router');

export const userRouter = new Router({
    prefix: '/users'
});

userRouter.get('/', async (ctx) => {
    const userId = ctx.request.query.id
    ctx.body = await readUserById(userId);
});

userRouter.post('/', async (ctx) => {
    const userId = await upsertUser(ctx.request.body)
    ctx.body = {
        message: 'User created',
        id: userId
    };
});

userRouter.post('/login', async (ctx) => {

    const user = ctx.request.body;

    console.log('Header Auth: ',ctx.headers.authorization);

    const isAuthenticated = await authenticate(user.username, user.password);

    const token = jwt.sign({ username: user.username }, process.env.SECRET);

    if(isAuthenticated) {
        ctx.status = 200
        ctx.body = { token: token }
    } else {
        ctx.status = 403
    }
})

userRouter.put('/:id', async (ctx) => {
    const path = ctx.request.path
    const pathItems = path.split('/')
    const userId = pathItems[2]
    await updateUser(ctx.request.body, userId)
    ctx.body = {
        message: 'User updated',
        id: userId
    };
});

userRouter.delete('/:id', async (ctx: Context) => {
    const path = ctx.request.path
    const pathItems = path.split('/')
    const userId = pathItems[2]
    await deleteUser(userId)
    ctx.body = `Ok, deleted id#${userId}`;
});