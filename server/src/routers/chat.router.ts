import { Context } from "koa";
import { executeQuery } from "../services/chat.service";

const Router = require("@koa/router");
export const chatRouter = new Router({
  prefix: "/chat",
});

chatRouter.post("/ai", async (ctx) => {
  const query = ctx.request.body.query;

  const response = await executeQuery(query);

  ctx.body = {
    BotResponse: response,
  };
});

// chatRouter.post("/webhook", async (ctx) => {

//   const intentName = ctx.request.body.queryResult.intent.displayName

//   const color = ctx.request.body.queryResult.parameters.color

//   console.log('intentName:', intentName)

//   if (intentName === 'MyWebhook') {
//     ctx.body = {
//       "fulfillmentMessages": [
//         {
//           "text": {
//             "text": [
//               "Text response from webhook"
//             ]
//           }
//         }
//       ]
//     }
//   } else if (intentName === 'carAvailable') {
//     // get cars
//     let numberOfCarsAvailable = 0;

//     const cars = 8;

//     numberOfCarsAvailable = cars

//     ctx.body = {
//       "fulfillmentMessages": [
//         {
//           "text": {
//             "text": [
//               `There are ${numberOfCarsAvailable} ${ color ? color + ' ' : '' } cars available`
//             ]
//           }
//         }
//       ]
//     }

//   }

// });
