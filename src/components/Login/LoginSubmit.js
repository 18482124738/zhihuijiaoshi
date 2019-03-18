import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd-mobile';
import styles from './index.less';


const LoginSubmit = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return (
    <div>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />
    </div>
  );
};

export default LoginSubmit;
