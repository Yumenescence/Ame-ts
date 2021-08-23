import { Client } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./logic/utils/types";
import { Commander } from "./interaction/managers/commander";

@injectable()
export class BotClient {
  private client: Client;
  private readonly token: string;
  private commander: Commander;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.Commander) commander: Commander
  ) {
    this.client = client;
    this.token = token;
    this.commander = commander;
  }

  public start(): Promise<string> {
    this.prepare();
    return this.client.login(this.token);
  }

  public prepare() {
    this.client.on("ready", async () => {
      await this.commander
        .loadCommands()
        .then(() => console.log("Commands loaded successfully!"));
    });
  }
}
