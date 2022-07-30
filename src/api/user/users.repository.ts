import { EntityRepository, Repository } from "typeorm";
import { User } from "src/entities/user.entity";
import { UserNotFoundException } from "src/exceptions/AuthExceptions";
import { buildPaginator, PagingResult } from "typeorm-cursor-pagination";
import { DtoPaginationRequest } from "src/shared/dto/DtoPaginationRequest";
import { isNotEmpty } from "class-validator";

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

  async getAllPaginated(
    search: string,
    meta: DtoPaginationRequest<User>
  ): Promise<PagingResult<User>> {
    const queryBuilder = this.createQueryBuilder("user");
    if (isNotEmpty(search)) {
      queryBuilder
        .orWhere("user.email LIKE :email", {
          email: `%${search}%`,
        })
        .orWhere("user.firstName LIKE :firstName", {
          firstName: `%${search}%`,
        })
        .orWhere("user.lastName LIKE :lastName", {
          lastName: `%${search}%`,
        });
    }

    console.log(isNotEmpty(search));

    const paginator = buildPaginator({
      entity: User,
      paginationKeys: [meta.sortBy ?? "createDateTime"],
      query: {
        limit: +meta.pageSize,
        order: meta.orderBy,
        afterCursor: meta.afterCursor,
        beforeCursor: meta.beforeCursor,
      },
    });

    const { data, cursor } = await paginator.paginate(queryBuilder);

    return { data, cursor };
  }
}
