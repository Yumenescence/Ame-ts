"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const client_1 = require("../../client");
const discord_js_1 = require("discord.js");
const commander_1 = require("../../interaction/managers/commander");
const commanderRepository_1 = require("../repositories/commanderRepository");
const commanderService_1 = require("../../interaction/services/commanderService");
const post_1 = require("../../interaction/commands/post");
const Config = require("../../config.json");
let container = new inversify_1.Container();
container.bind(types_1.TYPES.BotClient).to(client_1.BotClient).inSingletonScope();
container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
}));
container.bind(types_1.TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind(types_1.TYPES.Prefix).toConstantValue(Config.prefix);
container.bind(types_1.TYPES.Commander).to(commander_1.Commander).inSingletonScope();
container
    .bind(types_1.TYPES.CommanderService)
    .to(commanderService_1.CommanderService)
    .inSingletonScope();
container
    .bind(types_1.TYPES.CommanderRepository)
    .to(commanderRepository_1.CommanderRepository)
    .inSingletonScope();
container.bind(types_1.TYPES.Post).to(post_1.default).inSingletonScope();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map