import { injectable, inject } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { Order, OrderLine } from '../domain/Order';
import { IOrderRepository } from './IOrderRepository';
import { TYPES } from '../container/types';

@injectable()
export class PrismaOrderRepository implements IOrderRepository {
  // O @inject(TYPES.PrismaClient) é OBRIGATÓRIO aqui!
  constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}

  async create(customer: string, items: OrderLine[], total: number): Promise<Order> {
    const row = await this.prisma.order.create({
      data: { customer, items: JSON.stringify(items), total, status: 'confirmed' },
    });
    return { id: row.id, customer: row.customer, items, total: row.total, status: row.status };
  }
}