const { join } = require("path");
import { inject, injectable } from "inversify";
import { TYPES } from "../../logic/utils/types";
import { Client, Collection, Message } from "discord.js";
import { CommanderService } from "../services/commanderService";
const commandDirectory = join(__dirname, "../commands");

@injectable()
export class Commander {
  private commands: Collection<any, any>;
  private service: CommanderService;
  readonly prefix: string;
  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Prefix) prefix: string,
    @inject(TYPES.CommanderService) commanderService: CommanderService
  ) {
    this.prefix = prefix;
    this.service = commanderService;
    this.commands = new Collection();
    client.on("messageCreate", (message) => this.handleMessage(message));
  }

  async loadCommands() {
    const commandsList =
      await this.service.loadCommandsFromDirectoryRecursivelySync(
        commandDirectory
      );
    commandsList.forEach((command: any) => {
      this.commands.set(command.name, command);
    });
  }

  private handleMessage(message: Message) {
    const { content } = message;
    if (!content.startsWith(this.prefix)) {
      return null;
    }

    const [name, ...args] = this.parseMessage(content);
    return this.runCommand(message, name, args);
  }

  private parseMessage(content: string) {
    const re = /\s*(?:("|')([^]*?)\1|(\S+))\s*/g;
    const re2 = /^("|')([^]*)\1$/g;
    const result = [];
    const newContent = content.slice(this.prefix.length);

    let match: Array<any>;
    let contentLen = newContent.length;

    while (--contentLen && (match = re.exec(newContent))) {
      result.push(match[2] || match[3]);
    }

    if (match && re.lastIndex < contentLen) {
      result.push(newContent.substr(re.lastIndex).replace(re2, "$2"));
    }
    return result;
  }

  private getCommand(name: string) {
    const lowerName = name.toLowerCase();
    return this.commands.find(
      (command: { aliases: Array<string>; name: string }) =>
        this.findAlias(command, lowerName) || command.name === lowerName
    );
  }

  private findAlias(command: { aliases: Array<string> }, name: string) {
    return command.aliases && command.aliases.includes(name);
  }

  async runCommand(message: Message, name: string, args: Array<string>) {
    const command = this.getCommand(name);
    if (!command) return null;

    command.message = message;
    return command.run(message, args);
  }
}
