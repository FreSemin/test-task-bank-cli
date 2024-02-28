import { NOT_EXISTING_COMMAND_ERROR } from '../constants/index.js';
import { commands } from '../models/index.js';
import { logCommandsInfo } from '../utils/index.js';
import { BankService, ClientService, TransactionService } from './index.js';

export class CommandsService {

  #bankService = null;

  #clientService = null;

  #transactionService = null;

  constructor() {
    this.#bankService = new BankService();
    this.#clientService = new ClientService();
    this.#transactionService = new TransactionService();
  }

  isCloseCmd(line) {
    return line === commands.exit.command ? true : false;
  }

  logAllCommands() {
    const allCommands = Object.values(commands);

    logCommandsInfo(allCommands);
  }

  async handleCmd(line) {
    const [userCmd, ...lineArguments] = line.trim().split(' ');

    switch (userCmd) {
      case commands.list.command: {
        this.logAllCommands();
        break;
      }

      case commands.bank.command: {
        await this.#bankService.handleOperation(lineArguments);
        break;
      }

      case commands.client.command: {
        await this.#clientService.handleOperation(lineArguments);
        break;
      }

      case commands.transaction.command: {
        await this.#transactionService.handleOperation(lineArguments);
        break;
      }

      default: {
        throw new Error(NOT_EXISTING_COMMAND_ERROR(userCmd));
      }
    }
  }
}