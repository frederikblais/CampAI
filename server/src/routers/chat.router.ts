import { Context } from "koa";
import { executeQuery } from "../services/chat.service";

const Router = require("@koa/router");
export const chatRouter = new Router({
  prefix: "/chat",
});

chatRouter.post("/message", async (ctx) => {
  const query = ctx.request.body.query;

  const response = await executeQuery(query);

  ctx.body = {
    botMessage: response,
  };
});

chatRouter.post("/webhook", async (ctx) => {
  
  console.log('ctx.request.body: ',ctx.request.body)

  const intentName = ctx.request.body.queryResult.intent.displayName

  const color = ctx.request.body.queryResult.parameters.color

  console.log('intent:', intentName)

  if (intentName === 'MyWebhook') {
    ctx.body = {
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              "Text response from webhook"
            ]
          }
        }
      ]
    }
  } else if (intentName === 'carAvailable') {
    // get cars
    let numberOfCarsAvailable = 0;

    const cars = 8;

    numberOfCarsAvailable = cars

    ctx.body = {
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              `There are ${numberOfCarsAvailable} ${ color ? color + ' ' : '' } cars available`
            ]
          }
        }
      ]
    }

  }

});
