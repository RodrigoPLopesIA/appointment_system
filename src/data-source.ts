import { DataSource } from "typeorm";
import UserEntity from "./entity/User";
import { CreateUsersTable1716400000000 } from "./migration/1755962197551-create_user_table";
import { AddPasswordColumnToUserTable1755965476362 } from "./migration/1755965476362-add_password_column_to_user_table";
import { CreateAppointmentTable1755972575007 } from "./migration/1755972575007-create_appointment_table";
import { Appointment } from "./entity/Appointment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 5433,
  username: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "root",
  database: process.env.DATABASE || "appointment_db",
  synchronize: false,
  logging: false,
  entities: [UserEntity, Appointment],
  migrations: [
    CreateUsersTable1716400000000,
    AddPasswordColumnToUserTable1755965476362,
    CreateAppointmentTable1755972575007
  ],
  subscribers: [],
});
