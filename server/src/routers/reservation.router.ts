import { executeQuery } from "../services/chat.service";
import { authenticate } from "../services/user.service";
import { Context } from "koa";
import * as jwt from 'jsonwebtoken';
import { createReservation, deleteReservation, getReservation } from "../services/reservation.service";

const Router = require("@koa/router");

export const reservationRouter = new Router({
  prefix: "/reservation",
});

// Get all reservations
reservationRouter.get("/", async (ctx) => {
  var reservations = await getReservation()
  ctx.body = {
    message: reservations,
  };
});

// Create reservation
reservationRouter.post('/', async (ctx) => {
  const reservation = await createReservation(ctx.request.body);
  console.log(ctx.status);
  ctx.body = {
    message: 'Reservation created',
  };
});

// Delete reservation
reservationRouter.delete('/:id', async (ctx: Context) => {
  const path = ctx.request.path
  const pathItems = path.split('/')
  const reservationID = pathItems[2]
  await deleteReservation(reservationID)
  console.log('Deleted: ',reservationID)
  ctx.body = `Ok, deleted id: ${reservationID}`
});

