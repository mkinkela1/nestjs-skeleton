import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/entities/user.entity";

export const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);