import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserId= createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
      const ctx =context.switchToHttp().getRequest()?.user
      return ctx;
    },
  );