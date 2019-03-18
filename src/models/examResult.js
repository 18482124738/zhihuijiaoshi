import { query, add, remove, update ,resultPreservation,getPaperStatistics,getWronAnswer,resultsOfStudentsAnswers,getSingleResult,gettingRandomPapers} from '@/services/examResultApi';
import { Toast } from "antd-mobile"

// let nextPage = 2;

export default {
  namespace: 'examResult',
  state: {
    examResult: {},
    examResultSave: {},
    statisticsList:{},
    rightWrongList:{},
    getStudentList:{},
    getSingleResult:{},
    gettingRandomPapers:{},
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(query, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'getList',
          payload: { examResult: response },
        });
        if (callback) callback(response);

      }
    },
    *getPaperStatistics({ payload, callback }, { call, put }) {
      const response = yield call(getPaperStatistics, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'getStatisticsList',
          payload: response  ,
        });
        if (callback) callback(response);

      }
    },
    *resultsOfStudentsAnswers({ payload, callback }, { call, put }) {
      const response = yield call(resultsOfStudentsAnswers, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'getStudentList',
          payload: response  ,
        });
        if (callback) callback(response);

      }
    },
    // *resultsOfStudentsAnswers({ payload }, { call, put }) {
    //   const response = yield call(resultsOfStudentsAnswers, { ...payload, PageSize: 10, PageNumber: nextPage });
    //   if (response.Success === false) {
    //     Toast.fail(response.Message);
    //   } else {
    //     yield put({
    //       type: 'append',
    //       payload: response,
    //     });
    //   }
    // },
    *getWronAnswer({ payload, callback }, { call, put }) {
      const response = yield call(getWronAnswer, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'getRightWrongList',
          payload: response  ,
        });
        if (callback) callback(response);

      }
    },
    *getSingleResult({ payload, callback }, { call, put }) {
      const response = yield call(getSingleResult, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'singleResultSave',
          payload: response  ,
        });
        if (callback) callback(response);

      }
    },

    *gettingRandomPapers({ payload, callback }, { call, put }) {
      const response = yield call(gettingRandomPapers, payload);
      if (response.Success === false) {
        Toast.fail(response.Message);
      } else {
        yield put({
          type: 'gettingRandomPapersSave',
          payload: response  ,
        });
        if (callback) callback(response);

      }
    },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if (response.Success) {
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
    *update({ payload, callback }, { call }) {
      const response = yield call(update, payload);
      if (response.Success) {
        if (callback) callback(response);
      } else {
        Toast.fail(response.Message);
      }
    },
    *resultPreservation({ payload, callback }, { call }) {
      const response = yield call(resultPreservation, payload);
      if (response.Success) {
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
        examResultSave: action.payload.Data,
      };
    },
    // append(state, action) {
    //   const newData = state.data;
    //   let more = false;
    //   if (action.payload.Rows.length>0) {
    //     nextPage += 1;
    //     action.payload.Rows.map(item => {
    //       newData.Rows.push(item);
    //       return item;
    //     })
    //     more = true;
    //   }
    //   return {
    //     ...state,
    //     hasMore: more,
    //     data: newData,
    //   };
    // },
    getStudentList(state, action) {
      return {
        ...state,
        getStudentList: action.payload,
      };
    },
    getList(state, action) {
      return {
        ...state,
        examResult: action.payload,
      };
    },
    getStatisticsList(state, action) {
      return {
        ...state,
        statisticsList: action.payload,
      };
    },
    getRightWrongList(state, action) {
      return {
        ...state,
        rightWrongList: action.payload,
      };
    },

    singleResultSave(state, action) {
      return {
        ...state,
        getSingleResult: action.payload,
      };
    },
    gettingRandomPapersSave(state, action) {
      return {
        ...state,
        gettingRandomPapers: action.payload,
      };
    },

  },
};
