import { injectable } from 'inversify';
import { ProductData } from '../domain/IProduct';
import { IProductRepository } from './IProductRepository';

@injectable()
export class InMemoryProductRepository implements IProductRepository {
  private products: ProductData[] = [
    { id: 1, name: 'O Programador Pragmático (Livro Físico)', type: 'physical', price: 100.0 },
    { id: 2, name: 'Clean Code (E-book)', type: 'digital', price: 50.0 },
  ];

  async findById(id: number): Promise<ProductData | null> {
    const product = this.products.find((p) => p.id === id);
    return product || null;
  }
}