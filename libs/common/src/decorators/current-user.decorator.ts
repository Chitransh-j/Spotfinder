import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../../../../apps/auth/src/users/models/users.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
