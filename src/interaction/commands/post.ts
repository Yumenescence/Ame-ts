import { injectable } from "inversify";

@injectable()
export default class Post {
  readonly name: string;
  constructor() {
    this.name = "ping";
  }

  async run(message: any, args = []) {
    message.channel.send("pong!");
  }
}
