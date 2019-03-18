import React, { Component } from 'react'
import { Button, Card, Tabs, Modal, Icon } from 'antd-mobile';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
import moment from 'moment';
import PublicNavBar from '@/publicAssembly/NavBar'
import EDITIMG from '@/publicAssembly/Icons/edit.svg';
import TESTOVER from '@/publicAssembly/Icons/testOver.svg';

const Alert = Modal.alert;
const tabs = [
  { title: '试卷列表' },
  { title: '考试记录' },
];

@connect(({ examRecord, examResult }) => ({ examRecord, examResult }))
class Test extends Component {
  constructor(porps) {
    super(porps)
    this.state = {
      examResultList: []
    }
  }

  componentDidMount() {
    const { dispatch, location: { state } } = this.props;
    dispatch({
      type: 'examRecord/fetch',
      payload: {
        TeachRecordId: state.teachRecordId,
      }
    });
  }

  tabClick = (index) => {
    const { dispatch, location: { state } } = this.props;
    // 获取考试详情
    const that = this;
    if (index === 1) {
      localStorage.setItem('InitialPage', 1)
      dispatch({
        type: 'examResult/fetch',
        payload: {
          TeachRecordId: state.teachRecordId,
        },
        callback: (value) => {
          that.setState({
            examResultList: value.Rows,

          })
        }
      });
    } else {
      localStorage.setItem('InitialPage', 0)
    }
  }

