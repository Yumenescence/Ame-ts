import { BotClient } from "./client";
import container from "./inversify.config";
import { TYPES } from "./types";

const bot = container.get<BotClient>(TYPES.BotClient);
bot
  .start()
  .then(() => {
    console.log("Logged in!");
  })
  .catch((error) => {
    console.log("Oh no! ", error);
  });
