import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { compare } from "bcryptjs";
import auth from "../../../../config/auth";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";

// tipagem da requisição
interface IRequest {
  email: string;
  password: string;
}

// tipagem de return
interface IResponse {
  user: {
    name: string;
    email: string;
  },
  token: string
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // verificar se o usuaŕio existe
    const user = await this.usersRepository.findByEmail(email);

    // variaveis de ambiente para autenticação
    const {
      expires_in_token,
      secret_token
    } = auth;

    if (!user) {
      throw new AppError('Email or password incorrect!', 400);
    }

    // se senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!', 400);
    }

    // gerar jsonwebtoken
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    // contruindo retorno com tipagem
    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn

  }

}

export { AuthenticateUserUseCase }