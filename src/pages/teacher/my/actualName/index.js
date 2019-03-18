import React from 'react'
import { Button, List, Icon, InputItem } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';
import PublicNavBar from '@/publicAssembly/NavBar';
import { createForm } from 'rc-form';
import styles from './index.less';



@connect(({ userInfo, loading }) => ({
  userInfo,
  loading: loading.models.userInfo,
}))
class actualName extends React.Component {


  // 获取用户信息
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetch',
    });
  }

  updataName = (currentUser) => {
    const { dispatch, form } = this.props;
    currentUser.RealName = form.getFieldsValue().RealName;
    dispatch({
      type: 'userInfo/update',
      payload: currentUser,
    })
    this.goPersonalInformation();
  }
  /*
  ****************** */

  // 返回教师个人详细信息界面
  goPersonalInformation = () => {
    router.push({
      pathname: "/teacher/my/personalInformation"
    })
  }


  render() {
    const { userInfo: { currentUser }, form: { getFieldProps }, } = this.props;
    return (
      <div className={styles.box_actualName}>
        <PublicNavBar
          NavBarTitle="真实姓名"
          NavBarLeft={<Icon type="left" size='lg' onClick={this.goPersonalInformation} />}
          NavBarRight=""
        />
        <List>
          <InputItem
            clear
            placeholder="请输入真实姓名"
            {...getFieldProps('RealName')}
          >真实姓名：
          </InputItem>
        </List>
        <Button style={{ margin: "10px 15px 0 15px", height: "35px", lineHeight: "35px" }} type="primary" onClick={() => this.updataName(currentUser)}>保存</Button>
      </div>
    );
  }
}
export default createForm()(actualName);
