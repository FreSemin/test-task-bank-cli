export const TEXT_ERROR = 'Error: ';
export const NOT_EXISTING_COMMAND_ERROR = (command) => `Command: ${command} doesn't exist!`;

export const NOT_EXISTING_OPERATION_ERROR = (operation, command) => `Operation: ${operation} doesn't exist for ${command}!`;

export const ARGUMENT_NOT_VALID_FORMAT = (argument, argumentName) => `Argument: ${argumentName} = ${argument} is in wrong format!`;
