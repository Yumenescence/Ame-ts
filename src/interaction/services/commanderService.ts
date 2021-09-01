import { CommanderRepository } from "../../logic/repositories/commanderRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
@injectable()
export class CommanderService {
  private repository: CommanderRepository;

  constructor(
    @inject(TYPES.CommanderRepository) repository: CommanderRepository
  ) {
    this.repository = repository;
  }
  async loadCommandsFromDirectoryRecursivelySync(dir: string) {
    const commandsFilepathsMap =
      this.repository.loadCommandsFilepathsFromDirectoryRecursivelySync(dir);
    const commands = this.loadCommandsFromPaths(commandsFilepathsMap);
    return commands;
  }

  private loadCommandsFromPaths(paths: Array<string>) {
    return paths.map((commandPath) => {
      // eslint-disable-next-line global-require
      const ClassFromFile = require(commandPath);
      const command = new ClassFromFile.default();
      return command;
    });
  }
}
