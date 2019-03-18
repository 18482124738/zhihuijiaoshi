import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Icon, List, Steps } from 'antd-mobile';
// import router from 'umi/router';
import router from 'umi/router';
import styles from './index.less';
import teacherAssessment from '@/utils/teacherEchart';
import PublicNavBar from '@/publicAssembly/NavBar';
import EMPTYSTAR from '@/publicAssembly/Icons/emptyStar.png';
import FILLSTAR from '@/publicAssembly/Icons/fillStar.png';
import BANJI from '@/publicAssembly/Icons/banji.svg';
import KESHI from '@/publicAssembly/Icons/keshi.svg';
import KECHENG from '@/publicAssembly/Icons/kecheng.svg';

@connect(({ teachRecordStudent, loading }) => ({
  teachRecordStudent,
  teachRecordStudentLoading: loading.effects['teachRecordStudent/fetchModel'],
}))
class SingleDetail extends PureComponent {
  state = {};

  componentWillMount() {
    const {
      location: { state },
      dispatch,
    } = this.props;
    dispatch({
      type: 'teachRecordStudent/fetchModel',
      payload: { Id: state.Id, TeachRecordId: state.TeachRecordId },
    });
  }

  componentWillUpdate() {
    const {
      teachRecordStudent: { current },
    } = this.props;
    const scores = [];
    scores.push(
      current.AttendanceScore || 0,
      current.Active || 0,
      current.PracticeScore || 0,
      current.DiscussScore || 0,
      current.FilesScore || 0
    ); // 出勤，专注，练习，讨论，资料
    teacherAssessment(scores, this.studentSingleDetail);
  }

  handleGirdClick = (el, index) => {
    console.log(el, index);
    switch (el.text) {
      case '资料':
        // router.push('/nolayout/teacher/attendance', { data: el.text });
        break;
      case '考勤':
        // router.push('/nolayout/teacher/infoIssuance');
        break;
      case '讨论':
        // router.push('/nolayout/teacher/teacherDiscussion');
        break;
      case '测验':
        // this.StartEnd();
        break;
      default:
        break;
    }
  };

  handleBack = () => {
    const {
      location: { state },
    } = this.props;
    if (state.back === 1) {
      router.push('/nolayout/student/studentHistorical');
    } else {
      router.push('/nolayout/teacher/classPortrait', { teachRecordId: state.TeachRecordId });
    }
  };

  render() {
    const { teachRecordStudent } = this.props;
    const currentInfo = teachRecordStudent.current;
    const timeLine = teachRecordStudent.timeLine.Rows ? teachRecordStudent.timeLine.Rows : [];
    let createTime = '--';
    if (currentInfo.CreateTime) {
      createTime = currentInfo.CreateTime.slice(0, 10);
    }
    let courseName = '--';
    if (currentInfo.TeachRecord && currentInfo.TeachRecord.CourseName) {
      courseName = currentInfo.TeachRecord.CourseName;
    }
    let gradeName = '--';
    if (currentInfo.TeachRecord && currentInfo.TeachRecord.ClassName) {
      gradeName = currentInfo.TeachRecord.CourseName;
    }
    let classRoomName = '--';
    if (currentInfo.TeachRecord && currentInfo.TeachRecord.ClassRoomName) {
      classRoomName = currentInfo.TeachRecord.ClassRoomName;
    }
    return (
      <div>
        <PublicNavBar
          NavBarTitle={classRoomName}
          NavBarLeft={[<Icon type="left" size="lg" onClick={this.handleBack} />]}
          NavBarRight={[<Icon key="0" type="ellipsis" />]}
        />
        <WingBlank size="md">
          <List>
            <List.Item extra={courseName}>
              <img src={KECHENG} alt="科目" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>科目</span>
            </List.Item>
            <List.Item extra={gradeName}>
              <img src={BANJI} alt="班级" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>班级</span>
            </List.Item>
            <List.Item extra={createTime}>
              <img src={KESHI} alt="创建时间" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>创建时间</span>
            </List.Item>
          </List>
          <WhiteSpace />
          <div>
            <span>课堂评估：</span>
            <span>
              {[0, 1, 2, 3, 4].map(item => {
                let img = EMPTYSTAR;
                if (currentInfo.Star && item < currentInfo.Star) {
                  img = FILLSTAR;
                }
                return <img alt="星级" src={img} style={{ width: 20, height: 20 }} key={item} />;
              })}
            </span>
            <div
              ref={e => {
                this.studentSingleDetail = e;
              }}
              style={{ width: '100%', height: '185%' }}
            />
          </div>
          <WhiteSpace />
          <Steps size="small" current={timeLine.length}>
            {timeLine.map(item => (
              <Steps.Step
                title={[
                  <span style={{ fontWeight: 'normal' }}>
                    {item.CreateTime} [{item.Name}]
                  </span>,
                ]}
                description={item.Text}
              />
            ))}
          </Steps>
        </WingBlank>
      </div>
    );
  }
}

export default SingleDetail;
