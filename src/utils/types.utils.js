import { ARGUMENT_NOT_VALID_FORMAT } from '../constants/index.js';

export const validateNumber = (toNumber) => {
  const num = Number(toNumber);

  if (isNaN(num)) {
    throw new Error(ARGUMENT_NOT_VALID_FORMAT(toNumber));
  }

  return num;
};