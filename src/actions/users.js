/**
 * Actions to work with users
 * 
 * {@link https://akilijs.com/docs/requests}
 * {@link https://akilijs.com/docs/store}
 */

import request from 'akili/src/services/request';

export function getAll() {
  return request.use.api.get('/users').then(res => res.data.slice(0, 50));
}
