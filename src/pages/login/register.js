import React, { Component } from 'react';
import { connect } from 'dva';
import { Toast, Button, WhiteSpace } from 'antd-mobile';
import Login from '@/components/Login';
import styles from './index.less';

const { Mobile, Captcha } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.models.login,
}))
class LoginPage extends Component {
  state = {
    type: 'mobile',
    phone: '',
    hasPhoneError: false,
  };

  onErrorClick = () => {
    const { hasPhoneError } = this.state;
    if (hasPhoneError) {
      Toast.info('请输入11位手机号码');
    }
  };

  onPhoneChange = value => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasPhoneError: true,
      });
    } else {
      this.setState({
        hasPhoneError: false,
      });
    }
    this.setState({
      phone: value,
    });
  };

  onCodeChange = value => {
    if (value.replace(/\s/g, '').length >= 4) {
      const { phone } = this.state;
      this.handleSubmit('', { loginCode: phone.replace(/\s+/g, ''), code: value });
    }
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      // this.loginForm.validateFields(['mobile'], {}, (err, values) => {
      //   if (err) {
      //     reject(err);
      //   } else {
      const { phone } = this.state;
      const { dispatch } = this.props;
      dispatch({
        type: 'login/getCaptcha',
        payload: { mobile: phone.replace(/\s+/g, ''), TemplateNo: '1' },
      })
        .then(resolve)
        .catch(reject);
      //   }
      // });
    });

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/regist',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  renderMessage = content => (
    <span style={{ marginBottom: 24 }} type="error">
      {content}
    </span>
  );

  render() {
    const { submitting } = this.props;
    const { type, hasPhoneError } = this.state;
    return (
      <div className={styles.main}>
        <div>请绑定手机号</div>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Mobile
            name="mobile"
            customprops={{ type: 'phone', onChange: this.onPhoneChange, error: hasPhoneError }}
            error={hasPhoneError}
            onErrorClick={this.onErrorClick}
            placeholder="手机号码"
          />

          <Captcha
            name="captcha"
            placeholder="短信验证码"
            onChange={this.onCodeChange}
            countDown={29}
            onGetCaptcha={this.onGetCaptcha}
            getCaptchaButtonText="发送验证码"
            getCaptchaSecondText="秒"
          />
          <WhiteSpace size="lg" />
          <Button type="primary" onClick={this.handleSubmit}>
            立即登录
          </Button>
          {/* <Submit loading={submitting}>
            绑定手机号
          </Submit> */}
        </Login>
      </div>
    );
  }
}

export default LoginPage;
