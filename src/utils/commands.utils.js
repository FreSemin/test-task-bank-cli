import {
  COMMAND_ARGUMENT_LOG,
  DESCRIPTION_LOG,
  EXAMPLE_LOG,
  COMMAND_OPERATION_LOG,
  COMMAND_LOG
} from '../constants/index.js';

export const logOperationArguments = (operation) => {
  if (operation.arguments) {
    const operationArguments = Object.values(operation.arguments);

    operationArguments.forEach((argument) => {
      console.group(COMMAND_ARGUMENT_LOG, argument.name);

      console.log(DESCRIPTION_LOG, argument.description);
      console.log(EXAMPLE_LOG, argument.example);

      console.groupEnd();
    });
  }
};

export const logAvailableOperations = (command) => {
  if (command.availableOperations) {
    const operations = Object.values(command.availableOperations);

    operations.forEach((operation) => {
      console.group(COMMAND_OPERATION_LOG, operation.name);

      console.log(DESCRIPTION_LOG, operation.description);

      logOperationArguments(operation);

      console.groupEnd();
    });
  }
};

export const logCommandsInfo = (commands) => {
  commands.forEach((command) => {
    console.group(COMMAND_LOG, command.command);

    console.log(DESCRIPTION_LOG, command.description);
    console.log(EXAMPLE_LOG, command.example);

    logAvailableOperations(command);

    console.groupEnd();
  });
};