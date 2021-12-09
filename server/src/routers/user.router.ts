import { authenticate, createUser, deleteUser, getAllUsers, readUserById, updateUser, upsertUser } from "../services/user.service";
import { Context } from "koa";
import * as jwt from 'jsonwebtoken';
const Router = require('@koa/router');

export const userRouter = new Router({
    prefix: '/users'
});

userRouter.get('/:id', async (ctx) => {
    const userId = ctx.request.query.id
    ctx.body = await readUserById(userId);
});

// Get all users
userRouter.get("/", async (ctx) => {
    var users = await getAllUsers()
    ctx.body = {
      User: users,
    };
  });

// Signup user
userRouter.post('/', async (ctx) => {
    const userId = await upsertUser(ctx.request.body)
    ctx.body = {
        message: `Successfuly created user#${userId}`,
    };
});

// Login user
userRouter.post('/login', async (ctx) => {

    const user = ctx.request.body;

    const isAuthenticated = await authenticate(user.username, user.password);

    const token = jwt.sign({ username: user.username }, process.env.SECRET);

    if(isAuthenticated) {
        ctx.status = 200
        ctx.body = { 
            UserExists: isAuthenticated,
            JWT: token
        }
    } else {
        ctx.body = { 
            UserExists: isAuthenticated
        }
        ctx.status = 403    // Forbiden
    }
})

userRouter.delete('/:id', async (ctx: Context) => {
    const path = ctx.request.path
    const pathItems = path.split('/')
    const userId = pathItems[2]
    await deleteUser(userId)
    ctx.body = `Ok, deleted id#${userId}`;
});