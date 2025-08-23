import { Repository } from "typeorm";
import User from "../entity/User";
import LoginDTO from "../dto/input/login.input";
import { compareSync } from "bcrypt";
import JWTService from "./JWTService";

export default class AuthenticationService {
  constructor(private readonly userRepository: Repository<User>) {}

  public async login({ email, password }: LoginDTO) : Promise<string> {
    const user = await this.findUserByEmail(email as string)

    this.verifyPassword(password as string, user.password)
    
    // generate token
    const token = JWTService.generateToken({email: user.email, id: user.id})
    return token
  }

  public async findUserByEmail(email: string) : Promise<User>{
    const user = await this.userRepository.findOneBy({
      email: email,
    });
    if(!user) throw new Error("Invalid credentials!")
    return user
  }

  public verifyPassword(password: string, hashPassword: string) : void {
    if(!compareSync(password as string, hashPassword))
      throw new Error("Invalid credentials!");
  }
}
