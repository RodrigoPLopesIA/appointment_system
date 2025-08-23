import { Repository } from "typeorm";
import User from "../entity/User"

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
