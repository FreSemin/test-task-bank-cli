import {
  BANK_WAS_NOT_FOUND,
  ENTITIES,
  ENTITY_WITH_PROPERTY_EXISTS,
  NOT_EXISTING_OPERATION_ERROR,
  PROPERTIES
} from '../constants/index.js';
import { BankEntity } from '../entities/index.js';
import { commands } from '../models/index.js';
import { logBanksInfo, validateNumber, validateString } from '../utils/index.js';

export class BankService {
  #bankAvailableOperations = null;
  #bankEntity = null;

  constructor() {
    this.#bankAvailableOperations = commands.bank.availableOperations;

    this.#bankEntity = new BankEntity();
  }

  async #onGetInfo(infoArgument) {
    if (infoArgument === this.#bankAvailableOperations.info.arguments.all.name) {
      logBanksInfo(await this.#bankEntity.findAll());
    } else {
      const bankId = validateNumber(infoArgument, PROPERTIES.id);

      const bank = await this.#bankEntity.findOneById(bankId) || null;

      if (bank) {
        logBanksInfo([bank]);
      } else {
        console.log(BANK_WAS_NOT_FOUND(bankId));
      }
    }
  }

  async handleOperation(lineArguments) {
    const [operation, ...operationArguments] = lineArguments;

    switch (operation) {
      case commands.bank.availableOperations.info.name: {
        await this.#onGetInfo(operationArguments[0]);
        break;
      }


      default: {
        throw new Error(NOT_EXISTING_OPERATION_ERROR(operation, commands.bank.command));
      }
    }
  }
}