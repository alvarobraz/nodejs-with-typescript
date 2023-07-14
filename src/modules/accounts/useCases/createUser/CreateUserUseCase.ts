import { hash } from 'bcryptjs';
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";


@injectable()
class CreateUserUseCase {
  // construcor injetando UsersRepository lá de shared/container que registra via IUsersRepository
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  // metodo padrão execute usando dados via desestruturação de ICreateUserDTO
  async execute({
    name,
    email,
    password
  }: ICreateUserDTO): Promise<void> {
    // const userAlreadyExists = await this.usersRepository.findByEmail(email);

    // if (userAlreadyExists) {
    //   throw new AppError('User already exists');
    // }

    // usando hash do bcrypt para gerar password
    const passwordHash = await hash(password, 8);

    // usando método create
    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };