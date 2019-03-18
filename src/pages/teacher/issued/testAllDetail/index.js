import React, { Component } from 'react'
import { Icon, NavBar } from 'antd-mobile';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
import personImg from '@/publicAssembly/Icons/pimg.jpg';


@connect(({ examRecord, testPaper, examResult }) => ({ testPaper, examRecord, examResult }))
class testAllDetail extends Component {
  constructor(porps) {
    super(porps)
    this.state = {
      showDetail: false,
      statisticsList: [],
    }
  }

  componentDidMount() {
    const { examResult: { statisticsList } } = this.props
    const statisticsLists = statisticsList;
    this.setState({
      statisticsList: statisticsLists
    })
  }

  // 查看详情以及对错
  showDetailFun = (IsShow, k, type, isRight, IsRightType) => {
    const { dispatch, location: { state } } = this.props
    const { statisticsList } = this.state
    const statisticsLists = statisticsList;
    statisticsLists.TopicInformationStatistics.forEach((elements, index) => {
      const element = elements;
      if (index === k) {
        element.IsShow = IsShow;
        element.checkShowType = IsRightType;
        dispatch({
          type: 'examResult/getWronAnswer',
          payload: { ExamRecordId: state.ExamRecordId, IsRight: isRight, QuestionId: element.CourseQuestion.Id },
          callback: (value) => {
            element.personList = value.Rows;
            this.setState({
              statisticsList: statisticsLists
            })
          }
        })

      }
    });

  }

