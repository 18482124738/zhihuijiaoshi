import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PublicNavBar from '@/publicAssembly/NavBar';
import { Icon, Modal, Toast } from 'antd-mobile';
import router from 'umi/router';
import ATTENCEALL from '@/publicAssembly/Icons/attenceAll.svg';
import NOTATTENCE from '@/publicAssembly/Icons/notAttence.svg';
import ATTENCE from '@/publicAssembly/Icons/attence.svg';
import PERSONIMG from '@/publicAssembly/Icons/pimg.jpg';

import styles from './index.less';

@connect(({ teachRecord, teachRecordStudent, loading }) => ({
  teachRecord,
  teachRecordStudent,
  teachRecordLoading: loading.effects['teachRecord/fetchModel'],
}))
class Attendance extends PureComponent {
  state = {};

  componentWillMount() {
    const {
      dispatch,
      location: { state },
    } = this.props;
    dispatch({
      type: 'teachRecord/fetchModel',
      payload: { Id: state.TeachRecordId },
      callback: res => {
        dispatch({ type: 'teachRecordStudent/fetch', payload: { TeachRecordId: res.Id } });
      },
    });
  }

  ChangeNum = () => {
    const {
      dispatch,
      teachRecord: { current },
    } = this.props;
    Modal.prompt(
      '请输入应到人数',
      '',
      [
        { text: '取消' },
        {
          text: '确定',
          onPress: value => {
            if (value !== '') {
              current.ShouldArriveNum = value;
              dispatch({ type: 'teachRecord/update', payload: current });
            } else {
              Toast.info('未输入应到人数，已取消修改！', 2);
            }
          },
        },
      ],
      'default',
      null
    );
  };

  render() {
    const {
      teachRecord: { current },
      teachRecordStudent,
    } = this.props;
    const currentRows = teachRecordStudent.data.Rows;
    const {
      location: { state },
    } = this.props;
    return (
      <div>
        <PublicNavBar
          NavBarTitle="课堂考勤"
          NavBarLeft={
            <Icon
              size="lg"
              type="left"
              onClick={() =>
                state.teachRecordId
                  ? router.push('/nolayout/teacher/teacherHistorical/singleDetail', {
                      query: state.teachRecordId,
                    })
                  : router.push('/teacher/home')
              }
            />
          }
        />
        <div className={styles.attendanceHead}>
          <div className={styles.attendanceHeadBox} onClick={this.ChangeNum}>
            <img alt="头像" src={ATTENCEALL} className={styles.attendanceHeadImg} />
            <div>
              <span style={{ fontSize: 18 }}>{current.ShouldArriveNum || '--'}</span> 人
            </div>
          </div>
          <div className={styles.attendanceHeadBox}>
            <img alt="头像" src={ATTENCE} className={styles.attendanceHeadImg} />
            <div>
              <span style={{ fontSize: 18, color: '#2ae677' }}>
                {current.AttendanceNum || '--'}
              </span>
              人
            </div>
          </div>
          <div className={styles.attendanceHeadBox}>
            <img alt="头像" src={NOTATTENCE} className={styles.attendanceHeadImg} />
            <div>
              <span style={{ fontSize: 18, color: '#e63e3a' }}>{current.AbsenceNum || '--'}</span>人
            </div>
          </div>
        </div>
        <div style={{ height: 140 }} />
        {currentRows &&
          currentRows.map(item => (
            <div className={styles.testAllDetailBox}>
              <div className={styles.testAllDetailBoxBody}>
                <img alt="头像" src={PERSONIMG} className={styles.testAllDetailBBImg} />
                <span className={styles.testAllDetailBBSpan}>
                  姓名：{item.UserInfo ? item.UserInfo.RealName : '--'}
                </span>
                <span style={{ marginLeft: 3, position: 'relative', top: 1, fontSize: 12 }}>
                  学号：{item.UserInfo ? item.UserInfo.Number : '--'}
                </span>
                <span style={{ marginLeft: 5, position: 'relative', top: 1, fontSize: 12 }}>
                  状态：{item.State === 1 ? '出勤' : '缺勤'}
                </span>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default Attendance;
