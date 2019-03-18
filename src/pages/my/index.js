import React, { Component } from 'react'
import { connect } from 'dva';
import router from 'umi/router';
import { getUserInfo } from '@/utils/authority';
import styles from './index.less';

@connect(({ my }) => ({ my }))
class MyIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    const userInfo =getUserInfo();
    if(userInfo.Role===2){
      router.push('/teacher/my');
    }else{
      router.push('/student/my');
    }

  }
  

  render() {
    // const { my } = this.props;
    // const { not_login } = this.state;
    return (
      <div className={styles.content_me}>
       
        {/* <NameCard
          name={not_login ? JSON.parse(localStorage.getItem('USER_INFO')).name : '登录/注册'}
          avatar={this.state.avatar}
          notLogin={not_login ? 1 : 0}
        />
          <MyList/>  */}
      </div>
    )
  }
}
export default MyIndex;
