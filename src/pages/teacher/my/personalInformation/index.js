import React  from 'react'
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

  // 返回教师信息界面
  goTeacherMy = () => {
    router.push({
      pathname: "/teacher/my"
    })
  }

  // 真实姓名编辑
  goName = () => {
    router.push({
      pathname: "/teacher/my/actualName",
    })
  }

  // 性别编辑
  goGender = () => {
    router.push({
      pathname: "/teacher/my/gender",
    })
  }

  // 工号编辑
  goTeacherID = () => {
    router.push({
      pathname: "/teacher/my/teacherID",
    })
  }

  render() {
    const { userInfo: { currentUser }} = this.props;
    return (
      <div className={styles.box_personalInformation}>
        <PublicNavBar
          NavBarTitle="个人信息"
          NavBarLeft={<Icon type="left" size='lg' onClick={this.goTeacherMy} />}
          NavBarRight=""
        />
        <List className="my-list" onClick={() => { }}>
          <Item arrow="horizontal" multipleLine extra={currentUser.RealName ? currentUser.RealName :''} onClick={this.goName}>真实姓名</Item>
          {/* <Item arrow="horizontal" multipleLine extra="暂无数据" onClick={this.goGender}>性别</Item> */}
          <Item arrow="horizontal" multipleLine extra={currentUser.Number ? currentUser.Number :''} onClick={this.goTeacherID}>工号</Item>
          {/* <Item arrow="horizontal" multipleLine extra={currentUser.Tel?currentUser.Tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'):""}>手机号</Item> */}
        </List>
      </div>
    );
  }
}
export default personalInformation;
