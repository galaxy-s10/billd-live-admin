import { PaginationProps } from 'naive-ui';
import { reactive } from 'vue';

export const usePage = () => {
  return reactive<PaginationProps>({
    page: 0, // 当前页
    itemCount: 0, // 总条数
    pageSize: 0, // 分页大小
    prefix: ({ itemCount }) => {
      // eslint-disable-next-line
      return `一共${itemCount}条数据`;
    },
  });
};
