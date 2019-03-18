import { Toast } from 'antd-mobile';

export function config() {
  return {
    onError(err) {
      err.preventDefault();
      Toast.fail(err.message,3);
    }
  };
}
