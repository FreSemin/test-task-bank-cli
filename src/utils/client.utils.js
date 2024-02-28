import { ClientType } from '@prisma/client';

export const validateClientType = (type) => {
  return type === ClientType.LEGAL_ENTITY ? ClientType.LEGAL_ENTITY : ClientType.INDIVIDUAL;
};