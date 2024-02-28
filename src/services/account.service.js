import {
  ENTITIES,
  ENTITY_WITH_PROPERTY_NOT_EXISTS,
  NOT_EXISTING_OPERATION_ERROR,
  PROPERTIES
} from '../constants/index.js';
import { AccountEntity, ClientEntity } from '../entities/index.js';
import { commands } from '../models/index.js';
import { logInfo, validateNumber } from '../utils/index.js';


export class AccountService {
  #accountAvailableOperations = null;

  #accountEntity = null;

  #clientEntity = null;

  constructor() {
    this.#accountAvailableOperations = commands.account.availableOperations;

    this.#accountEntity = new AccountEntity();

    this.#clientEntity = new ClientEntity();
  }

  async #onGetInfo(operationArguments) {
    const clientId = validateNumber(operationArguments[0], PROPERTIES.id);

    const client = await this.#clientEntity.findOneBy(PROPERTIES.id, clientId);

    if (!client) {
      throw new Error(ENTITY_WITH_PROPERTY_NOT_EXISTS(ENTITIES.client, PROPERTIES.id, clientId));
    }

    const accounts = await this.#accountEntity.findManyByClientId(clientId);

    logInfo(accounts);
  }

  async handleOperation(lineArguments) {
    const [operation, ...operationArguments] = lineArguments;

    switch (operation) {
      case this.#accountAvailableOperations.info.name: {
        await this.#onGetInfo(operationArguments);
        break;
      }

      default: {
        throw new Error(NOT_EXISTING_OPERATION_ERROR(operation, commands.account.command));
      }
    }
  }
}