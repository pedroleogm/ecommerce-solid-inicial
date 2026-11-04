import { injectable, multiInject } from 'inversify';
import { IPaymentMethod } from './IPaymentMethod';
import { TYPES } from '../container/types';

@injectable()
export class PaymentMethodRegistry {
  constructor(@multiInject(TYPES.PaymentMethod) private methods: IPaymentMethod[]) {}

  get(name: string): IPaymentMethod | undefined {
    return this.methods.find((method) => method.name === name);
  }
}