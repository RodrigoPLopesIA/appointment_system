import { MiddlewareFn } from "type-graphql";
import UserService from "../services/UserService";
import { AppDataSource } from "../data-source";
import User from "../entity/User";
import JWTService from "../services/JWTService";

const userService = new UserService(AppDataSource.getRepository(User));

interface Context {
  req: { headers: { authorization?: string } };
  user?: User;
}

export const auth: MiddlewareFn<Context> = async ({ context }, next) => {
  console.log(context);

  const authHeader = context.req.headers.authorization;

  if (!authHeader) {
    throw new Error("Authorization header missing");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = JWTService.verifyToken(token) as { id: string };

    const user = await userService.findById(payload.id);

    if (!user) {
      throw new Error("User not found");
    }

    context.user = user;

    return next();
  } catch (err) {
    console.log(err)
    throw new Error("Invalid or expired token");
  }
};
