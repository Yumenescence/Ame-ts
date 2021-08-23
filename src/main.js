"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const inversify_config_1 = require("./logic/utils/inversify.config");
const types_1 = require("./logic/utils/types");
let bot = inversify_config_1.default.get(types_1.TYPES.BotClient);
bot
    .start()
    .then(() => {
    console.log("Logged in!");
})
    .catch((error) => {
    console.log("Oh no! ", error);
});
//# sourceMappingURL=main.js.map