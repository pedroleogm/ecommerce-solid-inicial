import { Container } from 'inversify';
import { PrismaClient } from '@prisma/client';
import { TYPES } from './types';

// Contratos e Abstrações
import { IProductRepository } from '../repositories/IProductRepository';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { IMailProvider } from '../providers/IMailProvider';
import { IPaymentMethod } from '../payments/IPaymentMethod';

// Implementações para DEV
import { PrismaProductRepository } from '../repositories/PrismaProductRepository';
import { PrismaOrderRepository } from '../repositories/PrismaOrderRepository';
import { EtherealMailProvider } from '../providers/EtherealMailProvider';

// Implementações para TEST
import { InMemoryProductRepository } from '../repositories/InMemoryProductRepository';
import { InMemoryOrderRepository } from '../repositories/InMemoryOrderRepository';
import { ConsoleMailProvider } from '../providers/ConsoleMailProvider';

// Formas de Pagamento
import { CreditCardPayment } from '../payments/CreditCardPayment';
import { DebitCardPayment } from '../payments/DebitCardPayment';
import { PixPayment } from '../payments/PixPayment';
import { PaymentMethodRegistry } from '../payments/PaymentMethodRegistry';

// Serviços e Controller
import { NotificationService } from '../services/NotificationService';
import { OrderService } from '../services/OrderService';
import { OrderController } from '../controllers/OrderController';

const container = new Container();
const env = process.env.APP_ENV || 'dev';

// Registro do PrismaClient
container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());

// Alternância entre os ambientes dev e test
if (env === 'test') {
  container.bind<IProductRepository>(TYPES.ProductRepository).to(InMemoryProductRepository).inSingletonScope();
  container.bind<IOrderRepository>(TYPES.OrderRepository).to(InMemoryOrderRepository).inSingletonScope();
  container.bind<IMailProvider>(TYPES.MailProvider).to(ConsoleMailProvider).inSingletonScope();
} else {
  container.bind<IProductRepository>(TYPES.ProductRepository).to(PrismaProductRepository).inSingletonScope();
  container.bind<IOrderRepository>(TYPES.OrderRepository).to(PrismaOrderRepository).inSingletonScope();
  container.bind<IMailProvider>(TYPES.MailProvider).to(EtherealMailProvider).inSingletonScope();
}

// Registro das estratégias de pagamento
container.bind<IPaymentMethod>(TYPES.PaymentMethod).to(CreditCardPayment);
container.bind<IPaymentMethod>(TYPES.PaymentMethod).to(DebitCardPayment);
container.bind<IPaymentMethod>(TYPES.PaymentMethod).to(PixPayment);
container.bind<PaymentMethodRegistry>(TYPES.PaymentMethodRegistry).to(PaymentMethodRegistry);

// Registro de serviços e controller
container.bind<NotificationService>(TYPES.NotificationService).to(NotificationService);
container.bind<OrderService>(TYPES.OrderService).to(OrderService);
container.bind<OrderController>(TYPES.OrderController).to(OrderController);

export { container };