import {
  CANNOT_TRANSACTION_ACCOUNT,
  ENTITIES,
  ENTITY_WITH_PROPERTY_NOT_EXISTS,
  NOT_ENOUGH_MONEY,
  NOT_EXISTING_OPERATION_ERROR,
  NOT_VALID_NUMBER,
  PROPERTIES,
} from '../constants/index.js';
import { AccountEntity, ClientEntity, TransactionEntity } from '../entities/index.js';
import { commands } from '../models/index.js';
import { logInfo, validateNumber } from '../utils/index.js';

export class TransactionService {
  #transactionAvailableOperations = null;

  #transactionEntity = null;
  #accountEntity = null;

  #clientEntity = null;

  constructor() {
    this.#transactionAvailableOperations = commands.transaction.availableOperations;

    this.#transactionEntity = new TransactionEntity();

    this.#accountEntity = new AccountEntity();

    this.#clientEntity = new ClientEntity();
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

  async #onHistory(operationArguments) {
    const clientId = validateNumber(operationArguments[0], PROPERTIES.id);

    const existingClient = await this.#clientEntity.findOneBy(PROPERTIES.id, clientId);

    if (!existingClient) {
      throw new Error(ENTITY_WITH_PROPERTY_NOT_EXISTS(ENTITIES.client, PROPERTIES.id, clientId));
    }

    // TODO: create validations for time
    const parsedFromDate = new Date(operationArguments[1]).getTime();
    const parsedToDate = new Date(operationArguments[2]).getTime();

    let transactionsHistory = await this.#transactionEntity.findManyByClientId(clientId, parsedFromDate, parsedToDate);


    // TODO: parse data to readable format
    // TODO: move logic to utils
    transactionsHistory = transactionsHistory.map((transaction) => {
      const { createdAt, ...transactionData } = transaction;
      return {
        ...transactionData,
        createdAt: new Date(Number(createdAt))
      };
    });

    logInfo(transactionsHistory);
  }

  async handleOperation(lineArguments) {
    const [operation, ...operationArguments] = lineArguments;

    switch (operation) {
      case this.#transactionAvailableOperations.new.name: {
        await this.#onNew(operationArguments);
        break;
      }

      case this.#transactionAvailableOperations.history.name: {
        await this.#onHistory(operationArguments);
        break;
      }

      default: {
        throw new Error(NOT_EXISTING_OPERATION_ERROR(operation, commands.transaction.command));
      }
    }
  }
}