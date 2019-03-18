import React from 'react'
import { List, Icon } from 'antd-mobile';
import router from 'umi/router';
import styles from './index.less';
import { connect } from 'dva';
import PublicNavBar from '@/publicAssembly/NavBar';


const Item = List.Item;
const Brief = Item.Brief;


@connect(({ userInfo, loading }) => ({
  userInfo,
  loading: loading.models.userInfo,
}))
class personalInformation extends React.Component {
  state = {
    disabled: false,
  }

  // 获取用户信息
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetch',
    });
  }

  // 返回学生信息
  goStudentMy = () => {
    router.push({
      pathname: "/student/my"
    })
  }

  // 真实姓名编辑
  goName = () => {
    router.push({
      pathname: '/student/my/actualName',
    })
  }

  // 性别编辑
  goGender = () => {
    router.push({
      pathname: "/student/my/gender",
    })
  }

  // 学号编辑
  goStudentID = () => {
    router.push({
      pathname: "/student/my/studentID",
    })
  }


  render() {
    const { userInfo: { currentUser } } = this.props;
    return (
      <div className={styles.box_personalInformation}>
        <PublicNavBar
          NavBarTitle="个人信息"
          NavBarLeft={<Icon type="left" size='lg' onClick={this.goStudentMy} />}
          NavBarRight=""
        />
        <List className="my-list" onClick={() => { }}>
          <Item arrow="horizontal" multipleLine extra={currentUser.RealName ? currentUser.RealName : ''} onClick={this.goName}>真实姓名</Item>
          {/* <Item arrow="horizontal" multipleLine extra="暂无数据" onClick={this.goGender}>性别</Item> */}
          <Item arrow="horizontal" multipleLine extra={currentUser.Number ? currentUser.Number :''} onClick={this.goStudentID}>学号</Item>
          {/* <Item arrow="horizontal" multipleLine extra={currentUser.Tel ? currentUser.Tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : ""}>手机号</Item> */}
        </List>
      </div>
    );
  }
}
export default personalInformation;
