export const TEXT_ERROR = 'Error: ';
export const NOT_EXISTING_COMMAND_ERROR = (command) => `Command: ${command} doesn't exist!`;

export const NOT_EXISTING_OPERATION_ERROR = (operation, command) => `Operation: ${operation} doesn't exist for ${command}!`;

export const ARGUMENT_NOT_VALID_FORMAT = (argument, argumentName) => `Argument: ${argumentName} = ${argument} is in wrong format!`;

export const ENTITY_WITH_PROPERTY_EXISTS = (entityName, propertyName, propertyValue) =>
  `Entity ${entityName} with ${propertyName} = ${propertyValue} already exists!`;

export const ENTITY_WITH_PROPERTY_NOT_EXISTS = (entityName, propertyName, propertyValue) =>
  `Entity ${entityName} with ${propertyName} = ${propertyValue} not exists!`;

export const NOT_ENOUGH_MONEY = 'Not enough money for operation';

