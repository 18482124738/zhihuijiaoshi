import React from 'react'
import { Button,  List, Icon, InputItem } from 'antd-mobile';
import router from 'umi/router';
import { createForm } from 'rc-form';
import styles from './index.less';
import { connect } from 'dva';
import PublicNavBar from '@/publicAssembly/NavBar';




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

  // ****修改真实姓名*******/
  

  updataName = (currentUser) => {
    const { dispatch , form } = this.props;
    currentUser.RealName = form.getFieldsValue().RealName;
    dispatch({
      type: 'userInfo/update',
      payload: currentUser,
    })
    this.goPersonalInformation();
  }

  /* ****************** */

  // 返回学生个人信息
  goPersonalInformation = () => {
    router.push({
      pathname: "/student/my/personalInformation"
    })
  }

  // onChange = (e) => {
  //   console.log(e);
  // };

  render() {
    const { userInfo: { currentUser }, form: { getFieldProps },} = this.props;
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
          >
          真实姓名：
          </InputItem>
        </List>
        <Button style={{ margin: "10px 15px 0 15px", height: "35px", lineHeight: "35px" }} type="primary" onClick={() => this.updataName(currentUser)}>保存</Button>
      </div>
    );
  }
}
export default createForm()(actualName);
