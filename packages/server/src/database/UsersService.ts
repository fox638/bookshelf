import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { isPasswordValid } from "../common/authentication";
import { User } from "./entity";

@Service()
export class UsersService {
  @InjectRepository(User)
  private repository: Repository<User>;

  async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<undefined | User> {
    // We have to use a queryBuilder Because passwordHash is excluded from the default select
    const user = await this.repository
      .createQueryBuilder("user")
      .where({ email })
      .addSelect("user.passwordHash")
      .getOne();

    if (user && isPasswordValid(password, user.passwordHash!)) {
      return user;
    }

    return undefined;
  }
}
