import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { compare } from "bcryptjs";
import auth from "@config/auth";
import { sign } from "jsonwebtoken";
import { AppError } from "@errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/Dateprovider/IDateProvider";

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
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // verificar se o usuaŕio existe
    const user = await this.usersRepository.findByEmail(email);

    // variaveis de ambiente para autenticação
    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days
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

    // passando email como payload para recuperação do token
    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    // definindo via dayjs uma expriração para esse refresh token
    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expiration_date: refresh_token_expires_date,
    });

    // contruindo retorno com tipagem
    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
        
      },
      refresh_token
    }

    return tokenReturn

  }

}

export { AuthenticateUserUseCase }