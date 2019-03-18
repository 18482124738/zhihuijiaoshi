import { query, remove, add, update, queryCurrent } from '@/services/userInfoAPI';
import { Toast } from 'antd-mobile';
import { setUserInfo, getRole, setRole } from '@/utils/authority';
// import { runInNewContext } from 'vm';

export default {
  namespace: 'userInfo',

  state: {
    currentUser: {},
    data: {
      list: [],
      pagination: {}
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload); 
      if (!response) {
        Toast.fail('请求服务器出错', 2);
      }
      if (response.Success === false) {
        Toast.fail(response.Message, 2);
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
        Toast.fail(response.Message, 2);
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
        Toast.fail(response.Message, 2);
      }
    },
    *update({ payload, callback }, { call, put }) {
      let response = yield call(update, payload);
      if (response.Success) {
        Toast.info('修改成功', 1);
        response = yield call(query, payload);
        yield put({
          type: 'save',
          payload: response,
        });
        if (callback) callback(response);
      } else {
        Toast.fail(response.Message, 2);
      }
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      if (!response) {
        Toast.fail('获取当前用户出错', 2);
      }
      if (response.Success === false) {
        Toast.fail(`获取用户信息出错：${response.Message}`, 2);
        yield put({
          type: 'saveCurrentUser',
          payload: {},
        });
      } else {
        yield put({
          type: 'saveCurrentUser',
          payload: response.Data,
        });
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
    saveCurrentUser(state, action) {
      setUserInfo(action.payload);
      const role = getRole();
      if (!role) {
        setRole(action.payload.Role.toString())
      }
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};
