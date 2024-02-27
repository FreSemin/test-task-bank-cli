import { COMMAND_DESCRIPTION_LOG, COMMAND_EXAMPLE_LOG, COMMAND_LOG, NOT_EXISTING_COMMAND_ERROR } from '../constants/index.js';
import { commands } from '../models/index.js';

export class CommandsService {
  constructor() { }


  isCloseCmd(line) {
    return line === commands.exit.command ? true : false;
  }

  logAllCmds() {
    const allCommands = Object.values(commands);

    allCommands.forEach((command) => {
      console.group(command.command);
      console.log(COMMAND_LOG, command.command);
      console.log(COMMAND_DESCRIPTION_LOG, command.description);
      console.log(COMMAND_EXAMPLE_LOG, command.example);
      console.groupEnd();
    });
  }

  handleCmd(line) {
    const lineArguments = line.trim().split(' ');

    const userCmd = lineArguments[0];

    switch (userCmd) {
      case commands.list.command: {
        this.logAllCmds();
        break;
      }

      default: {
        throw new Error(NOT_EXISTING_COMMAND_ERROR(userCmd));
      }
    }
  }
}