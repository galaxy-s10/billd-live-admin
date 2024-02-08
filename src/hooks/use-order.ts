import { IFormItem } from '@/components/Base/Form';
import { FormTypeEnum, ISearchBase } from '@/interface';

export const useOrder = (columnsConfig) => {
  const orderName: IFormItem<ISearchBase> = {
    field: 'orderName',
    type: FormTypeEnum.select,
    label: 'common.sortName',
    placeholder: 'common.placeholderSortName',
    options: columnsConfig.map((v: any) => {
      return {
        label: v.key,
        // label: v.title(),
        value: v.key,
      };
    }),
  };

  const orderBy: IFormItem<ISearchBase> = {
    field: 'orderBy',
    type: FormTypeEnum.select,
    label: 'common.sortBy',
    placeholder: 'common.placeholderSortBy',
    options: [
      {
        label: 'common.asc',
        value: 'asc',
      },
      {
        label: 'common.desc',
        value: 'desc',
      },
    ],
  };

  return [orderName, orderBy];
};
