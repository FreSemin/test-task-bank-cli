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


  async findManyByClientId(clientId, from, to) {
    return await this.#prismaClient.transaction.findMany({
      where: {
        OR: [
          {
            from: {
              clientId: clientId,
            },
            createdAt: {
              gte: from,
              lte: to,
            },
          },
          {
            to: {
              clientId: clientId,
            },
            createdAt: {
              gte: from,
              lte: to,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

  }
}