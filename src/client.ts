import { Client } from "discord.js";
import { inject, injectable } from "inversify";
import { Commander } from "./interaction/managers/commander";
import { TYPES } from "./types";

@injectable()
export class BotClient {
  constructor(
    @inject(TYPES.Client) private client: Client,
    @inject(TYPES.Token) private readonly token: string,
    @inject(TYPES.Commander) private commander: Commander
  ) {
    this.client = client;
    this.token = token;
    this.commander = commander;
  }

  start(): Promise<string> {
    this.loadCommandsOnReady();
    return this.client.login(this.token);
  }

  private loadCommandsOnReady(): void {
    this.client.on("ready", async () => {
      await this.commander.loadCommands();
      console.log("Commands loaded successfully!");
    });
  }
}
