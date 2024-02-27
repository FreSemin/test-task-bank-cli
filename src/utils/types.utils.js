import { ARGUMENT_NOT_VALID_FORMAT } from '../constants/index.js';

export const validateNumber = (toNumber, propertyName) => {
  const num = Number(toNumber);

  if (isNaN(num)) {
    throw new Error(ARGUMENT_NOT_VALID_FORMAT(toNumber, propertyName));
  }

  return num;
};

export const validateString = (string, propertyName) => {
  if (!string) {
    throw new Error(ARGUMENT_NOT_VALID_FORMAT(string, propertyName));
  }

  return string.trim();
};