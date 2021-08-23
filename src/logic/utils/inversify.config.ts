import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { BotClient } from "../../client";
import { Client, Intents } from "discord.js";
import { Commander } from "../../interaction/managers/commander";
import { CommanderRepository } from "../repositories/commanderRepository";
import { CommanderService } from "../../interaction/services/commanderService";
import Post from "../../interaction/commands/post";
import * as Config from "../../config.json";
let container = new Container();
container.bind<BotClient>(TYPES.BotClient).to(BotClient).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(
  new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  })
);
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
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
