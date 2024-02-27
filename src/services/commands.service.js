import { commands } from '../models/index.js';

export class CommandsService {
  constructor() { }


  isCloseCmd(line) {
    return line === commands.exit.command ? true : false;
  }

  handleCmd(line) {
    console.log(line);
  }
}