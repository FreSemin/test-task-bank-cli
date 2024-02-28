import { NOT_EXISTING_OPERATION_ERROR } from '../constants/index.js';
import { ClientEntity } from '../entities/index.js';
import { commands } from '../models/index.js';

export class ClientService {
  #clientAvailableOperations = null;

  #clientEntity = null;

  constructor() {
    this.#clientAvailableOperations = commands.client.availableOperations;

    this.#clientEntity = new ClientEntity();
  }

  async handleOperation(lineArguments) {
    const [operation, ...operationArguments] = lineArguments;

    switch (operation) {

      default: {
        throw new Error(NOT_EXISTING_OPERATION_ERROR(operation, commands.client.command));
      }
    }
  }
}