  // 提示框弹出方法
  showAlert = (item) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'examResult/fetch',
      payload: {
        ExamRecordId: item.Id
      },
      callback: (value) => {
        if (value.Rows.length === 0) {    // 查询是否考过
          Alert('考试即将开始，准备好了吗?', '', [{ text: '取消' }, { text: '确定', onPress: () => this.startAnwer(item) },]);
        } else {
          Alert('您已考试完毕，请勿重复点击！', '', [{ text: '确定' }]);
        }
      }
    });
  }

  // 查看考试详情提示方法
  endAnwer = (studentId, examRecordId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'examRecord/get',
      payload: {
        Id: examRecordId
      },
      callback: (value) => {
        if (value.Data.State === 1) {// 如果老师还没结束试题就不能查看答案
          Alert('考试还未结束，无法查看！', '', [{ text: '确定' },]);
        } else {
          this.goToStudentSelf(studentId, examRecordId);
        }
      }
    });
  }

  // 开始考试方法
  startAnwer = (items) => {
    const item = items;
    const { dispatch, location: { state } } = this.props;
    const lists = { examResult: {}, examResultDetails: [] }
    lists.examResult.ExamRecordId = item.Id;
    lists.examResult.StartTime = moment().format('YYYY-MM-DD hh:mm:ss');
    lists.examResult.TestPaperId = item.TestPaper.Id;
    const Minute = item.TestPaper.Span;
    let DateTime = '';
    if (Minute < 60) {// 如果时间小于60分钟
      DateTime = moment(Minute * 60000).format('mm:ss')
    } else {
      DateTime = `${(Minute - Minute % 60) / 60} : ${moment(Minute % 60 * 60000).format('mm:ss')}`;
    }
    dispatch({
      type: 'examResult/gettingRandomPapers',
      payload: { ExamRecordId: item.Id },
      callback: (value) => {
        const itemList = value.Data;
        const list = [];
        // 初始化交卷结果列表
        itemList.forEach((elements) => {
          const element = elements;
          list.push({ QuestionId: element.QuestionId, Type: element.Type, Answer: "", AnswerItems: element.QuestionItem })
          element.CricleType = false;
        })
        lists.examResultDetails = list;
        itemList.NotAnswerLen = value.Data.length;// 未答题数初始化
        itemList.AnswerLen = 0;// 已答题数初始化
        router.push(
          '/nolayout/student/test/startExamination',
          {
            Minute: (Minute) * 60000 - 1000,
            date: DateTime,
            ExamRecordId: item.Id,
            Name: item.Name,
            ItemList: itemList,
            list: lists,
            teachRecordId: state.teachRecordId,
          },
        )
       
      }
    })


  }

  // 考试结果详情页面
  goToStudentSelf = (studentId, examRecordId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'examResult/getSingleResult',
      payload: {
        ExamRecordId: examRecordId,
        StudentId: studentId
      },
      callback: (response) => {
        response.Rows.forEach(s => {
          const item = s;
          if (item.CourseQuestion.Type === 1 || item.CourseQuestion.Type === 2) {
            item.CourseQuestion.Answer = item.CourseQuestion.Answer.split(',')
            item.AnswerItemAnalysis.forEach(elements => {
              const element = elements;
              // 如果是正确答案就true
              if (item.CourseQuestion.Answer.indexOf(element.index.toString()) !== -1) {
                element.rightCheck = true;
              } else {
                element.rightCheck = false;
              }
            })
          }
        })
        router.push({
          pathname: '/nolayout/student/test/studentSelfDetail',
          query: {
            getSingleResult: response
          }
        })
      }
    })

  }

  render() {
    const { examRecord: { examRecorddata } } = this.props;
    const { examResultList } = this.state;
    const initialPage = parseInt(localStorage.getItem('InitialPage'), 0)
    return (
      <div>

        <PublicNavBar NavBarTitle='课堂练习' NavBarLeft={<Icon size="lg" type="left" onClick={() => router.push({ pathname: '/student/home' })} />} />
        <div className={styles.MYcontent}>
          <Tabs tabs={tabs} initialPage={initialPage} onChange={(tab, index) => this.tabClick(index)}>
            <div className={styles.Tabcontent}>
              {
                examRecorddata.examRecord.Rows && examRecorddata.examRecord.Rows.map(item =>
                  <Card style={{ display: item.State === 1 ? 'block' : 'none' }} className={styles.CardStyle} key={item.Id}>
                    <Card.Header
                      title={item.Name}
                      extra={
                        <span style={{ fontSize: 13, color: item.State === 1 ? '#2ae677' : '#d81e06' }}>
                          <img alt="图片" className={styles.nowTestImg} src={item.State === 1 ? EDITIMG : TESTOVER} />{item.State === 1 ? '开始考试' : '考试结束'}
                        </span>}
                    />
                    <Card.Body>
                      <div>发布时间: {item.CreateTime} </div>
                      <div>参考人员: 全体学员 </div>
                      <div>考试时长: {item.TestPaper.Span}分钟</div>
                      <div>试题总分: {item.TestPaper.Score}分</div>
                      <div>及格分数: {item.TestPaper.PassScore}分</div>
                      <div style={{ marginTop: "15px", textAlign: "center", display: item.State === 1 ? 'block' : 'none' }}>
                        <Button type="ghost" size="small" inline style={{ marginRight: '4px' }} onClick={() => this.showAlert(item)}>开始考试</Button>
                      </div>
                    </Card.Body>
                  </Card>
                )

              }
            </div>
            <div className={styles.Tabcontent}>
              {
                examResultList && examResultList.map((item) =>
                  <Card className={styles.CardStyle} key={item.Id}>
                    <Card.Header
                      title={item.TestPaper ? item.TestPaper.Name : '临时测试'}
                      extra={
                        <span style={{ fontSize: 13, color: item.State === 1 ? '#2ae677' : '#d81e06' }}>
                          <img alt="图片" className={styles.nowTestImg} src={item.State === 1 ? EDITIMG : TESTOVER} />{item.State === 1 ? '正在考试' : '考试结束'}
                        </span>}
                    />
                    <Card.Body>
                      <div>试题总分: {item.Score} </div>
                      <div>考试得分: {item.ScoreFinal} </div>
                      <div>结束时间: {item.OverTime} </div>
                      <div style={{ marginTop: "15px", textAlign: "center" }}>
                        <Button type="ghost" size="small" inline style={{ marginRight: '4px' }} onClick={() => this.endAnwer(item.StudentId, item.ExamRecordId)}>答题详情</Button>
                      </div>
                    </Card.Body>
                  </Card>
                )
              }
            </div>

          </Tabs>
        </div>
      </div>

    )
  }
}
export default Test;
