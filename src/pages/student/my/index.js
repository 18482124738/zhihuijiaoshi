import React, { PureComponent } from 'react';
import { Modal, List, Toast, Icon } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './index.less';
// import { push } from 'react-router-redux';
import { setRole } from '@/utils/authority';

@connect(({ userInfo, loading }) => ({
  userInfo,
  loading: loading.models.userInfo,
}))
class My extends PureComponent {
  state = {};

  // 获取用户信息
  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'userInfo/fetch',
    // });
    setRole('1');
  }

  // 进入个人信息界面
  goUserInformation = () => {
    router.push({
      pathname: './my/personalInformation',
    });
  };

  // 退出登录
  loginOut = () => {
    const { dispatch } = this.props;
    Modal.alert('退出', '确定要退出登录？', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          dispatch({
            type: 'login/logout',
          });
        },
      },
    ]);
  };

  render() {
    const {
      userInfo: { currentUser },
    } = this.props;
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <div className={styles.my_top}>
          <div className={styles.left} onClick={this.goUserInformation}>
            <div className={styles.Avatar}>
              {/* <img alt="" src={require('../pic/avatar.jpg')} style={{width:"100%",height:"100%"}}/>  */}
            </div>
            <div className={styles.userName}>{currentUser.RealName ? currentUser.RealName : ""}</div>
          </div>
          <div className={styles.right}>
            <Icon type="message" />
          </div>
        </div>
        {/* <div className={styles.option}>
          <div className={styles.option_box}>
            <div className={styles.option_icon}><Icon type="profile" /></div>
            <div className={styles.option_text}>订单管理</div>
          </div>
          <div className={styles.option_box}>
            <div className={styles.option_icon}><Icon type="download" /></div>
            <div className={styles.option_text}>下载管理</div>
          </div>
          <div className={styles.option_box}>
            <div className={styles.option_icon}><Icon type="heart" /></div>
            <div className={styles.option_text}>收藏</div>
          </div>
          <div className={styles.option_box}>
            <div className={styles.option_icon}><Icon type="clock-circle" /></div>
            <div className={styles.option_text}>最近浏览</div>
          </div>
        </div> */}

        {/* <List className="my-list" style={{ marginTop: "5px" }}>
          <List.Item extra={currentUser.Balance} arrow="horizontal" onClick={() => { }}>余额</List.Item>
        </List>
        <List className="my-list" style={{ marginTop: "5px" }}>
          <List.Item arrow="horizontal" onClick={() => { }}>福利专区</List.Item>
          <List.Item arrow="horizontal" onClick={() => { }}>4G流量免费上课</List.Item>
        </List> */}
        <List className="my-list" style={{ marginTop: '5px' }}>
          <List.Item arrow="horizontal" onClick={() => { }}>
            反馈建议
          </List.Item>
          <List.Item arrow="horizontal" onClick={() => { }}>
            设置
          </List.Item>
          <List.Item arrow="horizontal" onClick={this.loginOut}>
            <span style={{ color: 'red' }}>退出</span>
          </List.Item>
        </List>
      </div>
    );
  }
}
export default My;
