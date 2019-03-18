import React, { PureComponent } from 'react';
import { connect } from 'dva';

import styles from './index.less';

// @connect(({ courseInfo, loading }) => ({
//   courseInfo: courseInfo.data,
//   courseTeacherLoading: loading.effects['courseInfo/fetch'],
// }))
class StudentPractice extends PureComponent {
  state = {};

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'courseInfo/fetchUserList',
    // });
  }
  render() {
    // const {
    //   loading,
    //   courseInfo: { Rows },
    // } = this.props;
    return <h1>学生-课堂练习</h1>;
  }
}

export default StudentPractice;
