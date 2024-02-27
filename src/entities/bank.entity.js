import { prismaClientService } from '../services/index.js';

export class BankEntity {

  #prismaClient = null;

  constructor() {
    this.#prismaClient = prismaClientService.prismaClient;
  }

  async findAll() {
    return await this.#prismaClient.bank.findMany();
  }

  async findOneById(bankId) {
    return await this.#prismaClient.bank.findUnique({
      where: {
        id: bankId,
      }
    });
  }
}