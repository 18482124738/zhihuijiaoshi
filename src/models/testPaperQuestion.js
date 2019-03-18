import { query, add, remove, update, startAnswer } from '@/services/testPaperQuestionApi';
import { Toast } from 'antd-mobile';
export default {
  namespace: 'testPaperQuestion',
  state: {
    testPaperQuestionData: {
      startAnswerList: [],
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
          payload: { testPaperQuestionData: response },
        });
      }
    },
    *startAnswer({ payload, callback }, { call, put }) {
      const response = yield call(startAnswer, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'save',
          payload: { testPaperQuestionData: response },
        });
        if (response) callback(response);
      }
    },
    *add({ payload, callback }, { call, put }) {
      let response = yield call(add, payload);
      if (response.Success) {
        response = yield call(query, payload);
        yield put({
          type: 'save',
          payload: { testPaperQuestionData: response },
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
        startAnswerData: action.payload,
      };
    },
  },
};
