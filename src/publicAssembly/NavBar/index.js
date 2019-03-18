import React, { PureComponent } from 'react';
import { NavBar } from 'antd-mobile';
import styles from './index.less';




// @connect(({ courseInfo, loading }) => ({
//   courseInfo: courseInfo.data,
//   courseTeacherLoading: loading.effects['courseInfo/fetch'],
// }))

class PublicNavBar extends PureComponent {
  state = {};

  render() {
    const {NavBarTitle,NavBarLeft,NavBarRight} = this.props;

    return (
      <div>
        <NavBar mode="dark" className={styles.navBarBox} leftContent={NavBarLeft} rightContent={NavBarRight}>{NavBarTitle} </NavBar>
        <div style={{height:45}} />
      </div>
    );
  }
}

export default PublicNavBar;
