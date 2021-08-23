require("dotenv").config();
import container from "./logic/utils/inversify.config";
import { TYPES } from "./logic/utils/types";
import { BotClient } from "./client";
let bot = container.get<BotClient>(TYPES.BotClient);
bot
  .start()
  .then(() => {
    console.log("Logged in!");
  })
  .catch((error) => {
    console.log("Oh no! ", error);
  });
