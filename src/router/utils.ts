import { NIcon } from 'naive-ui';
import { Component, h } from 'vue';

export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export const formatTime = (timestamp: number) => {
  function addZero(num: number) {
    return num < 10 ? `0${num}` : num;
  }
  const date = new Date(timestamp);

  // 获取年份
  const year = date.getFullYear();

  // 获取月份（注意月份是从0开始的，所以要加1）
  const month = date.getMonth() + 1;

  // 获取日期
  const day = date.getDate();

  // 获取小时
  const hours = date.getHours();

  // 获取分钟
  const minutes = date.getMinutes();

  // 获取秒数
  const seconds = date.getSeconds();

  // 打印结果
  return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hours)}:${addZero(
    minutes
  )}:${addZero(seconds)}`;
};
