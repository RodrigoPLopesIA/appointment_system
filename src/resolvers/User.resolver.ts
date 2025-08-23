import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UserService from "../services/UserService";
import User from "../dto/models/User";
import CreateUserDTO from "../dto/input/create-user.input";
import UserEntity from "../entity/User";
import { AppDataSource } from "../data-source";

const userService = new UserService(
  AppDataSource.getRepository<UserEntity>(UserEntity)
);

@Resolver()
export default class UserResolver {
  @Mutation(() => User)
  public async createUser(@Arg("data") data: CreateUserDTO): Promise<User> {
    return await userService.save(data as UserEntity);
  }
}
