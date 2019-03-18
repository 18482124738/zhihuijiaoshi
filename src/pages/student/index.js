import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { WingBlank, List, Grid, Modal, Toast, Icon, Steps } from 'antd-mobile';
import styles from './index.less';
import teacherAssessment from '@/utils/teacherEchart';
import EMPTYSTAR from '@/publicAssembly/Icons/emptyStar.png';
import FILLSTAR from '@/publicAssembly/Icons/fillStar.png';
import PublicNavBar from '@/publicAssembly/NavBar';

import TIANJIA from '@/publicAssembly/Icons/tianjia2.svg';
import LISHI from '@/publicAssembly/Icons/lishi.svg';
import HUAXIANG from '@/publicAssembly/Icons/huaxiang.svg';
import LIANXI from '@/publicAssembly/Icons/lianxi.svg';
import ZILIAO from '@/publicAssembly/Icons/ziliao.svg';
import TAOLUN from '@/publicAssembly/Icons/taolun.svg';
import QIANDAO from '@/publicAssembly/Icons/qiandao.svg';
import TOUPIAO from '@/publicAssembly/Icons/toupiao.svg';

import KECHENGSVG from '@/publicAssembly/Icons/kecheng.svg';
import BANJISVG from '@/publicAssembly/Icons/banji.svg';
import KESHISVG from '@/publicAssembly/Icons/keshi.svg';
import JIAOSHISVG from '@/publicAssembly/Icons/jiaoshi.svg';
import ZHUANGTAISVG from '@/publicAssembly/Icons/zhuangtai.svg';
import KAOQINSVG from '@/publicAssembly/Icons/kaoqin.svg';

