import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import UserResolver from "./resolvers/User.resolver";
import { buildSchema } from "type-graphql";
import path = require("node:path");
import { AppDataSource } from "./data-source";
import LoginResolver from "./resolvers/login.resolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [UserResolver, LoginResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen();

  console.log(`HTTP server running on: ${url}`);
}
AppDataSource.initialize()
  .then(async () => {
    console.log("📦 Data Source inicializado");

    bootstrap();
  })
  .catch((error) => console.log("❌ Erro no Data Source", error));
