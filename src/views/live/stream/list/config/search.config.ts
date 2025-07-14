import { IForm } from '@/components/Base/Form';
import { useOrder } from '@/hooks/use-order';
import { IApiV1Streams, ISearch } from '@/interface';

import { columnsConfig } from './columns.config';

export const searchFormConfig: IForm<ISearch<IApiV1Streams>> = {
  gridSpan: 8,
  labelPlacement: 'left',
  formStyle: {
    justifyContent: 'center',
  },
  formItems: [...useOrder(columnsConfig)],
};
