import { query, remove, add, update,getUserFileList} from '@/services/courseCatalogAPI';
import { Toast } from 'antd-mobile';
// import { runInNewContext } from 'vm';

export default {
  namespace: 'courseCatalog',

  state: {
    data: {
      Rows: [      ]
    },
    courseTerm: {
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
          payload: response,
        });
      }
    },
    *getUserFileList({ payload }, { call, put }) {
      const response = yield call(getUserFileList, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'save',
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
    courseTerm(state, action) {
      return {
        ...state,
        courseTerm: action.payload,
      };
    },
  },
};
