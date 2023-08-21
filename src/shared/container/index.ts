import { container } from 'tsyringe';

import '@shared/container/providers';
import { IUsersRepository } from '@modules/accounts/repositories/IUserRepository';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/accounts/repositories/implementations/UsersTokensRepository';


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);