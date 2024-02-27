import { NOT_EXISTING_OPERATION_ERROR } from '../constants/index.js';
import { BankEntity } from '../entities/index.js';
import { commands } from '../models/index.js';
import { logBanksInfo } from '../utils/index.js';

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
      console.log('get one');
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