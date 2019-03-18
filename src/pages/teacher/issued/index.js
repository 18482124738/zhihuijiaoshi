import React, { Component } from 'react';
import { Button, Card, Tabs, Modal, Icon } from 'antd-mobile';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
import EDITIMG from '@/publicAssembly/Icons/edit.svg';
import TESTOVER from '@/publicAssembly/Icons/testOver.svg';
// import endTest from '../../../assets/endTest.png';
import PublicNavBar from '@/publicAssembly/NavBar';

const Alert = Modal.alert;
const tabs = [{ title: '试题列表' }, { title: '考试详情' }];
@connect(({ examRecord, testPaper, examResult }) => ({ testPaper, examRecord, examResult }))
class Issued extends Component {
  constructor(porps) {
    super(porps);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, location: { state }, } = this.props;
    dispatch({
      type: 'testPaper/fetch',
      payload: {
        TeachRecordId: state.teachRecordId,
      },
    });
  }



  tabClick = (index) => {
    const { dispatch, location: { state }, } = this.props;
    // 获取考试详情
    if (index === 1) {
      localStorage.setItem('InitialPage', 1)
      dispatch({
        type: 'examRecord/fetch',
        payload: {
          TeachRecordId: state.teachRecordId,
        },
      });
    } else {
      localStorage.setItem('InitialPage', 0)
    }
  }

  // 下发试题
  startAnwer = item => {
    const {
      dispatch,
      location: { state },
    } = this.props;
    dispatch({
      type: 'examRecord/add',
      payload: {
        CourseId: item.CourseInfoId,
        Name: item.Name,
        TeachRecordId: state.teachRecordId,
        TeacherId: item.TeacherId,
        TestPaperId: item.Id,
      },
    });
  };

  // 提示框弹出方法
  showAlert = item => {
    if (item.State === 0) {
      Alert('准备好下发该试题了吗?', '', [
        { text: '取消' },
        { text: '确定', onPress: () => this.startAnwer(item) },
      ]);
    } else {
      Alert('该试题正在考试！', '', [
        { text: '确定' },
      ]);
    }

  };

  // 结束考试提示
  endAnwer = (state, item) => {
    if (state !== 2) {
      Alert('是否结束该考试?', '', [
        { text: '取消' },
        { text: '确定', onPress: () => this.endTest(item) },
      ]);
    } else {
      Alert('考试已结束，请勿重复点击！', '', [{ text: '确定' }]);
    }
  };

  // 结束考试
  endTest = item => {
    const { dispatch } = this.props;
    const items = item;
    items.State = 2;
    dispatch({
      type: 'examRecord/update',
      payload: items,
    });
  };

  // 答题详情
  goTestAllDetail = examRecordId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'examResult/getPaperStatistics',
      payload: {
        ExamRecordId: examRecordId,
        PageNumber: 1,
        PageSize: 10,
      },
      callback: response => {
        response.TopicInformationStatistics.forEach(elements => {
          const element = elements;
          if (element.CourseQuestion.Type === 1 || element.CourseQuestion.Type === 2) {
            element.CourseQuestion.Answer = element.CourseQuestion.Answer.split(',');
            element.AnswerListAnalysis.forEach(item => {
              const s = item;
              // 如果是正确答案就true
              if (element.CourseQuestion.Answer.indexOf(s.index.toString()) !== -1) {
                s.rightCheck = true;
              } else {
                s.rightCheck = false;
              }
            });
          }
          element.IsShow = false;
          element.checkShowType = '答对';
          element.personList = [];
        });
        dispatch({
          type: 'examResult/getStatisticsList',
          payload: response,
        });
        router.push('/nolayout/teacher/issued/testAllDetail', {
          ExamRecordId: examRecordId,
        });
      },
    });
  };

  goStudentTestDetail = a => {
    const { dispatch } = this.props;
    dispatch({
      type: 'examResult/resultsOfStudentsAnswers',
      payload: {
        ExamRecordId: a,
        PageNumber: 1,
        PageSize: 9,
      },
      callback: () => {
        router.push('/nolayout/teacher/issued/studentTestDetail', {
          ExamRecordId: a,
        });
      },
    });
  };

  render() {
    const {
      testPaper: { testPaperdata },
      examRecord: { examRecorddata },
      location: { state },
    } = this.props;
    const initialPage = parseInt(localStorage.getItem('InitialPage'), 0)
    return (
      <div>
        <PublicNavBar
          NavBarTitle="课堂练习"
          NavBarLeft={
            <Icon
              size="lg"
              type="left"
              onClick={() =>
                state
                  ? router.push('/nolayout/teacher/teacherHistorical/singleDetail', {
                    query: state.teachRecordId,
                  })
                  : router.push('/teacher/home')
              }
            />
          }
          NavBarRight={<div>筛 选</div>}
        />
        <div className={styles.MYcontent}>
          <Tabs tabs={tabs} initialPage={initialPage} onChange={(tab, index) => this.tabClick(index)}>
            {/* onChange={(tab, index) => { console.log('onChange', index, tab); }} */}
            {/* onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }} */}
            <div className={styles.Tabcontent}>
              {state && state.nowState === 3
                ? ''
                : testPaperdata.testPaper.Rows &&
                testPaperdata.testPaper.Rows.map(item => (
                  <Card className={styles.CardStyle} key={item.Id}>
                    <Card.Header
                      title={item.Name}
                      extra={
                        <Button
                          type="ghost"
                          size="small"
                          inline
                          style={{ marginRight: '4px' }}
                          onClick={() => {
                            this.showAlert(item);
                          }}
                        >
                          发布试题
                        </Button>}
                    />
                    <Card.Body>
                      <div style={{ letterSpacing: 2, color: item.State === 1 ? '#f11313' : '#25a748' }}>状态: {item.State === 1 ? '正在考试' : '可下发'} </div>
                      <div style={{ letterSpacing: 2 }}>参考人员: 全体学员 </div>
                      <div style={{ letterSpacing: 2 }}>试题时长: {item.Span}分钟 </div>
                      <div style={{ letterSpacing: 2 }}>试题总分: {item.Score}分 </div>
                      <div style={{ letterSpacing: 2 }}>及格分数: {item.PassScore}分 </div>
                      {/* <div style={{ marginTop: '15px', textAlign: 'center' }}>
                        
                      </div> */}
                    </Card.Body>
                  </Card>
                ))}
            </div>
            <div className={styles.Tabcontent}>
              {examRecorddata.examRecord.Rows &&
                examRecorddata.examRecord.Rows.map(item => (
                  <Card className={styles.CardStyle} key={item.Id}>
                    <Card.Header
                      title={item.Name}
                      extra={
                        <span
                          style={{
                            fontSize: 13,
                            color: item.State === 1 ? '#2ae677' : '#d81e06',
                          }}
                        >
                          <img
                            alt="图片"
                            className={styles.nowTestImg}
                            src={item.State === 1 ? EDITIMG : TESTOVER}
                          />
                          {item.State === 1 ? '正在考试' : '考试结束'}
                        </span>
                      }
                    />
                    <Card.Body>
                      <div style={{ letterSpacing: 2 }}>参考人员: 全体学员 </div>
                      <div style={{ letterSpacing: 2 }}>考试时间: {item.CreateTime} </div>
                      <div style={{ letterSpacing: 2 }}>试题总分: {item.TestPaper.Score} </div>
                      <div style={{ letterSpacing: 2 }}>及格分数: {item.TestPaper.PassScore} </div>
                      <div style={{ marginTop: '15px' }}>
                        <Button
                          type="ghost"
                          size="small"
                          inline
                          style={{ marginRight: '4px' }}
                          onClick={() => this.endAnwer(item.State, item)}
                        >
                          结束考试
                        </Button>
                        <Button
                          type="ghost"
                          size="small"
                          inline
                          style={{ marginRight: '4px' }}
                          onClick={() => this.goStudentTestDetail(item.Id)}
                        >
                          {' '}
                          学生详情
                        </Button>
                        <Button
                          type="ghost"
                          size="small"
                          inline
                          style={{ marginRight: '4px' }}
                          onClick={() => this.goTestAllDetail(item.Id)}
                        >
                          答题详情
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Issued;
