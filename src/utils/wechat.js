export function getOpenId() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('wechat-openId') : '';
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }  
  return authority ;
}

export function setOpenId(openId) {
  return localStorage.setItem('wechat-openId', openId);
}

