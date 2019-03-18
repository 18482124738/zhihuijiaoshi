import ServerHost from '../../config/server.config';
import request from '@/utils/request';

// 查询API
export async function query(params) {
  return request(`${ServerHost.OnlineEducationServer}/CoursewareSend/GetList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查询历史记录
export async function history(params) {
  return request(`${ServerHost.OnlineEducationServer}/CoursewareSend/GetList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 保存
export async function add(params) {
  return request(`${ServerHost.OnlineEducationServer}/CoursewareSend/Save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 删除API
export async function remove(params) {
  return request(`${ServerHost.OnlineEducationServer}/CoursewareSend/Delete`, {
    method: 'POST',
    body: params,
  });
}
// 上传资料
export async function fileUpload(params) {
  const data = new FormData();
  if (params.Files.length > 0) {
    data.append("TeachRecordId", params.TeachRecordId || "");
    params.Files.forEach(file => {
      data.append("files[]", file);
    });
  }
  return request(`${ServerHost.OnlineEducationServer}/CoursewareSend/FileUpload`, {
    method: 'POST',
    body: data,
  });
}
// 更新API
export async function update(params) {
  return request(`${ServerHost.OnlineEducationServer}/CoursewareSend/Update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
