import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '@config/auth';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';
import { AppError } from '@errors/AppError';
import { UsersTokensRepository } from '@modules/accounts/repositories/implementations/UsersTokensRepository';


interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {

  // recebendo token via request.headers.authorization
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  // dando split no espaço em branco em => [Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9]
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;

    // chamando repositorio para poder usar o método findById
    const userRepository = new UsersRepository();

    // usando o método findById
    const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token)

    if(!user) {
      throw new AppError('User do not exists!', 401)
    }
    // passando no meedleware request.user.id
    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}
