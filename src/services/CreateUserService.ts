import { getRepository } from "typeorm";
import { UserORM } from "../entities/user.entity";
import { User } from "../interface/user.interface";

export class CreateUserService {
  public async execute({ name }: User) {
    const userRepository = getRepository(UserORM);
    const user = new UserORM();

    user.name = name;

    const savedUser = await userRepository.save(user);

    if(!savedUser) throw new Error('User not created!');

    return savedUser;
  }
}
