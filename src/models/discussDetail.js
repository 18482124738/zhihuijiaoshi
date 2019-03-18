import { query, remove, add, update } from '@/services/DiscussDetailAPI';
import { Toast } from 'antd-mobile';
// import { runInNewContext } from 'vm';

let nextPage = 1;

export default {
  namespace: 'discussDetail',

  state: {
    data: {
      Rows: []
    },
    hasMore: true,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
     const response = yield call(query,  { ...payload, PageSize: 20, PageNumber: 1 });
     nextPage = 2;// 初始化分页页码
     if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    *getMore({ payload }, {  call, put }) {
      const response = yield call(query, { ...payload, PageSize: 20, PageNumber: nextPage });
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'append',
          payload: response,
        });
      }
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if (response.Success) {
        if (callback) callback(response);
      } else {
        Toast.fail(response.Message);
      }
    },
    *remove({ payload, callback }, { call }) {
      const response = yield call(remove, payload);
      if (response.Success) {
        if (callback) callback(response);
        Toast.info('删除成功！');
        /* response = yield call(query,  { ...payload, PageSize: 20, PageNumber: 1 });
        yield put({
          type: 'save',
          payload: response,
        }); */
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
      const newData ={Rows:[]};
      action.payload.Rows.map(item=>{
        newData.Rows.unshift(item);
        return item;
      }) 
      return {
        ...state,
        data: newData,
      };
    },
    append(state, action) {
      const newData = state.data;
      let more = false;
      if (action.payload.Rows.length>0) {
        nextPage += 1;  
        action.payload.Rows.map(item=>{
          newData.Rows.unshift(item);
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
