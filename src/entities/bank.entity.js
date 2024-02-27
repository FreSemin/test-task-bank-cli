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

  async update(bankId, bankData) {
    return await this.#prismaClient.bank.update({
      where: {
        id: bankId
      },
      data: bankData
    });
  }

  async findAll() {
    return await this.#prismaClient.bank.findMany();
  }

  async findOneBy(propertyName, bankId) {
    return await this.#prismaClient.bank.findUnique({
      where: {
        [propertyName]: bankId,
      }
    });
  }

  async delete(bankId) {
    return await this.#prismaClient.bank.delete({
      where: {
        id: bankId,
      }
    });
  }
}