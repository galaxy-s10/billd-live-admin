import { IFormItem } from '@/components/Base/Form';
import { FormTypeEnum, ISearchBase } from '@/interface';

export const useOrder = ({ columnsConfig, t }) => {
  const orderName: IFormItem<ISearchBase> = {
    field: 'orderName',
    type: FormTypeEnum.select,
    label: t('common.sortName'),
    placeholder: '请选择排序字段',
    options: columnsConfig.map((v: any) => {
      return {
        // label: v.key,
        label: v.title,
        value: v.key,
      };
    }),
  };

  const orderBy: IFormItem<ISearchBase> = {
    field: 'orderBy',
    type: FormTypeEnum.select,
    label: t('common.sortBy'),
    placeholder: '请选择排序规则',
    options: [
      {
        label: t('common.asc'),
        value: 'asc',
      },
      {
        label: t('common.desc'),
        value: 'desc',
      },
    ],
  };

  return [orderName, orderBy];
};
