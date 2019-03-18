
import { query, remove, fileUpload, update, history,add } from '@/services/CoursewareSendAPI';
import { Toast } from 'antd-mobile';
// import { runInNewContext } from 'vm';

export default {
  namespace: 'coursewareSend',
  state: {
    data: {

    },
    history:{

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
    *history({ payload }, { call, put }) {
      const response = yield call(history, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'lookup',
          payload: response,
        });
      }
    },
    *fileUpload({ payload, callback }, { call }) {
      const response = yield call(fileUpload, payload);
      if (response.Success) {
       
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
    *update({ payload, callback }, { call }) {
      let response = yield call(update, payload);
      if (response.Success) {
        response = yield call(history);
        // yield put({
        //   type: 'save',
        //   payload: response,
        // });
        if (callback) callback();
      } else {
        Toast.fail(response.Message);
      }
    },
    *add({ payload }, { call }) {
      const response = yield call(add, payload);
      if (!response.Success) {
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
    lookup(state, action) {
      return {
        ...state,
        history: action.payload,
      };
    },
  },
};
