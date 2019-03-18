import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Icon, List, Grid, Steps } from 'antd-mobile';
import router from 'umi/router';
import styles from './index.less';
import teacherAssessment from '@/utils/teacherEchart';
// import ServerHost from '../../../../../config/server.config.js';
import ZILIAO from '@/publicAssembly/Icons/ziliao.svg';
import KAOQING from '@/publicAssembly/Icons/kaoqin24.svg';
import TAOLUN from '@/publicAssembly/Icons/taolun.svg';
import SUITANG from '@/publicAssembly/Icons/suitang.svg';
import BANJI from '@/publicAssembly/Icons/banji.svg';
import KESHI from '@/publicAssembly/Icons/keshi.svg';
import KECHENG from '@/publicAssembly/Icons/kecheng.svg';
import EMPTYSTAR from '@/publicAssembly/Icons/emptyStar.png';
import FILLSTAR from '@/publicAssembly/Icons/fillStar.png';
import PublicNavBar from '@/publicAssembly/NavBar';

const inlineStyle = {
  timeLine: {
    color: '#108ee9',
    float: 'right',
    marginRight: '15%',
    fontSize: 12,
  },
  titleItem: {
    color: '#9e9c9c',
  },
  timeImg: {
    width: 200,
    display: 'block',
    marginBottom: 10,
  },
};

@connect(({ teachRecord, loading }) => ({
  teachRecord,
  teachRecordLoading: loading.effects['teachRecord/fetchModel'],
}))
class SingleDetail extends PureComponent {
  state = {};

  componentWillMount() {
    const {
      dispatch,
      location: {
        state: { query },
      },
    } = this.props;
    dispatch({ type: 'teachRecord/fetchModel', payload: { Id: query } });
    dispatch({ type: 'teachRecord/fetchStatistics', payload: { TeachRecordId: query } });
  }

  componentWillUpdate() {
    const {
      teachRecord: { current },
    } = this.props;
    const scores = [];
    scores.push(
      current.AttendanceScore || 0,
      current.Active || 0,
      current.PracticeScore || 0,
      current.DiscussScore || 0,
      current.FilesScore || 0
    ); // 出勤，专注，练习，讨论，资料
    teacherAssessment(scores, this.teacherSingleDetail);
  }

