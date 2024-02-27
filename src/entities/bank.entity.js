import { prismaClientService } from '../services/index.js';

export class BankEntity {

  #prismaClient = null;

  constructor() {
    this.#prismaClient = prismaClientService.prismaClient;
  }

  async create(newBank) {
    return await this.#prismaClient.bank.create({
      data: newBank
    });
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