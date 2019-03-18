import { query, remove, add, update,getCourseTerm} from '@/services/courseInfoAPI';
import { Toast } from 'antd-mobile';
// import { runInNewContext } from 'vm';

export default {
  namespace: 'courseInfo',

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
    *getCourseTerm({ payload, callback }, { call, put }) {
      const response = yield call(getCourseTerm, payload);
      yield put({
        type: 'courseTerm',
        payload: response,
      });
      callback(response);
      // if (response.Success) {        
      //   yield put({
      //     type: 'courseTerm',
      //     payload: response,
      //   });
      //   if (callback) callback(response);
      // } else {
      //   // Toast.fail(response.Message);
      // }
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
