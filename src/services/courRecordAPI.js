import ServerHost from '../../config/server.config';
import request from '@/utils/request';

// 查询API
export async function query(params) {
  return request(`${ServerHost.OnlineEducationServer}/CourtRecord/GetList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 删除API
export async function remove(params) {
  return request(`${ServerHost.OnlineEducationServer}/CourtRecord/Delete`, {
    method: 'POST',
    body: params,
  });
}
// 新增API
export async function add(params) {
  return request(`${ServerHost.OnlineEducationServer}/CourtRecord/Save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 更新API
export async function update(params) {
  return request(`${ServerHost.OnlineEducationServer}/CourtRecord/Update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 上传随堂记录
export async function fileUpload(params) {
  const formData = new FormData();
  if (params.Files.length > 0) {   
    formData.append("TeachRecordId", params.TeachRecordId || "");  
    formData.append("StudentName", params.StudentName || "");  
    formData.append("Content", params.Context || "");  
    console.log(params.Files)
    params.Files.forEach(file => {
      // if (!file.url) {
        formData.append("files[]", file);
      // }
    });
  }
  return request(`${ServerHost.OnlineEducationServer}/CourtRecord/FileUploadAsync`, {

    method: 'POST',
    body:formData,
  });
}
