import { EntityRepository, Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { UserNotFoundException } from "src/exceptions/AuthExceptions";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async expectOne(where: any): Promise<User> {
    const user: User = await this.findOne({ where });

    if (!user) throw new UserNotFoundException();

    return user;
  }

  async deleteById(id: string): Promise<void> {
    const user: User = await this.expectOne({ id });

    await this.delete(user.id);
  }
}
