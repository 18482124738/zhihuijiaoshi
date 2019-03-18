import { query, remove, add, update,downLoad } from '@/services/DownRecordsAPI';
import { Toast } from 'antd-mobile';
// import { runInNewContext } from 'vm';

export default {
  namespace: 'downRecords',

  state: {
    data: {

    },
    filePath:{},
    history:{},
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    *history({ payload }, { call, put }) {
      const response = yield call(query, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'gethistory',
          payload: response,
        });
      }
    },
    *add({ payload, callback }, { call, put }) {
      let response = yield call(add, payload);
      if (response.Success) {
        response = yield call(query, payload);
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) callback();
      } else {
        Toast.fail(response.Message);
      }
    },
    *downLoad({ payload, callback }, { call, put }) {
      const response = yield call(downLoad, payload);
      if (response.Success) {
        yield put({
          type: 'filePath',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        // Toast.fail(response.Message);
      }
    },
    *remove({ payload, callback }, { call, put }) {
      let response = yield call(remove, payload.ids);
      if (response.Success) {
        if (callback) callback(response);
        Toast.info('删除成功！');
        response = yield call(query, payload.filequery);
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
        response = yield call(query, payload);
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) callback();
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
    gethistory(state, action) {
      return {
        ...state,
        history: action.payload,
      };
    },
    filePath(state, action) {
      return {
        ...state,
        filePath: action.payload,
      };
    },
  },
};
