import { IFormItem } from '@/components/Base/Form';
import { FormTypeEnum, ISearchBase } from '@/interface';

export const useOrder = (columnsConfig) => {
  const orderName: IFormItem<ISearchBase> = {
    field: 'orderName',
    type: FormTypeEnum.select,
    label: '排序字段',
    placeholder: '请选择排序字段',
    options: columnsConfig().map((v: any) => {
      return {
        label: v.title,
        value: v.key,
      };
    }),
  };

  const orderBy: IFormItem<ISearchBase> = {
    field: 'orderBy',
    type: FormTypeEnum.select,
    label: '排序规则',
    placeholder: '请选择排序规则',
    options: [
      {
        label: '升序',
        value: 'asc',
      },
      {
        label: '降序',
        value: 'desc',
      },
    ],
  };

  return [orderName, orderBy];
};
