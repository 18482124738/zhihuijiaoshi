import { query,add,remove,update} from '@/services/testPaperApi';
import{Toast} from "antd-mobile";

export default {
  namespace: 'testPaper',
  state: {
    testPaperdata: {
      testPaper:[]
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      if (response.Success===false) {
        Toast.fail(response.Message);
      } else {

        yield put({
          type: 'save',
          payload:{testPaper:response},
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
        testPaperdata: action.payload,
      };
    },
  },
};