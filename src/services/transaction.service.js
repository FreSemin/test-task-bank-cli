import {
  NOT_EXISTING_OPERATION_ERROR,
} from '../constants/index.js';
import { TransactionEntity } from '../entities/index.js';
import { commands } from '../models/index.js';

export class TransactionService {
  #transactionAvailableOperations = null;

  #transactionEntity = null;

  constructor() {
    this.#transactionAvailableOperations = commands.transaction.availableOperations;

    this.#transactionEntity = new TransactionEntity();
  }

  async #onNew(operationArguments) {

  }

  async handleOperation(lineArguments) {
    const [operation, ...operationArguments] = lineArguments;

    switch (operation) {
      case this.#transactionAvailableOperations.new.name: {
        await this.#onNew(operationArguments);
        break;
      }

      default: {
        throw new Error(NOT_EXISTING_OPERATION_ERROR(operation, commands.transaction.command));
      }
    }
  }
}