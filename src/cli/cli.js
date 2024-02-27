import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export default class CLI {
  #readLine = null;

  constructor() {

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