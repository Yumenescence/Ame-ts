const { readdirSync, statSync } = require("fs");
const { join } = require("path");
import { injectable } from "inversify";

@injectable()
export class CommanderRepository {
  loadCommandsFilepathsFromDirectorySync(dir: string): Array<string> {
    const newDir = join(dir);
    let commandsFilepaths = [];

    readdirSync(dir).forEach((files: string) => {
      if (files.endsWith(".js")) {
        commandsFilepaths = commandsFilepaths.concat(`${newDir}/${files}`);
      }
    });

    return commandsFilepaths;
  }
  loadCommandsFilepathsFromDirectoryRecursivelySync(
    dir: string
  ): Array<string> {
    let results = [];

    readdirSync(dir).forEach((file: string) => {
      const fileName = `${dir}/${file}`;
      const stat = statSync(fileName);
      if (!file.endsWith(".js")) return;
      if (stat && stat.isDirectory()) {
        results = results.concat(
          this.loadCommandsFilepathsFromDirectorySync(fileName)
        );
      } else {
        results.push(fileName);
      }
    });
    return results;
  }
}
