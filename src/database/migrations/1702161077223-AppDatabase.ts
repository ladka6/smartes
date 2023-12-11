import { MigrationInterface, QueryRunner } from 'typeorm';

export class AppDatabase1702161077223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/*sql*/ `
        CREATE TABLE "public"."product" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "title" VARCHAR(255) NOT NULL,
            "description" VARCHAR(255) NOT NULL,
            "price" INTEGER NOT NULL,
            "categoryId" uuid,
            PRIMARY KEY ("id")
        );

        CREATE TABLE "public"."category" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "category" VARCHAR(255) NOT NULL,
            PRIMARY KEY ("id")
        );

        ALTER TABLE "public"."product"
        ADD CONSTRAINT "FK_categoryId" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id");
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/*sql*/ `
        DROP TABLE "public"."product";
        DROP TABLE "public"."category";
    `);
  }
}
