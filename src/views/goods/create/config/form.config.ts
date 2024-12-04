import { IForm } from '@/components/Base/Form';
import { goodsTypeEnumMap } from '@/constant';
import { FormTypeEnum, GoodsTypeEnum, IGoods } from '@/interface';

export const formConfig = (): IForm<IGoods> => {
  return {
    gridSpan: 18,
    formStyle: {
      justifyContent: 'center',
    },
    labelPlacement: 'left',
    formItems: [
      {
        field: 'name',
        type: FormTypeEnum.input,
        label: '商品名称',
        rule: { required: true, trigger: 'blur' },
      },
      {
        field: 'type',
        type: FormTypeEnum.select,
        options: Object.keys(GoodsTypeEnum).map((v) => {
          return {
            label: goodsTypeEnumMap[v],
            value: v,
          };
        }),
        label: '商品类型',
        rule: { trigger: 'blur' },
      },
      {
        field: 'short_desc',
        type: FormTypeEnum.input,
        label: '商品短介绍',
        rule: { trigger: 'blur' },
      },
      {
        field: 'desc',
        type: FormTypeEnum.markdown,
        label: '商品介绍',
        rule: { trigger: 'blur' },
      },
      {
        field: 'price',
        type: FormTypeEnum.number,
        label: '商品现价（单位：分）',
        rule: { trigger: 'blur', type: 'number' },
      },
      {
        field: 'original_price',
        type: FormTypeEnum.number,
        label: '商品原价（单位：分）',
        rule: { trigger: 'blur', type: 'number' },
      },
      {
        field: 'nums',
        type: FormTypeEnum.number,
        label: '商品数量',
        rule: { trigger: 'blur', type: 'number' },
      },
      {
        field: 'inventory',
        type: FormTypeEnum.number,
        label: '商品库存',
        rule: { trigger: 'blur', type: 'number' },
      },
      {
        field: 'pay_nums',
        type: FormTypeEnum.number,
        label: '付款人数',
        rule: { trigger: 'blur', type: 'number' },
      },
      {
        field: 'badge',
        type: FormTypeEnum.input,
        label: '商品标记',
        rule: { trigger: 'blur' },
      },
      {
        field: 'badge_bg',
        type: FormTypeEnum.input,
        label: '商品标记背景色',
        rule: { trigger: 'blur' },
      },
      {
        field: 'cover',
        type: FormTypeEnum.upload,
        uploadConfig: {
          max: 1,
        },
        label: '商品图',
      },
      {
        field: 'remark',
        type: FormTypeEnum.input,
        label: '商品备注',
        rule: { trigger: 'blur' },
      },
    ],
  };
};
