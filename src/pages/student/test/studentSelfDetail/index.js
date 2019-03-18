import React, { Component } from 'react'
import { Icon } from 'antd-mobile';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
import personImg from '@/publicAssembly/Icons/pimg.jpg';
import PublicNavBar from '@/publicAssembly/NavBar'

@connect(({ examRecord, testPaper, examResult }) => ({ testPaper, examRecord, examResult }))
class studentSelf extends Component {
  constructor(porps) {
    super(porps)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    const { location: { state } } = this.props
    return (
      <div>
        <PublicNavBar NavBarTitle='课堂练习' NavBarLeft={<Icon size="lg" type="left" onClick={() => router.push({ pathname: '/nolayout/student/test' })} />} />

        {
          state.getSingleResult.Rows && state.getSingleResult.Rows.map((v, k) =>
            <div key={v.Id} className={styles.testAllDetailBox}>
              <div className={styles.testAllDetailBoxBody}>
                <div className={styles.testAllDetailBBContent}>
                  <span className={styles.testAllDetailBBSpan}>{k + 1}</span>
                  <div className={styles.testAllDetailBBContentTitle} dangerouslySetInnerHTML={{ __html: v.CourseQuestion.Name }} />
                  <div className={styles.testAllDetailBBContentHr} />
                </div>
                {/* 单选、多选才显示  */}
                <div style={{ display: v.CourseQuestion.Type === 1 || v.CourseQuestion.Type === 2 ? 'block' : 'none' }}>
                  <div className={styles.testAllDetailBBContent}>
                    {
                      v.AnswerItemAnalysis && v.AnswerItemAnalysis.map((s, i) =>
                        <div key={s.text} style={{ color: s.rightCheck ? 'rgb(68, 157, 68)' : 'none' }} dangerouslySetInnerHTML={{ __html: s.text }} className={styles.testAllDetailBBContentAnswer} />
                      )
                    }
                    <div className={styles.clearFix} />
                    <div className={styles.testAllDetailBBContentHr} style={{ marginTop: 15 }} />
                  </div>
                </div>
                {/* 判断才显示  */}
                <div style={{ display: v.CourseQuestion.Type === 3 ? 'block' : 'none' }}>
                  <div className={styles.testAllDetailBBContent}>
                    <div style={{ color: v.CourseQuestion.Answer === 1 ? 'rgb(68, 157, 68)' : 'none' }} className={styles.testAllDetailBBContentAnswer}>对</div>
                    <div style={{ color: v.CourseQuestion.Answer === 0 ? 'rgb(68, 157, 68)' : 'none' }} className={styles.testAllDetailBBContentAnswer}>错</div>
                    <div className={styles.clearFix} />
                    <div className={styles.testAllDetailBBContentHr} style={{ marginTop: 15 }} />
                  </div>
                </div>
                {/* 简答才显示  */}
                <div style={{ display: v.CourseQuestion.Type === 4 ? 'block' : 'none' }}>
                  <div className={styles.testAllDetailBBContent}>
                    <div className={styles.testAllDetailBBContentBody}>
                      <div className={styles.testAllDetailBBContentAnswer1}>
                        <div style={{ marginLeft: -5 }}>
                          答案: <div style={{ color: 'rgb(68, 157, 68)' }} className={styles.testAllDetailBBContentTitle} dangerouslySetInnerHTML={{ __html: v.CourseQuestion.Answer }} />
                        </div>
                      </div>
                    </div>
                    <div className={styles.clearFix} />
                    <div className={styles.testAllDetailBBContentHr} />
                  </div>
                </div>
                {/* 填空才显示  */}
                <div style={{ display: v.CourseQuestion.Type === 5 ? 'block' : 'none' }}>
                  <div className={styles.testAllDetailBBContent}>
                    <div className={styles.testAllDetailBBContentBody}>
                      <div className={styles.testAllDetailBBContentAnswer1}>
                        {
                          v.AnswerItemAnalysis && v.AnswerItemAnalysis.map((s, i) =>
                            <div key={s.text} style={{ color: 'rgb(68, 157, 68)' }}>{i + 1}、{s.text}</div>
                          )
                        }
                      </div>
                    </div>
                    <div className={styles.clearFix} />
                    <div className={styles.testAllDetailBBContentHr} />
                  </div>
                </div>
                <div className={styles.practiceStuBox}>
                  <img src={personImg} className={styles.practiceStuImg} alt="" />
                  <div className={styles.practiceStuSmallBox}>
                    <div className={styles.practiceStuName} />
                    <div className={styles.practiceStuNum}>
                      答案：
                      {v.AnswerListAnalysis && v.AnswerListAnalysis.length > 0 ? v.AnswerListAnalysis.map((z) =>
                        <span key={z.text} style={{ color: v.IsRight === 0 ? 'rgb(232, 49, 28)' : 'rgb(68,157,68)', display: v.CourseQuestion.Type === 1 || v.CourseQuestion.Type === 2 ? 'inline-block' : 'none' }} dangerouslySetInnerHTML={{ __html: `${z.text}、` }} />
                      ) : <span style={{ color: 'rgb(232, 49, 28)' }}>未答</span>
                      }
                      <span style={{ color: v.IsRight === 0 || v.IsRight === 2 ? 'rgb(232, 49, 28)' : 'rgb(68,157,68)', display: v.CourseQuestion.Type === 4 || v.CourseQuestion.Type === 5 ? 'inline-block' : 'none' }}>
                        {
                          v.Answers ? v.Answers : '未答'
                        }
                      </span>
                      <span style={{ color: v.IsRight === 0 || v.IsRight === 2 ? 'rgb(232, 49, 28)' : 'rgb(68,157,68)', display: v.CourseQuestion.Type === 3 ? 'inline-block' : 'none' }}>
                        {
                          v.Answers ? v.Answers === 1 ? '对' : '错' : '未答'
                        }
                      </span>
                    </div>
                  </div>
                  <div className={styles.clearFix} />
                </div>
              </div>
            </div>
          )
        }

      </div>
    )
  }
}
export default studentSelf;
