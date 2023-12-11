import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product';
import { Exclude } from 'class-transformer';

@Entity('category')
export class Category {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @Column()
  category: string;
}
