import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile'
import { accountLogin, getFakeCaptcha, clientCredentials, SmsLogin, weChatLogin, weChatBind } from '@/services/loginAPI';
import { add, queryCurrent } from '@/services/userInfoAPI';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { setToken, getToken } from '@/utils/token';
import { setOpenId, getOpenId } from '@/utils/wechat';
import { getverificationCodeKey, setverificationCodeKey } from '@/utils/verificationCode';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      let response = {};
      // 手机验证码登陆
      if (payload.type === 'mobile') {
        // 得到验证码的key值
        response = yield call(SmsLogin, { key: getverificationCodeKey(), ...payload });
        console.log(response);
      }
      // 账号密码登陆
      else {
        response = yield call(accountLogin, payload);
      }
      // Login successfully
      if (response.Success !== false) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: true,
            currentAuthority: 'user',
          },
        });
        reloadAuthorized();
        setToken(response);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        Toast.fail(response.Message, 1)
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            type: payload.type,
            currentAuthority: 'guest',
          },
        });
      }
    },
    *regist({ payload }, { call, put }) {
      let response = {};
      // 得到验证码的key值
      response = yield call(weChatBind, { openId: getOpenId(), key: getverificationCodeKey(), ...payload });
      // 绑定手机号成功
      if (response.Success !== false) {
        response = yield call(weChatLogin, { openId: getOpenId() });
        if (response.Success !== false) {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: true,
              currentAuthority: 'user',
            },
          });
          reloadAuthorized();
          setToken(response);
          // 保存用户信息到本地
          response = yield call(add, { openId: getOpenId(), Tel: payload.loginCode });
          response = yield call(queryCurrent);
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = redirect;
              return;
            }
          }
          yield put(routerRedux.replace(redirect || '/'));
        }
      } else {
        Toast.fail(response.Message, 1);
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            type: payload.type,
            currentAuthority: 'guest',
          },
        });
      }
    },
    * weChatLogin({ payload }, { call, put }) {
      let response = getToken();
      setOpenId(payload.openId);
      if (response === null) {
        // 得到验证码的key值
        Toast.info('正在进行认证登录', 1);
        response = yield call(weChatLogin, payload);
      }
      if (response === undefined) {
        Toast.fail('获取认证信息出错:服务器错误', 2);
      } else {
        if (response.Success === false) {
          window.location.href = '/Account/register';
        } else {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: true,
              currentAuthority: 'user',
            },
          });
          reloadAuthorized();
          setToken(response);
        }
        Toast.info('正在获取用户信息', 1);
        response = yield call(queryCurrent);
        if (response === undefined) {
          Toast.fail('获取当前用户出错:服务器错误', 2);
        }
        if (response.Success === false) {
          Toast.fail(`获取用户信息出错：${response.Message}`, 2);
          yield put({
            type: 'userInfo/saveCurrentUser',
            payload: {},
          });
        } else {
          yield put({
            type: 'userInfo/saveCurrentUser',
            payload: response.Data,
          });
        }
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    // 验证码方法
    * getCaptcha({ payload }, { call }) {
      // 获取授权信息
      const responseAuthorized = yield call(clientCredentials);
      // 设置token
      setToken(responseAuthorized);
      // 获取验证码的key至
      const response = yield call(getFakeCaptcha, payload);
      if (response.Success) {
        // 设置key
        setverificationCodeKey(response.Data.Id)
      }
      else {
        // 报错
        Toast.fail(`获取用户信息出错：${response.Message}`, 2);
      }
    },

    * logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      setToken(null);
      yield put(
        routerRedux.push({
          pathname: '/Account/WeChatLogin',
          query: {
            openId: getOpenId()
          }
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
