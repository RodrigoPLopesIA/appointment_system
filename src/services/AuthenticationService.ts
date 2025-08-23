import { Repository } from "typeorm";
import User from "../entity/User";
import LoginDTO from "../dto/input/login.input";
import { compareSync } from "bcrypt";
import JWTService from "./JWTService";

export default class AuthenticationService {
  constructor(private readonly userRepository: Repository<User>) {}

  public async login({ email, password }: LoginDTO) : Promise<string> {
    const user = await this.userRepository.findOneBy({
      email: email as string,
    });

    if (!user || !this.verifyPassword(password as string, user.password))
      throw new Error("Invalid credentials!");

    // generate token
    const token = JWTService.generateToken({email: user.email, id: user.id})
    return token
  }


  private verifyPassword(password, hashPassword) : boolean {
    return compareSync(password, hashPassword)
  }
}
