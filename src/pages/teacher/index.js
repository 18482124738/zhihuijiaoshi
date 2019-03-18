import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { WingBlank, List, Grid, Toast, Switch, Modal, Steps } from 'antd-mobile';
import router from 'umi/router';
import styles from './index.less';
import teacherAssessment from '@/utils/teacherEchart';
import EMPTYSTAR from '@/publicAssembly/Icons/emptyStar.png';
import FILLSTAR from '@/publicAssembly/Icons/fillStar.png';
import PublicNavBar from '@/publicAssembly/NavBar';

import ZILIAO from '@/publicAssembly/Icons/ziliao.svg';
import TAOLUN from '@/publicAssembly/Icons/taolun.svg';
import LIANXI from '@/publicAssembly/Icons/lianxi.svg';
import KAOQIN24 from '@/publicAssembly/Icons/kaoqin24.svg';
import SUITANG from '@/publicAssembly/Icons/suitang.svg';
import HUAXIANG from '@/publicAssembly/Icons/huaxiang.svg';
import LISHI from '@/publicAssembly/Icons/lishi.svg';
import TIANJIA from '@/publicAssembly/Icons/tianjia2.svg';

import KECHENGSVG from '@/publicAssembly/Icons/kecheng.svg';
import BANJISVG from '@/publicAssembly/Icons/banji.svg';
import KESHISVG from '@/publicAssembly/Icons/keshi.svg';
import JIAOSHISVG from '@/publicAssembly/Icons/jiaoshi.svg';
import ZHUANGTAISVG from '@/publicAssembly/Icons/zhuangtai.svg';

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
  teachRecordLoading: loading.effects['teachRecord/fetchLately'],
}))
class Teacher extends PureComponent {
  state = {};

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'teachRecord/fetchLately',
    });
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
    teacherAssessment(scores, this.teacherAssessment);
  }

  handleGirdClick = (el, index) => {
    const {
      teachRecord: { current },
    } = this.props;
    switch (el.text.props.children) {
      case '开始结束':
      case '创建课程':
        this.CreateCourse();
        break;
      case '资料下发':
        router.push( '/nolayout/teacher/infoIssuance', { teachRecordId: current.Id } );
        break;
      case '分组讨论':
        router.push('/nolayout/teacher/teacherDiscussion',{ teachRecordId: current.Id });
        break;
      case '课堂练习':
        localStorage.setItem('InitialPage', 0);
        router.push( '/nolayout/teacher/issued', { teachRecordId: current.Id } );
        break;
      case '课堂考勤':
        router.push('/nolayout/teacher/attendance', { TeachRecordId: current.Id }); // 为了和历史记录区分，使用大写开头TeachRecordId
        break;
      case '随堂记录':
        router.push('/nolayout/teacher/inClassRecord', { query: current });
        break;
      case '班级画像':
        router.push('/nolayout/teacher/classPortrait', { teachRecordId: current.Id });
        break;
      case '历史记录':
        router.push('/nolayout/teacher/teacherHistorical');
        break;
      default:
        break;
    }
  };

  /* 开始结束 */
  handleStartEnd = nowState => {
    const {
      dispatch,
      teachRecord: { current },
    } = this.props;
    switch (nowState) {
      case 1:
        dispatch({ type: 'teachRecord/updateState', payload: { Id: current.Id, Nowstate: 2 } });
        Toast.info('课程已开始', 1);
        break;
      default:
        Modal.alert('结束', '确定要结束课程？', [
          {
            text: <span style={{ color: '#108ee9' }}>取消</span>,
          },
          {
            text: <span style={{ color: 'black' }}>确定</span>,
            onPress: () => {
              dispatch({
                type: 'teachRecord/updateState',
                payload: { Id: current.Id, Nowstate: 3 },
              });
              Toast.info('课程已结束！', 1);
            },
          },
        ]);
        break;
    }
  };

  /* 创建课程 */
  CreateCourse = () => {
    const {
      teachRecord: { current },
    } = this.props;
    switch (current.Nowstate) {
      case 1:
      case 2:
        // this.handleStartEnd(current.Nowstate);
        break;
      case 3:
      default:
        router.push('/nolayout/teacher/createCourse');
        break;
    }
  };

  render() {
    const { teachRecord } = this.props;
    const currentInfo = teachRecord.current;
    const timeLine = teachRecord.timeLine.Rows ? teachRecord.timeLine.Rows : [];
    let createTime = '暂无时间'; // 课程创建时间
    if (currentInfo.CreateTime) {
      createTime = currentInfo.CreateTime.slice(0, 10);
    }
    let nowState = '未开始';
    let nowBool = false;
    if (currentInfo.Nowstate) {
      switch (currentInfo.Nowstate) {
        case 1:
          break;
        case 2:
          nowState = '已开始';
          nowBool = true;
          break;
        case 3:
          nowState = '已结束';
          break;
        default:
          break;
      }
    }
    const data = [
      {
        icon:
          currentInfo.Nowstate !== 1 && currentInfo.Nowstate !== 2 ? (
            <img src={TIANJIA} alt="创建课程" />
          ) : (
            <Switch
              style={{ paddingRight: '5%' }}
              checked={nowBool}
              onChange={() => this.handleStartEnd(currentInfo.Nowstate)}
            />
          ),
        text:
          currentInfo.Nowstate !== 1 && currentInfo.Nowstate !== 2 ? (
            <span style={{ color: '#108ee9', fontSize: 14, position: 'relative', top: 7 }}>
              创建课程
            </span>
          ) : (
            <span style={{ color: '#108ee9', fontSize: 14 }}>开始结束</span>
          ),
      },
      {
        icon: <img src={ZILIAO} alt="资料下发" />,
        text: (
          <span style={{ color: '#108ee9', fontSize: 14, position: 'relative', top: 7 }}>
            资料下发
          </span>
        ),
      },
      {
        icon: <img src={TAOLUN} alt="分组讨论" />,
        text: (
          <span style={{ color: '#108ee9', fontSize: 14, position: 'relative', top: 7 }}>
            分组讨论
          </span>
        ),
      },
      {
        icon: <img src={LIANXI} alt="课堂练习" />,
        text: (
          <span style={{ color: '#108ee9', fontSize: 14, position: 'relative', top: 7 }}>
            课堂练习
          </span>
        ),
      },
      {
        icon: <img src={KAOQIN24} alt="课堂考勤" />,
        text: <span style={{ color: '#108ee9', fontSize: 14 }}>课堂考勤</span>,
      },
      {
        icon: <img src={SUITANG} alt="随堂记录" />,
        text: <span style={{ color: '#108ee9', fontSize: 14 }}>随堂记录</span>,
      },
      {
        icon: <img src={HUAXIANG} alt="班级画像" />,
        text: <span style={{ color: '#108ee9', fontSize: 14 }}>班级画像</span>,
      },
      {
        icon: <img src={LISHI} alt="历史记录" />,
        text: <span style={{ color: '#108ee9', fontSize: 14 }}>历史记录</span>,
      },
    ];

    return (
      <div>
        <PublicNavBar
          NavBarTitle="教师首页"
          NavBarLeft={`${currentInfo.ClassRoomName || '--'}`}
          NavBarRight={`${currentInfo.Id || '暂无课程号'}`}
        />

        <WingBlank size="md">
          <List>
            <List.Item
              extra={`${currentInfo.CourseName || '暂无课程'}`}
              onClick={() =>
                router.push('/nolayout/teacher/changeCourse', {
                  oldId: currentInfo.Id,
                })
              }
              arrow="horizontal"
            >
              <img src={KECHENGSVG} alt="课程" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>课程</span>
            </List.Item>
            <List.Item extra={`${currentInfo.ClassName || '暂无班级'}`}>
              <img src={BANJISVG} alt="班级" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>班级</span>
            </List.Item>
            <List.Item extra={createTime}>
              <img src={KESHISVG} alt="创建时间" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>创建时间</span>
            </List.Item>
            <List.Item extra={`${currentInfo.UserName || '暂无教师'}`}>
              <img src={JIAOSHISVG} alt="教师" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>教师</span>
            </List.Item>
            <List.Item extra={nowState}>
              <img src={ZHUANGTAISVG} alt="状态" className={styles.RightMargin} />
              <span style={{ color: '#9e9c9c' }}>状态</span>
            </List.Item>
          </List>
          <div style={{ margin: '5% 0' }}>
            <Grid
              data={data}
              hasLine={false}
              square={false}
              itemStyle={{ borderRadius: '15%', margin: '6px', boxShadow: '0px 0px 3px #ABABAB' }}
              onClick={
                (el, index) => this.handleGirdClick(el, index) // hasLine={false}
              }
              key={data.text}
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
                this.teacherAssessment = e;
              }}
              style={{ width: '100%', height: '200%' }}
            />
          </div>
          <Steps size="small" current={timeLine.length}>
            {timeLine.map((item, key) => {
              let downBool = false;
              let downText = '';
              if (item.Name === '资料下发') {
                downBool = true;
                downText = `下载人数：${item.DownloadNum}`;
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
                  key={item.text}
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

export default Teacher;
