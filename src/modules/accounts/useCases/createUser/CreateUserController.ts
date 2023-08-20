import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';

class CreateUserController {
  // recebendo métodos request e response do express
  async handle(request: Request, response: Response): Promise<Response> {
    // desestruturando e recebendo request.body
    const { name, email, password, avatar, id } = request.body;

    console.log('request.body');
    console.log(request.body);

    // criando createUserUseCase via container.resolve do tsyringe em CreateUserUseCase
    const createUserUseCase = container.resolve(CreateUserUseCase);

    // executando, passando as informações que vem do request.body
    await createUserUseCase.execute({
      name,
      email,
      password,
      avatar,
      id,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
