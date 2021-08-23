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
exports.Commander = void 0;
const { join } = require("path");
const inversify_1 = require("inversify");
const types_1 = require("../../logic/utils/types");
const discord_js_1 = require("discord.js");
const commanderService_1 = require("../services/commanderService");
const commandDirectory = join(__dirname, "../commands");
let Commander = class Commander {
    constructor(client, prefix, commanderService) {
        this.prefix = prefix;
        this.service = commanderService;
        this.commands = new discord_js_1.Collection();
        client.on("messageCreate", (message) => this.handleMessage(message));
    }
    loadCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            const commandsList = yield this.service.loadCommandsFromDirectoryRecursivelySync(commandDirectory);
            commandsList.forEach((command) => {
                this.commands.set(command.name, command);
            });
        });
    }
    handleMessage(message) {
        const { content } = message;
        if (!content.startsWith(this.prefix)) {
            return null;
        }
        const [name, ...args] = this.parseMessage(content);
        return this.runCommand(message, name, args);
    }
    parseMessage(content) {
        const re = /\s*(?:("|')([^]*?)\1|(\S+))\s*/g;
        const re2 = /^("|')([^]*)\1$/g;
        const result = [];
        const newContent = content.slice(this.prefix.length);
        let match;
        let contentLen = newContent.length;
        while (--contentLen && (match = re.exec(newContent))) {
            result.push(match[2] || match[3]);
        }
        if (match && re.lastIndex < contentLen) {
            result.push(newContent.substr(re.lastIndex).replace(re2, "$2"));
        }
        return result;
    }
    getCommand(name) {
        const lowerName = name.toLowerCase();
        return this.commands.find((command) => this.findAlias(command, lowerName) || command.name === lowerName);
    }
    findAlias(command, name) {
        return command.aliases && command.aliases.includes(name);
    }
    runCommand(message, name, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.getCommand(name);
            if (!command)
                return null;
            command.message = message;
            return command.run(message, args);
        });
    }
};
Commander = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Client)),
    __param(1, inversify_1.inject(types_1.TYPES.Prefix)),
    __param(2, inversify_1.inject(types_1.TYPES.CommanderService)),
    __metadata("design:paramtypes", [discord_js_1.Client, String, commanderService_1.CommanderService])
], Commander);
exports.Commander = Commander;
//# sourceMappingURL=commander.js.map