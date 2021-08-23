"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommanderRepository = void 0;
const { readdirSync, statSync } = require("fs");
const { join } = require("path");
const inversify_1 = require("inversify");
let CommanderRepository = class CommanderRepository {
    loadCommandsFilepathsFromDirectorySync(dir) {
        const newDir = join(dir);
        let commandsFilepaths = [];
        readdirSync(dir).forEach((files) => {
            if (files.endsWith(".js")) {
                commandsFilepaths = commandsFilepaths.concat(`${newDir}/${files}`);
            }
        });
        return commandsFilepaths;
    }
    loadCommandsFilepathsFromDirectoryRecursivelySync(dir) {
        let results = [];
        readdirSync(dir).forEach((file) => {
            const fileName = `${dir}/${file}`;
            const stat = statSync(fileName);
            if (!file.endsWith(".js"))
                return;
            if (stat && stat.isDirectory()) {
                results = results.concat(this.loadCommandsFilepathsFromDirectorySync(fileName));
            }
            else {
                results.push(fileName);
            }
        });
        return results;
    }
};
CommanderRepository = __decorate([
    inversify_1.injectable()
], CommanderRepository);
exports.CommanderRepository = CommanderRepository;
//# sourceMappingURL=commanderRepository.js.map