import { NOT_EXISTING_OPERATION_ERROR } from '../constants/index.js';
import { commands } from '../models/index.js';

export class BankService {
  #bankAvailableOperations = null;

  constructor() {
    this.#bankAvailableOperations = commands.bank.availableOperations;
  }

  #onGetInfo(infoArgument) {
    if (infoArgument === this.#bankAvailableOperations.info.arguments.all.name) {
      console.log('get all');
    } else {
      console.log('get one');
    }
  }

  handleOperation(lineArguments) {
    switch (lineArguments[0]) {
      case commands.bank.availableOperations.info.name: {
        this.#onGetInfo(lineArguments[1]);
        break;
      }


      default: {
        throw new Error(NOT_EXISTING_OPERATION_ERROR(lineArguments[0], commands.bank.command));
      }
    }
  }
}