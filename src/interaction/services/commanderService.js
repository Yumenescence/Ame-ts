"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommanderService = void 0;
const commanderRepository_1 = require("../../logic/repositories/commanderRepository");
const inversify_1 = require("inversify");
const types_1 = require("../..//logic/utils/types");
let CommanderService = class CommanderService {
    constructor(repository) {
        this.repository = repository;
    }
    loadCommandsFromDirectoryRecursivelySync(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandsFilepathsMap = this.repository.loadCommandsFilepathsFromDirectoryRecursivelySync(dir);
            const commands = this.loadCommandsFromPaths(commandsFilepathsMap);
            return commands;
        });
    }
    loadCommandsFromPaths(paths) {
        return paths.map((commandPath) => {
            // eslint-disable-next-line global-require
            const ClassFromFile = require(commandPath);
            const command = new ClassFromFile.default();
            return command;
        });
    }
};
CommanderService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.CommanderRepository)),
    __metadata("design:paramtypes", [commanderRepository_1.CommanderRepository])
], CommanderService);
exports.CommanderService = CommanderService;
//# sourceMappingURL=commanderService.js.map