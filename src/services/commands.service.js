import { NOT_EXISTING_COMMAND_ERROR } from '../constants/index.js';
import { commands } from '../models/index.js';
import { logCommandsInfo } from '../utils/index.js';
import { BankService } from './index.js';

export class CommandsService {

  #bankService = null;

  constructor() {
    this.#bankService = new BankService();
  }

  isCloseCmd(line) {
    return line === commands.exit.command ? true : false;
  }

  logAllCommands() {
    const allCommands = Object.values(commands);

    logCommandsInfo(allCommands);
  }

  handleCmd(line) {
    const [userCmd, lineArguments] = line.trim().split(' ');

    switch (userCmd) {
      case commands.list.command: {
        this.logAllCommands();
        break;
      }

      case commands.bank.command: {
        this.#bankService.handleOperation(lineArguments);
        break;
      }

      default: {
        throw new Error(NOT_EXISTING_COMMAND_ERROR(userCmd));
      }
    }
  }
}