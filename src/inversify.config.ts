import "reflect-metadata";
import { Client, Intents } from "discord.js";
import { Container } from "inversify";
import { BotClient } from "./client";
import * as Config from "./config.json";
import Post from "./interaction/commands/post";
import { Commander } from "./interaction/managers/commander";
import { CommanderService } from "./interaction/services/commanderService";
import { CommanderRepository } from "./logic/repositories/commanderRepository";

import { TYPES } from "./types";

const container = new Container();
container.bind<BotClient>(TYPES.BotClient).to(BotClient).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(
  new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  })
);
container.bind<string>(TYPES.Token).toConstantValue(Config.token);
container.bind<string>(TYPES.Prefix).toConstantValue(Config.prefix);
container.bind<Commander>(TYPES.Commander).to(Commander).inSingletonScope();
container
  .bind<CommanderService>(TYPES.CommanderService)
  .to(CommanderService)
  .inSingletonScope();
container
  .bind<CommanderRepository>(TYPES.CommanderRepository)
  .to(CommanderRepository)
  .inSingletonScope();
container.bind<Post>(TYPES.Post).to(Post).inSingletonScope();

export default container;
