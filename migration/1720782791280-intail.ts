import { MigrationInterface, QueryRunner } from "typeorm";

export class Intail1720782791280 implements MigrationInterface {
    name = 'Intail1720782791280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" double NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "mileage" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mige" integer NOT NULL DEFAULT (0), "isPublish" boolean NOT NULL DEFAULT (0), "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "isAdmin" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`CREATE TABLE "temporary_report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" double NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "mileage" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mige" integer NOT NULL DEFAULT (0), "isPublish" boolean NOT NULL DEFAULT (0), "userId" integer, CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_report"("id", "price", "make", "model", "year", "mileage", "lng", "lat", "mige", "isPublish", "userId") SELECT "id", "price", "make", "model", "year", "mileage", "lng", "lat", "mige", "isPublish", "userId" FROM "report"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`ALTER TABLE "temporary_report" RENAME TO "report"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" RENAME TO "temporary_report"`);
        await queryRunner.query(`CREATE TABLE "report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" double NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "mileage" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mige" integer NOT NULL DEFAULT (0), "isPublish" boolean NOT NULL DEFAULT (0), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "report"("id", "price", "make", "model", "year", "mileage", "lng", "lat", "mige", "isPublish", "userId") SELECT "id", "price", "make", "model", "year", "mileage", "lng", "lat", "mige", "isPublish", "userId" FROM "temporary_report"`);
        await queryRunner.query(`DROP TABLE "temporary_report"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "report"`);
    }

}
