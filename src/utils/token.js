export function getToken() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString = localStorage.getItem('msc-token');
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  return authority;
}

export function setToken(token) {
  if (token === null) {
    return localStorage.removeItem('msc-token');
  }
  return localStorage.setItem('msc-token', JSON.stringify(token));
}

