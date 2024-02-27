import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { CommandsService } from '../services/index.js';
import { LIST_ALL_COMMANDS_TEXT, WELCOME_USER_TEXT } from '../constants/index.js';

export default class CLI {
  #readLine = null;

  #commandsService = null;

  constructor() {
    this.#commandsService = new CommandsService();

    this.#initReadLine();

    this.#start();
  }

  #initReadLine() {
    this.#readLine = readline.createInterface({ input, output });
  }

  #welcomeUser() {
    console.log(WELCOME_USER_TEXT);
    console.log(LIST_ALL_COMMANDS_TEXT);
  }

  #start() {
    this.#welcomeUser();
  }
}