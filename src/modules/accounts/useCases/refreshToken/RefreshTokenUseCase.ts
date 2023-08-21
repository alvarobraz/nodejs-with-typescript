import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/Dateprovider/IDateProvider';
import { AppError } from '@errors/AppError';

// payload de verificação
interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokenRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {

    // desestruturando via payload e passando secret de refresh
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;


    const user_id = sub;

    // pesquisando no BD o refresh token
    const userToken =
      await this.usersTokenRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expiration_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
    );

    await this.usersTokenRepository.create({
      expiration_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return { refresh_token, token: newToken };
  }
}

export { RefreshTokenUseCase };