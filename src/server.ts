import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import UserResolver from "./resolvers/User.resolver";
import { buildSchema } from "type-graphql";
import path = require("node:path");
import { AppDataSource } from "./data-source";
import LoginResolver from "./resolvers/login.resolver";
import AppointmentResolver from "./resolvers/Appointments.resolver";
import * as dotenv from "dotenv"

dotenv.config()

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [UserResolver, LoginResolver, AppointmentResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({ schema, context: ({ req }) => ({ req }) });

  const { url } = await server.listen();

  console.log(`HTTP server running on: ${url}`);
}
AppDataSource.initialize()
  .then(async () => {
    console.log("📦 Data Source Running");

    bootstrap();
  })
  .catch((error) => console.log("❌ Error on Data Source", error));
