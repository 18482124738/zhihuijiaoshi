import { Toast } from "antd-mobile"
import { query, add, remove, update, get } from '@/services/examRecordApi';

export default {
  namespace: 'examRecord',
  state: {
    examRecorddata: {
      examRecord: []
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'save',
          payload: { examRecord: response },
        });
      }
    },
    *get({ payload, callback }, { call }) {
      const response = yield call(get, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        callback(response);
      }
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if (response.Success) {
        Toast.fail('下发成功！');
        // response = yield call(query, payload);
        yield put({
          type: 'save',
          payload: { examRecord: response },
        });
        if (callback) callback(response);
      } else {
        Toast.fail(response.Message);
      }
    },
    *remove({ payload, callback }, { call, put }) {
      let response = yield call(remove, payload);
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
    *update({ payload, callback }, { call, put }) {
      let response = yield call(update, payload);
      if (response.Success) {
        response = yield call(query);
        yield put({
          type: 'save',
          payload: { examRecord: response },
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
        examRecorddata: action.payload,
      };
    },
  },
};