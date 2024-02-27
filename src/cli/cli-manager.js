import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { CommandsService } from '../services/index.js';
import {
  ENTER_COMMAND_TEXT,
  EXIT_USER_TEXT,
  LIST_ALL_COMMANDS_TEXT,
  TEXT_ERROR,
  WELCOME_USER_TEXT
} from '../constants/index.js';

export class CLIManager {
  #readLine = null;

  #commandsService = null;

  constructor() {
    this.#commandsService = new CommandsService();

    this.#initReadLine();

    this.#start();
  }

  #promptUserForInput() {
    console.log(ENTER_COMMAND_TEXT);

    this.#readLine.prompt();
  }

  async #onLine(line) {
    try {
      const isCloseCmd = this.#commandsService.isCloseCmd(line);

      if (isCloseCmd) {
        this.#readLine.close();
      }

      await this.#commandsService.handleCmd(line);

      this.#promptUserForInput();
    } catch (error) {
      console.log(TEXT_ERROR, error.message);

      this.#promptUserForInput();
    }
  }

  #onClose() {
    console.log(EXIT_USER_TEXT);

    process.exit(1);
  }

  #initReadLine() {
    this.#readLine = readline.createInterface({ input, output });

    this.#readLine.on('line', (line) => this.#onLine(line));

    this.#readLine.on('close', () => this.#onClose());
  }

  #welcomeUser() {
    console.log(WELCOME_USER_TEXT);
    console.log(LIST_ALL_COMMANDS_TEXT);
  }

  #start() {
    this.#welcomeUser();

    this.#promptUserForInput();
  }
}