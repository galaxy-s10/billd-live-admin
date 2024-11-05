import { ICredential } from '@/interface';
import request from '@/utils/request';

export function fetchSendCode(email) {
  return request.instance({
    url: '/other/send_email',
    method: 'post',
    data: { email },
  });
}

export function fetchGetPolicy({ prefix }) {
  return request.get<{ err; credential: ICredential }>('/other/getPolicy', {
    params: { prefix },
  });
}
