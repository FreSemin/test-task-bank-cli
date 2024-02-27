import { BANK_WAS_NOT_FOUND, NOT_EXISTING_OPERATION_ERROR } from '../constants/index.js';
import { BankEntity } from '../entities/index.js';
import { commands } from '../models/index.js';
import { logBanksInfo, validateNumber } from '../utils/index.js';

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
      const bankId = validateNumber(infoArgument);

      const bank = await this.#bankEntity.findOneById(bankId) || null;

      if (bank) {
        logBanksInfo([bank]);
      } else {
        console.log(BANK_WAS_NOT_FOUND(bankId));
      }
    }
  }

  async handleOperation(lineArguments) {
    switch (lineArguments[0]) {
      case commands.bank.availableOperations.info.name: {
        await this.#onGetInfo(lineArguments[1]);
        break;
      }


      default: {
        throw new Error(NOT_EXISTING_OPERATION_ERROR(lineArguments[0], commands.bank.command));
      }
    }
  }
}