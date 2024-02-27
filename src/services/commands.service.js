import {
  COMMAND_ARGUMENT_LOG,
  COMMAND_LOG,
  COMMAND_OPERATION_LOG,
  DESCRIPTION_LOG,
  EXAMPLE_LOG,
  NOT_EXISTING_COMMAND_ERROR
} from '../constants/index.js';
import { commands } from '../models/index.js';

export class CommandsService {
  constructor() { }


  isCloseCmd(line) {
    return line === commands.exit.command ? true : false;
  }

  #logOperationArguments(operation) {
    operation.arguments.forEach((argument) => {
      console.group(COMMAND_ARGUMENT_LOG, argument.name);

      console.log(DESCRIPTION_LOG, argument.description);
      console.log(EXAMPLE_LOG, argument.example);

      console.groupEnd();
    });
  }

  #logAvailableOperations(command) {
    if (command.availableOperations?.length > 0) {
      command.availableOperations.forEach((operation) => {
        console.group(COMMAND_OPERATION_LOG, operation.name);

        console.log(DESCRIPTION_LOG, operation.description);

        this.#logOperationArguments(operation);

        console.groupEnd();
      });
    }
  }

  logAllCmds() {
    const allCommands = Object.values(commands);

    allCommands.forEach((command) => {
      console.group(COMMAND_LOG, command.command);

      console.log(DESCRIPTION_LOG, command.description);
      console.log(EXAMPLE_LOG, command.example);

      this.#logAvailableOperations(command);

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