@connect(({ teachRecordStudent, userInfo, loading }) => ({
  userInfo,
  teachRecordStudent,
  teachRecordStudentLoading: loading.effects['teachRecordStudent/fetchLately'],
}))
class Student extends PureComponent {
  state = {};

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'teachRecordStudent/fetchLately',
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
    teacherAssessment(scores, this.studentAssessment);
  }

  handleGirdClick = el => {
    const {
      teachRecordStudent: { current },
    } = this.props;
    switch (el.text.props.children) {
      case '加入课程':
        this.JoinClass();
        break;
      case '历史记录':
        router.push('/nolayout/student/studentHistorical', { data: el.text.props.children });
        break;
      case '我的画像':
        // router.push('/student/myPortrait');
        Modal.alert('开发中。。。', '敬请期待！', [{ text: '确定' }]);
        break;
      case '课堂练习':
        localStorage.setItem('InitialPage', 0);
        router.push('/nolayout/student/test', { teachRecordId: current.TeachRecordId });
        break;
      case '资料下载':
        router.push({
          pathname: '/nolayout/student/dataDownload',
          query: { teachRecordId: current.TeachRecordId },
        });
        break;
      case '分组讨论':
        router.push({
          pathname: '/nolayout/student/studentDiscussion',
          query: { teachRecordId: current.TeachRecordId },
        });
        break;
      case '快速签到':
        this.QuickCheck();
        break;
      case '投票打分':
        router.push('/nolayout/student/votingRate');
        break;
      default:
        break;
    }
  };

  /* 加入班级 */
  JoinClass = () => {
    const { dispatch } = this.props;
    Modal.prompt(
      '请输入课程号',
      '',
      [
        {
          text: '取消',
          // onPress: value =>
          //   new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve();
          //       Toast.info('取消加入！', 1);
          //     }, 200);
          //   }),
        },
        {
          text: '加入',
          onPress: value => {
            if (value !== '') {
              dispatch({
                type: 'teachRecordStudent/add',
                payload: {
                  TeachRecordId: value,
                },
              });
            } else {
              Toast.info('未输入课程号，已取消加入！', 2);
            }
          },
        },
      ],
      'default',
      null
    );
  };

  /* 快速签到 */
  QuickCheck = () => {
    // do something
    const {
      dispatch,
      teachRecordStudent: { current },
    } = this.props;
    if (current && current.State !== 1) {
      current.State = 1;
      dispatch({ type: 'teachRecordStudent/update', payload: current });
      // Toast.info('成功签到！', 1);
    }
  };

  render() {
    const {
      teachRecordStudent,
      userInfo: { currentUser },
    } = this.props;
    const currentInfo = teachRecordStudent.current;
    const timeLine = teachRecordStudent.timeLine.Rows ? teachRecordStudent.timeLine.Rows : [];
    let classRoomName = '未知教师';
    if (currentInfo.TeachRecord && currentInfo.TeachRecord.ClassRoomName) {
      classRoomName = currentInfo.TeachRecord.ClassRoomName;
    }
    let checkState = '未知'; // 考勤状态
    switch (currentInfo.State) {
      case 1:
        checkState = '出勤';
        break;
      case 2:
        checkState = '缺勤';
        break;
      case 3:
        checkState = '迟到';
        break;
      default:
        break;
    }
    let teacherName = '未知教师'; // 教师姓名
    if (currentInfo.TeachRecord && currentInfo.TeachRecord.UserName) {
      teacherName = currentInfo.TeachRecord.UserName;
    }
    let courseState = '未知状态'; // 开课状态
    if (currentInfo.TeachRecord && currentInfo.TeachRecord.Nowstate) {
      switch (currentInfo.TeachRecord.Nowstate) {
        case 1:
          courseState = '未开始';
          break;
        case 2:
          courseState = '正在上课';
          break;
        case 3:
          courseState = '已结束';
          break;
        default:
          break;
      }
    }
    let courseName = '未知课程'; // 当前课程
    if (currentInfo.TeachRecord && currentInfo.TeachRecord.CourseName) {
      courseName = currentInfo.TeachRecord.CourseName;
    }
    let gradeName = '未知班级'; // 班级
    if (currentInfo.TeachRecord && currentInfo.TeachRecord.ClassName) {
      gradeName = currentInfo.TeachRecord.ClassName;
    }
    let courseStart = '未知时间';
    if (currentInfo.TeachRecord && currentInfo.TeachRecord.CreateTime) {
      courseStart = currentInfo.TeachRecord.CreateTime.slice(0, 10);
    }
    const data = [
      {
        icon: <img src={TIANJIA} alt="加入课程" />,
        text: <span style={{ color: '#108ee9', fontSize: 14 }}>加入课程</span>,
      },
      {
        icon: <img src={QIANDAO} alt="快速签到" />,
        text: <span style={{ color: '#108ee9', fontSize: 14 }}>快速签到</span>,
      },
      {
        icon: <img src={ZILIAO} alt="资料下载" />,
        text: <span style={{ color: '#108ee9', fontSize: 14 }}>资料下载</span>,
      },
      {
        icon: <img src={TAOLUN} alt="分组讨论" />,
        text: <span style={{ color: '#108ee9', fontSize: 14 }}>分组讨论</span>,
      },
      {
        icon: <img src={LIANXI} alt="课堂练习" />,
        text: <span style={{ color: '#108ee9', fontSize: 14 }}>课堂练习</span>,
      },
      {
        icon: <img src={TOUPIAO} alt="投票打分" />,
        text: <span style={{ color: '#108ee9', fontSize: 14 }}>投票打分</span>,
      },
      {
        icon: <img src={HUAXIANG} alt="我的画像" />,
        text: <span style={{ color: '#108ee9', fontSize: 14 }}>我的画像</span>,
      },
      {
        icon: <img src={LISHI} alt="历史记录" />,
        text: <span style={{ color: '#108ee9', fontSize: 14 }}>历史记录</span>,
      },
    ];
    return (
      <div>
        <PublicNavBar
          NavBarLeft={classRoomName}
          NavBarRight={`${currentUser.RealName || '未知'}同学`}
        />
        <WingBlank size="md">
          <List>
            <List.Item
              extra={courseName}
              platform="android"
              onClick={() =>
                router.push('/nolayout/student/changeClass', {
                  oldId: currentInfo.Id,
                })
              }
              arrow="horizontal"
            >
              <img src={KECHENGSVG} alt="课程" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>课程</span>
            </List.Item>
            <List.Item extra={gradeName}>
              <img src={BANJISVG} alt="班级" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>班级</span>
            </List.Item>
            <List.Item extra={courseStart}>
              <img src={KESHISVG} alt="创建时间" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>创建时间</span>
            </List.Item>
            <List.Item extra={teacherName}>
              <img src={JIAOSHISVG} alt="教师" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>教师</span>
            </List.Item>
            <List.Item extra={courseState}>
              <img src={ZHUANGTAISVG} alt="状态" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>状态</span>
            </List.Item>
            <List.Item extra={checkState}>
              <img src={KAOQINSVG} alt="考勤" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>考勤</span>
            </List.Item>
          </List>
          <div style={{ margin: '5% 0' }}>
            <Grid
              data={data}
              hasLine={false}
              square={false}
              itemStyle={{ borderRadius: '15%', margin: '6px', boxShadow: '0px 0px 3px #ABABAB' }}
              onClick={el => this.handleGirdClick(el)}
            />
          </div>
          <div>
            <span>课堂评估：</span>
            <span>
              {[0, 1, 2, 3, 4].map(item => {
                let img = EMPTYSTAR;
                if (currentInfo.Star && item < currentInfo.Star) {
                  img = FILLSTAR;
                }
                return <img alt="星级" src={img} style={{ width: 30, height: 30 }} key={item} />;
              })}
            </span>
            <div
              ref={e => {
                this.studentAssessment = e;
              }}
              style={{ width: '100%', height: '200%' }}
            />
          </div>
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

export default Student;
