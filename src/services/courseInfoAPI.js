import ServerHost from '../../config/server.config';
import request from '@/utils/request';

// 查询API
export async function query(params) {
  return request(`${ServerHost.OnlineEducationServer}/CourseInfo/GetList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 删除API
export async function remove(params) {
  return request(`${ServerHost.OnlineEducationServer}/CourseInfo/Delete`, {
    method: 'POST',
    body: params,
  });
}
// 新增API
export async function add(params) {
  return request(`${ServerHost.OnlineEducationServer}/CourseInfo/Save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 更新API
export async function update(params) {
  return request(`${ServerHost.OnlineEducationServer}/CourseInfo/Update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 获取当前用户课程下面的所有学期
export async function getCourseTerm(params) {
  return request(`${ServerHost.OnlineEducationServer}/CourseInfo/GetCourseTerm`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
