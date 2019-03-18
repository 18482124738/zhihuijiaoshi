import ServerHost from '../../config/server.config';
import request from '@/utils/request';

// 查询API
export async function query(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecord/GetList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查询当前API
export async function queryCurrent(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecord/Get`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查询最近API
export async function queryLately(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecord/GetLately`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查询最近API
export async function queryStatistics(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecord/GetStatistics`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 获取个人积分
export async function getScore(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecord/GetScore`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查询时间轴API
export async function queryTimeLine(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecord/GetTimeLine`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查询一个API
export async function queryModel(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecord/GetModel`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 删除API
export async function remove(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecord/Delete`, {
    method: 'POST',
    body: params,
  });
}
// 新增API
export async function add(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecord/Save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 更新API
export async function update(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecord/Update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 更新上课状态API
export async function updateState(params) {
  return request(
    `${ServerHost.OnlineEducationServer}/TeachRecord/ChangeState?teachRecordId=${
      params.Id
    }&&state=${params.Nowstate}`,
    {
      method: 'POST',
      body: {
        ...params,
      },
    }
  );
}
// 更新当前选择API
export async function updateCurrent(params) {
  return request(`${ServerHost.OnlineEducationServer}/TeachRecord/UpdateCurrent`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
