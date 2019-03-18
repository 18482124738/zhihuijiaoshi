import {
  query,
  add,
  remove,
  update,
  queryCurrent,
  queryLately,
  updateState,
  queryTimeLine,
  queryModel,
  updateCurrent,
  getScore,
  queryStatistics,
} from '@/services/teachRecordAPI';
import { Toast } from 'antd-mobile';

let nextPage = 2;
export default {
  namespace: 'teachRecord',
  state: {
    data: {
      Rows: [],
      pagination: {},
    },
    current: {},
    timeLine: [],
    getScore: {},
    hasMore: true,
    statistics: {},
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(query, { ...payload, PageSize: 10, PageNumber: 1 });
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        nextPage = 2; // ��ʼ����ҳҳ��
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
    *fetchLately({ callback }, { call, put }) {
      const response = yield call(queryLately);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        const response2 = yield call(queryTimeLine, { TeachRecordId: response.Data.Id });
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
    *fetchStatistics({ payload, callback }, { call, put }) {
      const response = yield call(queryStatistics, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'saveStatistics',
          payload: response,
        });
        if (callback) callback(response.Data);
      }
    },
    *getScore({ callback }, { call, put }) {
      const response = yield call(getScore);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'getScoreList',
          payload: response,
        });
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
      const response = yield call(queryModel, payload);
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
    *add({ payload, callback }, { call, put }) {
      let response = yield call(add, payload);
      if (response.Success) {
        response = yield call(queryLately);
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) callback(response);
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
      }
    },
    *updateState({ payload, callback }, { call, put }) {
      let response = yield call(updateState, payload);
      if (response.Success) {
        response = yield call(queryLately);
        yield put({
          type: 'saveCurrent',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        Toast.fail(response.Message);
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
        if (callback) callback(response);
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
    getScoreList(state, action) {
      return {
        ...state,
        getScore: action.payload,
      };
    },
    append(state, action) {
      const newData = state.data;
      let more = false;
      if (action.payload.Rows.length > 0) {
        nextPage += 1;
        action.payload.Rows.map(item => {
          newData.Rows.push(item);
          return item;
        });
        more = true;
      }
      return {
        ...state,
        hasMore: more,
        data: newData,
      };
    },
    saveStatistics(state, action) {
      return { ...state, statistics: action.payload.Data };
    },
  },
};
