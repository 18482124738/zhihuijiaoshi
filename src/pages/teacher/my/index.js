import React from 'react';
import { connect } from 'dva';
import { Modal, List, Icon } from 'antd-mobile';
import { getUserInfo, getRole, setRole } from '@/utils/authority';
import router from 'umi/router';
import styles from './index.less';

@connect(({ userInfo, loading, teachRecord }) => ({
  userInfo,
  loading: loading.models.userInfo,
  teachRecord,
}))
class My extends React.Component {
  constructor(props) {
    super(props);
    const role = getRole();
    this.state = {
      roleName: role === '1' ? '学员' : '老师',
    };
  }



  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'teachRecord/getScore',
    })
  }


  // 教师个人详细信息界面
  goPersonalInformation = () => {
    router.push({
      pathname: './my/personalInformation',
    });
  };

  changeRole = () => {
    const self = this;
    Modal.alert('角色切换', '确定进行此操作吗?', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          const userInfo = getUserInfo();
          const role = parseInt(getRole(), 10);
          if (userInfo.Role !== role && role) {
            setRole('2');
            self.setState({ roleName: '老师' });
          } else {
            setRole('1');
            self.setState({ roleName: '学员' });
          }
        },
      },
    ]);
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
    const { userInfo: { currentUser },teachRecord:{getScore}} = this.props;
    const { roleName } = this.state;
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <div className={styles.my_top}>
          <div className={styles.left} onClick={this.goPersonalInformation}>
            <div className={styles.Avatar}>
              {/* <img alt="" src={require('../pic/avatar.jpg')} style={{width:"100%",height:"100%"}}/>  */}
            </div>
            <div className={styles.userName}>
              {currentUser.RealName}({roleName})
            </div>
          </div>
          <div className={styles.right}>
            <Icon type="ellipsis" />
          </div>
        </div>
        {/*  <div className={styles.option}>
          <div className={styles.option_box}>
            <div className={styles.option_icon}>
              <Icon type="profile" />
            </div>
            <div className={styles.option_text}>订单管理</div>
          </div>
          <div className={styles.option_box}>
            <div className={styles.option_icon}>
              <Icon type="download" />
            </div>
            <div className={styles.option_text}>下载管理</div>
          </div>
          <div className={styles.option_box}>
            <div className={styles.option_icon}>
              <Icon type="heart" />
            </div>
            <div className={styles.option_text}>收藏</div>
          </div>
          <div className={styles.option_box}>
            <div className={styles.option_icon}>
              <Icon type="clock-circle" />
            </div>
            <div className={styles.option_text}>最近浏览</div>
          </div>
        </div> */}

        <List className="my-list" style={{ marginTop: '5px' }}>
          <List.Item extra={getScore.Data&&getScore.Data.Score} arrow="horizontal" onClick={() => { }}>
            积分
          </List.Item>
        </List>
        <List className="my-list" style={{ marginTop: '5px' }}>
          <List.Item arrow="horizontal" onClick={() => { }}>
            绑定各账号
          </List.Item>
          <List.Item arrow="horizontal" onClick={() => { }}>
            我的画像
          </List.Item>
        </List>
        <List className="my-list" style={{ marginTop: '5px' }}>
          <List.Item arrow="horizontal" onClick={this.changeRole}>
            角色切换
          </List.Item>
        </List>
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
