import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const AllowedRoles = (roles: string []): CustomDecorator => SetMetadata('roles', roles);
