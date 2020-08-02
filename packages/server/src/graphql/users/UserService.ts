import { Service } from "typedi";
import { Connection } from "typeorm";
import { InjectConnection } from "typeorm-typedi-extensions";

import { hashPassword } from "../../common/authentication";
import { Avatar, User } from "../../database/entity";

@Service()
export class UserService {
  @InjectConnection()
  private connection: Connection;

  async createWithAvatar(
    userAttributes: Partial<User> & { password: string },
    avatarAttributes: Partial<Avatar>
  ): Promise<User> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const avatar = queryRunner.manager.create(Avatar, avatarAttributes);
      await queryRunner.manager.save(avatar);

      const user = queryRunner.manager.create(User, {
        ...userAttributes,
        passwordHash: hashPassword(userAttributes.password),
        avatar
      });
      return queryRunner.manager.save(user);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
