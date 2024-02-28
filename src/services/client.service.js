import {
  ENTITIES,
  ENTITY_WITH_PROPERTY_NOT_EXISTS,
  NOT_EXISTING_OPERATION_ERROR,
  PROPERTIES
} from '../constants/index.js';
import { ClientEntity } from '../entities/index.js';
import { commands } from '../models/index.js';
import { logInfo, validateNumber, validateString } from '../utils/index.js';


export class ClientService {
  #clientAvailableOperations = null;

  #clientEntity = null;

  constructor() {
    this.#clientAvailableOperations = commands.client.availableOperations;

    this.#clientEntity = new ClientEntity();
  }

  async #onGetInfo(infoArgument) {
    if (infoArgument === this.#clientAvailableOperations.info.arguments.all.name) {
      logInfo(await this.#clientEntity.findAll());

    } else {
      const clientId = validateNumber(infoArgument, PROPERTIES.id);

      const client = await this.#clientEntity.findOneBy(PROPERTIES.id, clientId);

      if (client) {
        logInfo([client]);
      } else {
        throw new Error(ENTITY_WITH_PROPERTY_NOT_EXISTS(ENTITIES.bank, PROPERTIES.id, clientId));
      }
    }
  }

  async handleOperation(lineArguments) {
    const [operation, ...operationArguments] = lineArguments;

    switch (operation) {
      case commands.client.availableOperations.info.name: {
        await this.#onGetInfo(operationArguments[0]);
        break;
      }

      default: {
        throw new Error(NOT_EXISTING_OPERATION_ERROR(operation, commands.client.command));
      }
    }
  }
}