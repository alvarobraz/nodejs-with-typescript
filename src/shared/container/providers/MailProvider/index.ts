import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
// import { SESMailProvider } from './implementations/SESMailProvider';

// const mailProvider = {
//   ethereal: container.resolve(EtherealMailProvider),
//   ses: container.resolve(SESMailProvider),
// };

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
);
// container.registerInstance<IMailProvider>(
//   'MailProvider',
//   mailProvider[process.env.MAIL_PROVIDER],
// );