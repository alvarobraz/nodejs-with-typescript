import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUserRepository';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);