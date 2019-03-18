import ServerHost from '../../config/server.config';
import request from '@/utils/request';

// 查询API
export async function query(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecordStudent/GetList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查询当前API
export async function queryCurrent(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecordStudent/Get`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 获取最近课程信息
export async function queryLately(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecordStudent/GetLately`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 获取最近课程信息
export async function queryTimeLine(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecordStudent/GetTimeLine`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查询一个API
export async function queryModel(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecordStudent/GetModel`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查询一次教学记录的所有学生API
export async function queryStudents(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecordStudent/GetStudentList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 删除API
export async function remove(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecordStudent/Delete`, {
    method: 'POST',
    body: params,
  });
}
// 新增API
export async function add(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecordStudent/Save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 更新API
export async function update(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecordStudent/Update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 更新当前选择API
export async function updateCurrent(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecordStudent/UpdateCurrent`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
