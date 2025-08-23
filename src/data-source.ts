import { DataSource } from "typeorm";
import UserEntity from "./entity/User";
import { CreateUsersTable1716400000000 } from "./migration/1755962197551-create_user_table";
import { AddPasswordColumnToUserTable1755965476362 } from "./migration/1755965476362-add_password_column_to_user_table";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "root",
  password: "root",
  database: "appointment_db",
  synchronize: false,
  logging: false,
  entities: [UserEntity],
  migrations: [
    CreateUsersTable1716400000000,
    AddPasswordColumnToUserTable1755965476362,
  ],
  subscribers: [],
});
