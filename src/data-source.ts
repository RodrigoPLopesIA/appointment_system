import { DataSource } from "typeorm";
import UserEntity from "./entity/User";
import { CreateUsersTable1716400000000 } from "./migration/1755962197551-create_user_table";

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
  migrations: [CreateUsersTable1716400000000],
  subscribers: [],
});
