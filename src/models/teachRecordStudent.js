import {
  query,
  add,
  remove,
  update,
  queryCurrent,
  queryLately,
  queryTimeLine,
  queryModel,
  queryStudents,
  updateCurrent,
} from '@/services/teachRecordStudentAPI';
import { Toast } from 'antd-mobile';

let nextPage = 2;
export default {
  namespace: 'teachRecordStudent',
  state: {
    data: {
      Rows: [],
      pagination: {},
    },
    current: {},
    timeLine: [],
    hasMore: true,
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(query, { ...payload, PageSize: 10, PageNumber: 1 });
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        nextPage = 2;// 初始化分页页码
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) callback(response);
      }
    },
    *getMore({ payload }, { call, put }) {
      const response = yield call(query, { ...payload, PageSize: 10, PageNumber: nextPage });
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'append',
          payload: response,
        });
      }
    },
    *fetchCurrent({ payload, callback }, { call, put }) {
      const response = yield call(queryCurrent, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        const response2 = yield call(queryTimeLine, { TeachRecordId: payload.Id });
        yield put({
          type: 'saveCurrent',
          payload: response,
        });
        yield put({
          type: 'saveTimeLine',
          payload: response2,
        });
        if (callback) callback(response.Data);
      }
    },
    *fetchLately({ payload, callback }, { call, put }) {
      const response = yield call(queryLately, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'saveCurrent',
          payload: response,
        });
        const response2 = yield call(queryTimeLine, {
          TeachRecordId: response.Data.TeachRecordId,
        });
        if (response2.Success === false) {
          Toast.fail(response2.Message);
        } else {
          yield put({
            type: 'saveTimeLine',
            payload: response2,
          });
        }
        if (callback) callback(response.Data);
      }
    },
    *fetchTimeLine({ payload, callback }, { call, put }) {
      const response = yield call(queryTimeLine, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'saveTimeLine',
          payload: response,
        });
        if (callback) callback(response);
      }
    },
    *fetchModel({ payload, callback }, { call, put }) {
      const response = yield call(queryModel, { Id: payload.Id });
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        const response2 = yield call(queryTimeLine, { TeachRecordId: payload.TeachRecordId });
        yield put({
          type: 'saveCurrent',
          payload: response,
        });
        yield put({
          type: 'saveTimeLine',
          payload: response2,
        });
        if (callback) callback(response.Data);
      }
    },
    *fetchStudents({ payload, callback }, { call, put }) {
      const response = yield call(queryStudents, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) callback(response);
      }
    },
    *add({ payload, callback }, { call, put }) {
      let response = yield call(add, payload);
      if (response.Success) {
        response = yield call(queryLately);
        yield put({
          type: 'saveCurrent',
          payload: response,
        });
        if (callback) callback(response.Data);
        Toast.success(response.Message);
      } else {
        Toast.fail(response.Message);
      }
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(remove, payload);
      if (response.Success) {
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) callback();
      } else {
        Toast.fail(response.Message);
      }
    },
    *update({ payload, callback }, { call, put }) {
      let response = yield call(update, payload);
      if (response.Success) {
        response = yield call(queryLately);
        yield put({
          type: 'saveCurrent',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        Toast.fail(response.Message);
        const response2 = yield call(queryLately);
        yield put({
          type: 'saveCurrent',
          payload: response2,
        });
      }
    },
    *updateCurrent({ payload, callback }, { call, put }) {
      let response = yield call(updateCurrent, payload);
      if (response.Success) {
        response = yield call(queryLately);
        yield put({
          type: 'saveCurrent',
          payload: response,
        });
        Toast.info('切换成功，即将返回首页！', 2);
        setTimeout(() => {
          if (callback) callback(response);
        }, 2000);
      } else {
        Toast.fail(response.Message);
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveCurrent(state, action) {
      return {
        ...state,
        current: action.payload.Data,
      };
    },
    saveTimeLine(state, action) {
      return {
        ...state,
        timeLine: action.payload,
      };
    },
    append(state, action) {
      const newData = state.data;
      let more = false;
      if (action.payload.Rows.length>0) {
        nextPage += 1;
        action.payload.Rows.map(item => {
          newData.Rows.push(item);
          return item;
        })
        more = true;
      }
      return {
        ...state,
        hasMore: more,
        data: newData,
      };
    },
  },
};
