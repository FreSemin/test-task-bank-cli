import { NOT_EXISTING_COMMAND_ERROR } from '../constants/index.js';
import { commands } from '../models/index.js';
import { logCommandsInfo } from '../utils/index.js';

export class CommandsService {

  isCloseCmd(line) {
    return line === commands.exit.command ? true : false;
  }

  logAllCommands() {
    const allCommands = Object.values(commands);

    logCommandsInfo(allCommands);
  }

  handleCmd(line) {
    const lineArguments = line.trim().split(' ');

    const userCmd = lineArguments[0];

    switch (userCmd) {
      case commands.list.command: {
        this.logAllCommands();
        break;
      }

      default: {
        throw new Error(NOT_EXISTING_COMMAND_ERROR(userCmd));
      }
    }
  }
}