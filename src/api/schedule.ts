import request from '@/utils/request';

// 查看当前备份任务
export function fetchDbJob() {
  return request({
    url: '/schedule/db_job',
    method: 'get',
  });
}

// 立即执行备份任务
export function fetchInvokeDbJob() {
  return request({
    url: '/schedule/invoke_db_job',
    method: 'post',
  });
}

// 查看当前内存
export function fetchShowMemoryJob() {
  return request({
    url: '/schedule/invoke_showMemory_job',
    method: 'get',
  });
}

// 立即执行清除buff/cache任务
export function fetchInvokeClearMemoryJob() {
  return request({
    url: '/schedule/invoke_clearCache_job',
    method: 'post',
  });
}
// 立即执行清除buff/cache任务
export function fetchRestartPm2() {
  return request({
    url: '/schedule/restart_pm2',
    method: 'post',
  });
}
