import React from 'react'
import { Button,  List, Icon, InputItem  } from 'antd-mobile';
// import { Icon, Input } from 'antd';
import router from 'umi/router';
import { createForm } from 'rc-form';
import styles from './index.less';
import { connect } from 'dva';
import PublicNavBar from '@/publicAssembly/NavBar';



@connect(({ userInfo, loading }) => ({
  userInfo,
  loading: loading.models.userInfo,
}))
class studentID extends React.Component {
  

  // 获取用户信息
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/fetch',
    });
  }

  // ****修改真实姓名*******/
  
  updataNumber = (currentUser) => {
    const { dispatch , form} = this.props;
    currentUser.Number = form.getFieldsValue().Number;
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

  render() {
    const { userInfo: { currentUser }, form: { getFieldProps }, } = this.props;
    return (
      <div className={styles.box_actualName}>
        <PublicNavBar
          NavBarTitle="修改学号"
          NavBarLeft={<Icon type="left" size='lg' onClick={this.goPersonalInformation} />}
          NavBarRight=""
        />
        <List>
          <InputItem
            clear
            placeholder="请输入学号"
            {...getFieldProps('Number')}
          >学号：
          </InputItem>
        </List>
        <Button style={{ margin: "10px 15px 0 15px", height: "35px", lineHeight: "35px" }} type="primary" onClick={() => this.updataNumber(currentUser)}>保存</Button>
      </div>
    );
  }
}
export default createForm()(studentID);
