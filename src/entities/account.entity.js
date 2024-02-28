import { prismaClientService } from '../services/index.js';

export class AccountEntity {

  #prismaClient = null;

  constructor() {
    this.#prismaClient = prismaClientService.prismaClient;
  }

  async create(newAccount) {
    return await this.#prismaClient.account.create({
      data: newAccount
    });
  }

  async update(accountId, accountData) {
    return await this.#prismaClient.account.update({
      where: {
        id: accountId
      },
      data: accountData
    });
  }

  async findAll() {
    return await this.#prismaClient.account.findMany();
  }

  async findManyByClientId(clientId) {
    return await this.#prismaClient.account.findMany({
      where: {
        clientId
      }
    });
  }

  async findOneBy(propertyName, uniqId) {
    return await this.#prismaClient.account.findUnique({
      where: {
        [propertyName]: uniqId,
      }
    });
  }

  async delete(accountId) {
    return await this.#prismaClient.account.delete({
      where: {
        id: accountId,
      }
    });
  }
}