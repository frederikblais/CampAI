import { Context } from "koa";
import { executeQuery } from "../services/chat.service";

const Router = require("@koa/router");
export const reservationRouter = new Router({
  prefix: "/reservation",
});

reservationRouter.get("/all", async (ctx) => {

  return ctx.body = {
    reservation: "online.",
  };
});