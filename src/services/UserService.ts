import { Repository } from "typeorm";
import User from "../entity/User"
import {hashSync} from "bcrypt"

class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  public findAll() {
    return this.userRepository.find();
  }
  public findById(id: string) {
    return this.userRepository.findOne({
      where: {
        id
      }
    });
  }
  public save(value: User): Promise<User> {

    value.password = hashSync(value.password, 10)
    
    return this.userRepository.save(value);
  }
  public update(id: string, data: User) {
    return this.userRepository.update(id, data);
  }

  public delete(id: string) {
    this.userRepository.delete(id);
  }
}

export default UserService;
