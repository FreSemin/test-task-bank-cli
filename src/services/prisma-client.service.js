import { PrismaClient } from '@prisma/client';

class PrismaClientService {
  static #instance = null;

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new PrismaClientService();
    }
    return this.#instance;
  }

  constructor() {
    this.prismaClient = new PrismaClient();
  }
}

export const prismaClientService = PrismaClientService.getInstance();