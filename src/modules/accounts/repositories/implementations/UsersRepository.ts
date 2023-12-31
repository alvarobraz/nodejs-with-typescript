import { Repository, getRepository } from "typeorm";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { User } from "@modules/accounts/entities/User";

// UsersRepository implementando IUsersRepository
class UsersRepository implements IUsersRepository {
  // criando repositório via entidade User
  private repository: Repository<User>;

  // Contrutor dando um get no repośitório via entidade User
  constructor() {
    this.repository = getRepository(User);
  }
  
  // método a ser implementado => create
  // dentro dele dados desestruturados de => ICreateUserDTO
  async create({
    name,
    email,
    password,
    id,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    // criando user via método create
    const user = this.repository.create({
      name,
      email,
      password,
      id,
      avatar,
    });
    // salvando user via método save
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const emailExists = this.repository.findOne({
      email
    });

    return emailExists;
  }

  async findById(id: string): Promise<User> {
    const user = this.repository.findOne(id);

    return user;
  }
  
}


export { UsersRepository };