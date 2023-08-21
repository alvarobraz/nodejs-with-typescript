import { container } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/Dateprovider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/Dateprovider/implementations/DayJsDateProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);