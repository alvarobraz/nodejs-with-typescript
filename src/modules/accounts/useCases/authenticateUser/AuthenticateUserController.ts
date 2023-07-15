import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    // recebendo do body
    const { password, email } = request.body;

    // criando authenticateUserUseCase com container.resolve do tsyringe passando AuthenticateUserUseCase
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    // usando authenticateUserUseCase método execute
    const token = await authenticateUserUseCase.execute({
      password,
      email,
    });
    
    return response.json(token);
  }
}

export { AuthenticateUserController };