  render() {
    const { showDetail, statisticsList } = this.state
    const { location: { state } } = this.props
    return (
      <div>
        <NavBar
          style={{ position: 'fixed', top: 0, zIndex: 1000, width: '100%' }}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => router.push('/teacher/issued', { teachRecordId: state.ExamRecordId })}
        >试题题目总详情
        </NavBar>
        <div style={{ height: 50 }} />
        {
          statisticsList.TopicInformationStatistics ? statisticsList.TopicInformationStatistics.map((v, k) => {
            return (
              <div key={k} className={styles.testAllDetailBox} style={{ display: showDetail ? 'none' : 'block' }}>
                <div className={styles.testAllDetailBoxBody}>
                  <div className={styles.testAllDetailBBContent}>
                    <span className={styles.testAllDetailBBSpan}>{k + 1}</span>
                    <div className={styles.testAllDetailBBContentTitle} dangerouslySetInnerHTML={{ __html: v.CourseQuestion.Name }} />
                    <div className={styles.testAllDetailBBContentHr} />
                  </div>
                  {/* 单选、多选才显示  */}
                  <div style={{ display: v.CourseQuestion.Type === 1 || v.CourseQuestion.Type === 2 ? 'block' : 'none' }}>
                    <div style={{ display: v.IsShow ? 'block' : 'none' }} className={styles.testAllDetailBBContent}>
                      {
                        v.AnswerListAnalysis && v.AnswerListAnalysis.map((s, i) => {
                          return (
                            <div
                              key={i}
                              style={{ color: s.rightCheck ? 'rgb(68, 157, 68)' : 'none' }}
                              dangerouslySetInnerHTML={{ __html: s.text }}
                              className={styles.testAllDetailBBContentAnswer}
                            />
                          )
                        })
                      }
                      <div className={styles.clearFix} />
                      <div className={styles.testAllDetailBBContentHr} style={{ marginTop: 15 }} />
                    </div>
                  </div>
                  {/* 判断才显示  */}
                  <div style={{ display: v.CourseQuestion.Type === 3 ? 'block' : 'none' }}>
                    <div style={{ display: v.IsShow ? 'block' : 'none' }} className={styles.testAllDetailBBContent}>
                      <div style={{ color: v.CourseQuestion.Answer === 1 ? 'rgb(68, 157, 68)' : 'none' }} className={styles.testAllDetailBBContentAnswer}>对</div>
                      <div style={{ color: v.CourseQuestion.Answer === 0 ? 'rgb(68, 157, 68)' : 'none' }} className={styles.testAllDetailBBContentAnswer}>错</div>
                      <div className={styles.clearFix} />
                      <div className={styles.testAllDetailBBContentHr} style={{ marginTop: 15 }} />
                    </div>
                  </div>
                  {/* 简答才显示  */}
                  <div style={{ display: v.CourseQuestion.Type === 4 ? 'block' : 'none' }}>
                    <div style={{ display: v.IsShow ? 'block' : 'none' }} className={styles.testAllDetailBBContent}>
                      <div className={styles.testAllDetailBBContentBody}>
                        <div className={styles.testAllDetailBBContentAnswer1}>
                          <div style={{ marginLeft: -5 }}>答案:
                            <div
                              style={{ color: 'rgb(68, 157, 68)' }}
                              className={styles.testAllDetailBBContentTitle}
                              dangerouslySetInnerHTML={{ __html: v.CourseQuestion.Answer }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.clearFix} />
                      <div className={styles.testAllDetailBBContentHr} />
                    </div>
                  </div>
                  {/* 填空才显示  */}
                  <div style={{ display: v.CourseQuestion.Type === 5 ? 'block' : 'none' }}>
                    <div style={{ display: v.IsShow ? 'block' : 'none' }} className={styles.testAllDetailBBContent}>
                      <div className={styles.testAllDetailBBContentBody}>
                        <div className={styles.testAllDetailBBContentAnswer1}>
                          {
                            v.CourseQuestion.AnswerList && v.CourseQuestion.AnswerList.map((s, i) =>
                              <div key={s.text} style={{ color: 'rgb(68, 157, 68)' }}>{i + 1}、{s.text}</div>
                            )
                          }
                          {/* <span style={{ marginLeft: -5 }}>答案:</span> */}
                        </div>
                      </div>
                      <div className={styles.clearFix} />
                      <div className={styles.testAllDetailBBContentHr} />
                    </div>
                  </div>
                  <span style={{ marginLeft: 10 }} onClick={() => this.showDetailFun(true, k, v.CourseQuestion.Type, 1, '答对')}>
                    答对：<span style={{ color: 'rgb(68,157,68)' }}>{v.AnswerNumber}</span> 人
                  </span>
                  <span style={{ marginLeft: 10 }} onClick={() => this.showDetailFun(true, k, v.CourseQuestion.Type, 0, '答错')}>
                    答错：<span style={{ color: 'rgb(217,83,79)' }}>{v.WrongAnswerNumber}</span> 人
                  </span>
                  <span style={{ marginLeft: '8%', display: v.IsShow ? 'none' : 'inline-block' }} onClick={() => this.showDetailFun(true, k, v.CourseQuestion.Type, 1, '答对')}> 查看详情</span>
                  <span style={{ marginLeft: '8%', display: v.IsShow ? 'inline-block' : 'none' }} onClick={() => this.showDetailFun(false, k)}> 收起详情</span>
                  <div style={{ display: v.IsShow ? 'block' : 'none' }} className={styles.practiceStuBoxText}>{v.checkShowType}学生列表</div>
                  {
                    v.personList && v.personList.map((s, i) => {
                      return (
                        <div key={i} style={{ display: v.IsShow ? 'block' : 'none' }} className={styles.practiceStuBox}>
                          <img src={personImg} className={styles.practiceStuImg} alt="" />
                          <div className={styles.practiceStuSmallBox}>
                            <div className={styles.practiceStuName}>{s.UserInfo.RealName}</div>
                            <div className={styles.practiceStuNum}>
                              答案：
                              {
                                s.AnswerListAnalysis && s.AnswerListAnalysis.map((z) =>
                                  <span key={z.text} style={{ color: 'rgb(68,157,68)' }} dangerouslySetInnerHTML={{ __html: z.text }} />
                                )
                              }
                              <span style={{ color: 'rgb(68,157,68)' }}>{s.Answers} </span>
                              <span style={{ color: 'rgb(68,157,68)', display: v.CourseQuestion.Type === 3 ? 'inline-block' : 'none' }}>
                                {s.Answers ? s.Answers === 1 ? '对' : '错' : '未答'}
                              </span>
                            </div>
                          </div>
                          <div className={styles.clearFix} />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          }) : ''
        }

      </div>
    )
  }
}
export default testAllDetail;
