import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductService, CategoryService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product } from '@smartex/schema';
import { AppDatabaseModule } from './database/app-database.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), AppDatabaseModule],
  controllers: [AppController],
  providers: [ProductService, CategoryService],
})
export class AppModule {}
