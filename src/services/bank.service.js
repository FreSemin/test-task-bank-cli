import {
  ENTITIES,
  ENTITY_WAS_DELETED,
  ENTITY_WITH_PROPERTY_EXISTS,
  ENTITY_WITH_PROPERTY_NOT_EXISTS,
  NOT_EXISTING_OPERATION_ERROR,
  PROPERTIES
} from '../constants/index.js';
import { BankEntity } from '../entities/index.js';
import { commands } from '../models/index.js';
import { logInfo, validateNumber, validateString } from '../utils/index.js';

export class BankService {
  #bankAvailableOperations = null;
  #bankEntity = null;

  constructor() {
    this.#bankAvailableOperations = commands.bank.availableOperations;

    this.#bankEntity = new BankEntity();
  }

  async #onGetInfo(infoArgument) {
    if (infoArgument === this.#bankAvailableOperations.info.arguments.all.name) {
      logInfo(await this.#bankEntity.findAll());
    } else {
      const bankId = validateNumber(infoArgument, PROPERTIES.id);

      const bank = await this.#bankEntity.findOneBy(PROPERTIES.id, bankId);

      if (bank) {
        logInfo([bank]);
      } else {
        throw new Error(ENTITY_WITH_PROPERTY_NOT_EXISTS(ENTITIES.bank, PROPERTIES.id, bankId));
      }
    }
  }

  async #onReg(operationArguments) {
    const bankName = validateString(operationArguments[0], PROPERTIES.name);

    const existingBank = await this.#bankEntity.findOneBy(PROPERTIES.name, bankName);

    if (existingBank) {
      throw new Error(ENTITY_WITH_PROPERTY_EXISTS(ENTITIES.bank, PROPERTIES.name, bankName));
    }

    const bank = await this.#bankEntity.create({ name: operationArguments[0] });

    logInfo([bank]);
  }

  async #onUpdate(operationArguments) {
    const bankId = validateNumber(operationArguments[0], PROPERTIES.id);

    const bankName = validateString(operationArguments[1], PROPERTIES.name);

    const existingBank = await this.#bankEntity.findOneBy(PROPERTIES.id, bankId);

    const existingBankName = await this.#bankEntity.findOneBy(PROPERTIES.name, bankName);

    if (!existingBank) {
      throw new Error(ENTITY_WITH_PROPERTY_NOT_EXISTS(ENTITIES.bank, PROPERTIES.id, bankId));
    }

    if (existingBankName) {
      throw new Error(ENTITY_WITH_PROPERTY_EXISTS(ENTITIES.bank, PROPERTIES.name, bankName));
    }

    const updatedBank = await this.#bankEntity.update(bankId, { name: bankName });

    logInfo([updatedBank]);
  }

  async #onDelete(operationArguments) {
    const bankId = validateNumber(operationArguments[0], PROPERTIES.id);

    const existingBank = await this.#bankEntity.findOneBy(PROPERTIES.id, bankId);

    if (!existingBank) {
      throw new Error(ENTITY_WITH_PROPERTY_NOT_EXISTS(ENTITIES.bank, PROPERTIES.id, bankId));
    }

    const deletedEntity = await this.#bankEntity.delete(bankId);

    if (deletedEntity) {
      console.log(ENTITY_WAS_DELETED(ENTITIES.bank, PROPERTIES.id, bankId));
    }
  }

  async handleOperation(lineArguments) {
    const [operation, ...operationArguments] = lineArguments;

    switch (operation) {
      case commands.bank.availableOperations.info.name: {
        await this.#onGetInfo(operationArguments[0]);
        break;
      }

      case commands.bank.availableOperations.reg.name: {
        await this.#onReg(operationArguments);
        break;
      }

      case commands.bank.availableOperations.update.name: {
        await this.#onUpdate(operationArguments);
        break;
      }

      case commands.bank.availableOperations.delete.name: {
        await this.#onDelete(operationArguments);
        break;
      }

      default: {
        throw new Error(NOT_EXISTING_OPERATION_ERROR(operation, commands.bank.command));
      }
    }
  }
}