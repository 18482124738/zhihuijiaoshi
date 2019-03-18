import React, { PureComponent } from 'react';
import { Popover } from 'antd-mobile';
import classNames from 'classnames';
import styles from './index.less';

export default class HeaderDropdown extends PureComponent {
  render() {
    const { overlayClassName, ...props } = this.props;
    return (
      <Popover overlayClassName={classNames(styles.container, overlayClassName)} {...props} />
    );
  }
}
