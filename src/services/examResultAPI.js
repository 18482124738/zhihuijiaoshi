import ServerHost from '../../config/server.config';
import request from '@/utils/request';

// 查询API
export async function query(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamResult/GetList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 删除API
export async function remove(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamResult/Delete`, {
    method: 'POST',
    body: params,
  });
}
// 新增API
export async function add(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamResult/Save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 更新API
export async function update(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamResult/Update`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 试卷结果保存
export async function resultPreservation(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamResult/ResultPreservation`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 试卷结果分析
export async function getPaperStatistics(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamResult/GetPaperStatistics`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查看答对或者打错学生列表
export async function getWronAnswer(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamResult/GetWronAnswer`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查看试题所有学生列表
export async function resultsOfStudentsAnswers(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamResult/ResultsOfStudentsAnswers`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 查看单个学生试题列表
export async function getSingleResult(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamResult/GetSingleResult`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 学生开始考试 类型为1时随机生成试卷
export async function gettingRandomPapers(params) {
  return request(`${ServerHost.OnlineEducationServer}/ExamResult/GettingRandomPapers`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
