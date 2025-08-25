import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAppointmentTable1755972575007 implements MigrationInterface {

     public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela appointments
    await queryRunner.createTable(
      new Table({
        name: "appointments",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "date",
            type: "timestamp",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "userId",
            type: "uuid",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "appointments",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("appointments");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
    if (foreignKey) await queryRunner.dropForeignKey("appointments", foreignKey);

    await queryRunner.dropTable("appointments");
  }

}
