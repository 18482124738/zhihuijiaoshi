import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
import router from 'umi/router';
import personImg from '@/publicAssembly/Icons/pimg.jpg';
import PublicNavBar from '@/publicAssembly/NavBar';
// import PublicTab from '@/publicAssembly/Tab';
import styles from './index.less';

@connect(({ teachRecordStudent, loading }) => ({
  teachRecordStudent,
  teachRecordStudentLoading: loading.effects['teachRecordStudent/fetchStudents'],
}))
class ClassPortrait extends PureComponent {
  state = {};

  componentWillMount() {
    const {
      location: { state },
      dispatch,
    } = this.props;
    dispatch({
      type: 'teachRecordStudent/fetchStudents',
      payload: { TeachRecordId: state.teachRecordId },
    });
  }

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'courseInfo/fetchUserList',
    // });
  }

  linkToDetail = (Id, TeachRecordId) => {
    router.push('/nolayout/student/studentHistorical/singleDetail', {
      Id,
      TeachRecordId,
      back: 2, // 返回：1代表学生，2代表老师
    });
  };

  render() {
    const { teachRecordStudent } = this.props;
    const currentRows = teachRecordStudent.data.Rows;
    return (
      <div>
        <PublicNavBar
          NavBarTitle="班级画像"
          NavBarLeft={
            <Icon
              type="left"
              size="lg"
              onClick={() => router.push({ pathname: '/teacher/home' })}
            />
          }
        />
        {currentRows &&
          currentRows.map(item => {
            let userName = '暂无';
            if (item && item.UserInfo && item.UserInfo.RealName) {
              userName = item.UserInfo.RealName;
            }
            let userNum = '暂无';
            if (item && item.UserInfo && item.UserInfo.Number) {
              userNum = item.UserInfo.Number;
            }
            return (
              <div
                className={styles.testAllDetailBox}
                onClick={() => this.linkToDetail(item.Id, item.TeachRecordId)}
              >
                <div className={styles.testAllDetailBoxBody}>
                  <img src={personImg} className={styles.testAllDetailBBImg} alt="头像" />
                  <span className={styles.testAllDetailBBSpan}> 姓名：{userName}</span>
                  <span
                    style={{
                      marginLeft: 10,
                      position: 'relative',
                      top: 1,
                      fontSize: 12,
                    }}
                  >
                    {' '}
                    学号：{userNum}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ClassPortrait;
