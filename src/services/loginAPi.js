import ServerHost from '../../config/server.config';
import request from '@/utils/request';

// 用户验证请求
export async function accountLogin(params) {
  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', 'msc.client');
  formData.append('client_secret', 'msc');
  // formData.append('scope', 'msc');
  formData.append('username', params.userName);
  formData.append('password', params.password);

  return request(`${ServerHost.AuthServer}/connect/token`, {
    method: 'POST',
    body: formData,
  });
}

// 获取验证码
export async function getFakeCaptcha(params) {
  return request(`${ServerHost.VerificationCodeService}/SendSms/SendSms`, {
    method: 'POST',
    body: { mobile: params.mobile, TemplateNo: params.TemplateNo },
  });
}

// 客服端模式获取token
export async function clientCredentials() {
  const formData = new FormData();
  formData.append('client_id', 'client');
  formData.append('client_secret', 'secret');
  formData.append('grant_type', 'client_credentials');
  return request(`${ServerHost.AuthServer}/connect/token`, {
    method: 'POST',
    body: formData,
  });
}

// 验证码验证是否正确
export async function verificationVerificationCode(params) {
  return request(`${ServerHost.VerificationCodeService}/SendSms/ValidationCode`, {
    method: 'POST',
    body: { phone: params.loginCode, code: params.code, key: params.key },
  });
}

// 通过短信验证码获取token
export async function SmsLogin(params) {
  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', 'msc.client');
  formData.append('client_secret', 'msc');
  // formData.append('scope', 'msc');
  formData.append('codekey', params.key);
  formData.append('password', params.code);
  formData.append('username', params.loginCode);
  formData.append('logintype', '2');

  return request(`${ServerHost.AuthServer}/connect/token`, {
    method: 'POST',
    body: formData,
  });
}

// 通过微信获取token
export async function weChatLogin(params) {
  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', 'msc.client');
  formData.append('client_secret', 'msc');
  // formData.append('scope', 'msc');
  formData.append('password', '0');
  formData.append('username', '0');
  formData.append('logintype', '4');
  formData.append(
    'quick',
    `{"openid": "${
      params.openId
    }","nickname": "","sex":1 ,"city": "","province": "","country": "","headimgurl": "","privilege": [],"unionid": "${
      params.openId
    }","appid": "wx283826bb47a11f95"}`
  );

  return request(`${ServerHost.AuthServer}/connect/token`, {
    method: 'POST',
    body: formData,
  });
}

// 通过微信获取token
export async function weChatBind(params) {
  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', 'msc.client');
  formData.append('client_secret', 'msc');
  // formData.append('scope', 'msc');
  formData.append('password', '0');
  formData.append('username', '0');
  formData.append('logintype', '5');
  formData.append(
    'quick',
    `{"openid": "${params.openId}","Code": "${params.code}","Key":"${params.key}","Phone": "${
      params.loginCode
    }","unionid": "${params.openId}","appid": "wx283826bb47a11f95"}`
  );

  return request(`${ServerHost.AuthServer}/connect/token`, {
    method: 'POST',
    body: formData,
  });
}
