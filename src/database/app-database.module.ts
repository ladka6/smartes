import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { migrations } from './migrations';
import { Repository } from 'typeorm';
import { Product } from '@smartex/schema/models/product';
import { Category } from '@smartex/schema/models/category';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'app',
      entities: [Product, Category],
      synchronize: false,
      migrations: migrations,
      migrationsRun: true,
    }),
  ],
  providers: [Repository],
  exports: [TypeOrmModule],
})
export class AppDatabaseModule {}