  handleGirdClick = (el, index) => {
    const {
      teachRecord: { current },
    } = this.props;
    console.log(el, index);
    switch (el.text.slice(0, 2)) {
      case '资料':
        router.push('/nolayout/teacher/infoIssuance', {
          teachRecordId: current.Id,
          nowState: current.Nowstate,
        });
        break;
      case '考勤':
        router.push('/nolayout/teacher/attendance', {
          teachRecordId: current.Id,
          nowState: current.Nowstate,
        });
        break;
      case '讨论':
        router.push({
          pathname: '/nolayout/teacher/teacherDiscussion',
          query: {
            teachRecordId: current.Id,
            nowState: current.Nowstate,
          },
        });
        break;
      case '测验':
        router.push('/nolayout/teacher/issued', {
          teachRecordId: current.Id,
          nowState: current.Nowstate,
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { teachRecord } = this.props;
    const currentInfo = teachRecord.current;
    const currentStatistics = teachRecord.statistics;
    const timeLine = teachRecord.timeLine.Rows ? teachRecord.timeLine.Rows : [];
    let createTime = '--';
    if (currentInfo.CreateTime) {
      createTime = currentInfo.CreateTime.slice(0, 10);
    }
    const data = [
      {
        icon: <img src={ZILIAO} alt="资料" />,
        text: `资料 ${currentStatistics.DownRecordsNum ||
          0}/${currentStatistics.CoursewareSendNum || 0}`,
      },
      {
        icon: <img src={KAOQING} alt="考勤" />,
        text: `考勤 ${currentStatistics.AttendanceNum || 0}/${currentStatistics.StudentNum || 0}`,
        data: '2020',
      },
      {
        icon: <img src={TAOLUN} alt="讨论" />,
        text: `讨论 ${currentStatistics.DiscussDetailNum ||
          0}/${currentStatistics.DiscussTitleNum || 0}`,
        data: '2020',
      },
      {
        icon: <img src={SUITANG} alt="测验" />,
        text: `测验 ${currentStatistics.ExamResultNum || 0}/${currentStatistics.ExamRecordNum ||
          0}`,
        data: '2020',
      },
    ];
    return (
      <div>
        <PublicNavBar
          NavBarTitle={currentInfo.ClassRoomName || '--'}
          NavBarLeft={[
            <Icon
              type="left"
              size="lg"
              onClick={() => router.push('/nolayout/teacher/teacherHistorical')}
            />,
          ]}
          NavBarRight={[<Icon key="0" type="ellipsis" />]}
        />
        <WingBlank size="md">
          <List>
            <List.Item extra={currentInfo.CourseName || '--'}>
              <img src={KECHENG} alt="科目" className={styles.RightMargin} />
              <span style={inlineStyle.titleItem}>科目</span>
            </List.Item>
            <List.Item extra={currentInfo.ClassName || '--'}>
              <img src={BANJI} alt="班级" className={styles.RightMargin} />
              <span style={inlineStyle.titleItem}>班级</span>
            </List.Item>
            <List.Item extra={createTime}>
              <img src={KESHI} alt="创建时间" className={styles.RightMargin} />
              <span style={inlineStyle.titleItem}>创建时间</span>
            </List.Item>
          </List>
          <div style={{ margin: '5% 0' }}>
            <Grid
              data={data}
              onClick={
                (el, index) => this.handleGirdClick(el, index) // hasLine={false}
              }
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
                return <img alt="星级" src={img} style={{ width: 20, height: 20 }} key={item} />;
              })}
            </span>
            <div
              ref={e => {
                this.teacherSingleDetail = e;
              }}
              style={{ width: '100%', height: '185%' }}
            />
          </div>
          <WhiteSpace />
          <Steps size="small" current={timeLine.length}>
            {timeLine.map(item => {
              let downBool = false;
              let downText = '';
              if (item.Name === '资料下发') {
                downBool = true;
                downText = `下载人数：${item.DownloadNum}`;
              }
              let isDiscuss = false;
              let discussText = '';
              if (item.Name === '发起讨论') {
                isDiscuss = true;
                discussText = `发言次数：${item.DownloadNum}`;
              }
              let imgURL = false;
              if (item.ImagePath) {
                imgURL = `http://210.41.215.35:8022/${item.ImagePath}`;
              }
              let ExamState = false;
              if (item.State) {
                ExamState = item.State === 1 ? '正在考试' : '考试结束';
              }
              let isExam = false;
              if (item.Name === '考试记录') {
                isExam = true;
              }
              return (
                <Steps.Step
                  title={[
                    <span style={{ fontWeight: 'normal' }}>
                      {item.CreateTime} [{item.Name}]
                    </span>,
                  ]}
                  description={[
                    <span>
                      {imgURL === false ? (
                        ''
                      ) : (
                        <img src={imgURL} alt="随堂记录" style={inlineStyle.timeImg} />
                      )}
                      <span style={{ fontSize: 14 }}>{item.Text}</span>
                      <span style={inlineStyle.timeLine}>{downBool ? `[ ${downText} ]` : ''}</span>
                      <span style={inlineStyle.timeLine}>
                        {ExamState ? `[ 考试状态：${ExamState} ]` : ''}
                      </span>
                      {isDiscuss ? <span style={inlineStyle.timeLine}>{discussText}</span> : ''}
                      {isExam ? (
                        <span style={inlineStyle.timeLine}>
                          [ 考试中：{item.AnsweringNum}人，已交卷：{item.AnsweredNum}人 ]
                        </span>
                      ) : (
                        <span />
                      )}
                    </span>,
                  ]}
                />
              );
            })}
          </Steps>
        </WingBlank>
      </div>
    );
  }
}

export default SingleDetail;
