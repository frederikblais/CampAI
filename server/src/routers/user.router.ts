import { Context } from "koa";
import { User } from "../interfaces/iUsers";
import {
  authenticate,
  readUserById,
  upsertUser,
} from "../services/user.service";
import { sendMessage } from "../services/websocket.service";

const Router = require("@koa/router");
export const userRouter = new Router({
  prefix: "/users",
});

// Console format
const line = "---------------------------------------";

userRouter.get("/", async (ctx) => {
  ctx.body = await readUserById("36474");
  ctx.response.status = 200;
  console.log("response: ", ctx.body);
  console.log(line);
});

userRouter.post("/", async (ctx) => {
  const user = await upsertUser(ctx.request.body);
  ctx.body = {
    message: "User Created",
    id: user,
  };
});

userRouter.post("/authenticate", async (ctx) => {
  const user = ctx.request.body;

  const isAuthenticated = await authenticate(user.username, user.password);

  if (isAuthenticated) {
    ctx.status = 200;
  } else {
    ctx.status = 403;
  }
});

userRouter.put("/", (ctx) => {
  ctx.body = "User UPDATED";
  console.log("response: ", ctx.response.status);
  console.log("Updated: ", ctx.request.body);
  console.log(line);
});

userRouter.delete("/", (ctx: Context) => {
  const query = ctx.request.query;
  ctx.body = "User Deleted";
  console.log("response: ", ctx.response.status);
  console.log("Deleted: ", ctx.request.body);
  console.log(line);
});

userRouter.post("/message", async (ctx) => {
  const message = ctx.request.body.message;

  await sendMessage(message);

  ctx.body = {
    message: "Message sent",
  };
});
