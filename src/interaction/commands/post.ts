import { Message } from "discord.js";
import { injectable } from "inversify";

@injectable()
export default class Post {
  readonly name: string;
  constructor() {
    this.name = "ping";
  }

  async run(message: Message): Promise<void> {
    message.channel.send("pongg!");
  }
}
