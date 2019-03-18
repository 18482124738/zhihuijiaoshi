import ServerHost from '../../config/server.config';
import request from '@/utils/request';

// 查询API
export async function query(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamRecord/GetList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 删除API
export async function remove(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamRecord/Delete`, {
    method: 'POST',
    body: params,
  });
}
// 新增API
export async function add(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamRecord/Save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 更新API
export async function update(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamRecord/Update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// getAPI
export async function get(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamRecord/Get`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
