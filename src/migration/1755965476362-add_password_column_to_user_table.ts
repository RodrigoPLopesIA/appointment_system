import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPasswordColumnToUserTable1755965476362 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn("users", new TableColumn({
            name: "password",
            type: "varchar",
            isNullable: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn("users", "password")
    }

}
