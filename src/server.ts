import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import path from "node:path";
import { AppDataSource } from "./data-source";
import UserResolver from "./resolvers/User.resolver";
import LoginResolver from "./resolvers/login.resolver";
import AppointmentResolver from "./resolvers/Appointments.resolver";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

async function bootstrap() {

  const schema = await buildSchema({
    resolvers: [UserResolver, LoginResolver, AppointmentResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  await server.start();

  const app = express();

  app.use(
    "/graphql",
    cors({
      origin: "*", 
      credentials: true,
    })
  );

  server.applyMiddleware({ app, path: "/graphql", cors: true });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`HTTP server running on http://localhost:${PORT}/graphql`);
  });
}

AppDataSource.initialize()
  .then(async () => {
    console.log("📦 Data Source Running");
    bootstrap();
  })
  .catch((error) => console.log("❌ Error on Data Source", error));
