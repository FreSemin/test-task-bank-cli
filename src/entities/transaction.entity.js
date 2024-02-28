import { prismaClientService } from '../services/index.js';

export class TransactionEntity {

  #prismaClient = null;

  constructor() {
    this.#prismaClient = prismaClientService.prismaClient;
  }

  async create(newTransaction) {
    return await this.#prismaClient.transaction.create({
      data: newTransaction
    });
  }
}