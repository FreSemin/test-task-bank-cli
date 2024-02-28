import {
  CANNOT_TRANSACTION_ACCOUNT,
  ENTITIES,
  ENTITY_WITH_PROPERTY_NOT_EXISTS,
  NOT_ENOUGH_MONEY,
  NOT_EXISTING_OPERATION_ERROR,
  NOT_VALID_NUMBER,
  PROPERTIES,
} from '../constants/index.js';
import { AccountEntity, TransactionEntity } from '../entities/index.js';
import { commands } from '../models/index.js';
import { logInfo, validateNumber } from '../utils/index.js';

export class TransactionService {
  #transactionAvailableOperations = null;

  #transactionEntity = null;
  #accountEntity = null;

  constructor() {
    this.#transactionAvailableOperations = commands.transaction.availableOperations;

    this.#transactionEntity = new TransactionEntity();

    this.#accountEntity = new AccountEntity();
  }

  async #onNew(operationArguments) {
    const amountNumber = validateNumber(operationArguments[2], PROPERTIES.amount);

    if (amountNumber < 0) {
      throw new Error(NOT_VALID_NUMBER);
    }

    const fromAccountId = validateNumber(operationArguments[0], PROPERTIES.id);

    const existingFromAccount = await this.#accountEntity.findOneBy(PROPERTIES.id, fromAccountId);

    if (!existingFromAccount) {
      throw new Error(ENTITY_WITH_PROPERTY_NOT_EXISTS(ENTITIES.account, PROPERTIES.id, fromAccountId));
    }

    if (existingFromAccount.balance - amountNumber < 0) {
      throw new Error(NOT_ENOUGH_MONEY);
    }

    const toAccountId = validateNumber(operationArguments[1], PROPERTIES.id);

    const existingToAccount = await this.#accountEntity.findOneBy(PROPERTIES.id, toAccountId);

    if (!existingToAccount) {
      throw new Error(ENTITY_WITH_PROPERTY_NOT_EXISTS(ENTITIES.account, PROPERTIES.id, toAccountId));
    }

    if (fromAccountId === toAccountId) {
      throw new Error(CANNOT_TRANSACTION_ACCOUNT);
    }

    const transaction = await this.#transactionEntity.create({
      amount: amountNumber,
      fromId: fromAccountId,
      toId: toAccountId,
      createdAt: new Date().getTime()
    });

    await this.#accountEntity.update(fromAccountId, {
      ...existingFromAccount,
      balance: existingFromAccount.balance - amountNumber
    });

    await this.#accountEntity.update(toAccountId, {
      ...existingToAccount,
      balance: existingToAccount.balance + amountNumber
    });

    logInfo([transaction]);
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