import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@smartex/schema';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  public async findOrGenerate(category: string) {
    const isCategoryExists = this.findOneByCategory(category);

    if (isCategoryExists) {
      return isCategoryExists;
    }

    const newCategory = this.generate({ category });
    //transform
    return newCategory;
  }

  private async findOneByCategory(category: string) {
    return this.categoryRepository.findOne({
      where: { category },
    });
  }

  public async createCategory(category: string) {
    //Validate

    //Check if exists
    const isExists = await this.categoryRepository.findOne({
      where: { category: category },
    });
    if (isExists) {
      return isExists;
    }

    return this.generate({ category });
  }

  private async generate(data: DeepPartial<Category>) {
    let category = this.categoryRepository.create(data);
    category = await this.categoryRepository.save(category);
    return category;
  }
}
