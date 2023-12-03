import request from '@/utils/request';

export function fetchSendCode(email) {
  return request.instance({
    url: '/other/send_email',
    method: 'post',
    data: { email },
  });
}
