import { Arg, Mutation, Resolver } from "type-graphql";
import User from "../dto/models/User";
import UserEntity from "../entity/User";
import LoginDTO from "../dto/input/login.input";
import AuthenticationService from "../services/AuthenticationService";
import { AppDataSource } from "../data-source";
import Token from "../dto/models/Token";

const authenticationService = new AuthenticationService(
  AppDataSource.getRepository(UserEntity)
);
@Resolver()
export default class LoginResolver {
  @Mutation(() => Token)
  public async login(@Arg("data") data: LoginDTO): Promise<Token> {
    const token = await authenticationService.login(data);
    return { token } as Token;
  }
}
