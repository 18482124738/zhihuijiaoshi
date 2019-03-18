import React, { Component } from 'react';
import { connect } from 'dva';
import { getPageQuery } from '@/utils/utils';
import { ActivityIndicator } from 'antd-mobile';

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class WeChatLogin extends Component {
  state = {
  };

  componentDidMount() {
    const params = getPageQuery();
    const { dispatch } = this.props;
    dispatch({
      type: 'login/weChatLogin',
      payload: {
        openId:params.openId
      },
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span style={{ marginTop: 8 }}>正在验证用户信息...</span>
      </div>
    );
  }
}

export default WeChatLogin;
