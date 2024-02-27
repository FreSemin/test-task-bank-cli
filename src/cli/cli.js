import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { CommandsService } from '../services/index.js';

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

  #start() {
    console.log('CLI started!');
  }
}