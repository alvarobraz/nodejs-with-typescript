import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';

const usersRouters = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
// metodo mais simples
// const upload = multer({
//   dest: "./avatar",
// })

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController()

usersRouters.post('/', createUserController.handle);
usersRouters.patch(
    '/avatar',
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
  );
// usersRouters.post('/', upload.single("file"), createUserController.handle);

export { usersRouters };


