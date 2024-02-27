import { prismaClientService } from '../services/index.js';

export class ClientEntity {

  #prismaClient = null;

  constructor() {
    this.#prismaClient = prismaClientService.prismaClient;
  }

  async create(newClient) {
    return await this.#prismaClient.client.create({
      data: newClient
    });
  }

  async update(clientId, clientData) {
    return await this.#prismaClient.client.update({
      where: {
        id: clientId
      },
      data: clientData
    });
  }

  async findAll() {
    return await this.#prismaClient.client.findMany();
  }

  async findOneBy(propertyName, uniqId) {
    return await this.#prismaClient.client.findUnique({
      where: {
        [propertyName]: uniqId,
      }
    });
  }

  async delete(clientId) {
    return await this.#prismaClient.client.delete({
      where: {
        id: clientId,
      }
    });
  }
}