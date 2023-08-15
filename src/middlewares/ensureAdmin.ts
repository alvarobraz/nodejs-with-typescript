import { Request, Response, NextFunction } from 'express';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository'
import { AppError } from '../errors/AppError'

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user
  console.log(id)
  const userRepository = new UsersRepository()
  const user = await userRepository.findById(id)

  if (!user.isAdmin) throw new AppError("user isn't admin")

  return next();
}