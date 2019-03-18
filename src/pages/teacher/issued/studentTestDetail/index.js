import React, { Component } from 'react'
import { Icon } from 'antd-mobile';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
import personImg from '@/publicAssembly/Icons/pimg.jpg';
import getChart1 from './model/echartModel'
import PublicNavBar from '@/publicAssembly/NavBar';

@connect(({ examRecord, testPaper, examResult }) => ({ testPaper, examRecord, examResult }))
class studentTestDetail extends Component {
  constructor(porps) {
    super(porps)
    this.state = {
      PageNumbers: 1,
      // refreshing: false,
      // height: document.documentElement.clientHeight - 140,
      IsOK: true,
    }
  }

  componentDidMount() {
    // getChart2();
    const that = this;
    const { examResult: { getStudentList } } = that.props;
    getChart1(getStudentList.Rows);
    window.onscroll = () => {
      if (that.getScrollTop() + that.getWindowHeight() === (that.getScrollHeight())) {
        if (that.state.IsOK) {
          that.setState({
            PageNumbers: that.state.PageNumbers + 1
          }, () => {
            that.getStudentTestDetail()
          })
        }
      }

    };
  }

  getScrollTop = () => {
    let [scrollTop, bodyScrollTop, documentScrollTop] = [0];
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }

  // 文档的总高度
  getScrollHeight = () => {
    let [scrollHeight, bodyScrollHeight, documentScrollHeight] = [0];
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
  }

  // 浏览器视口的高度
  getWindowHeight = () => {
    let windowHeight = 0;
    if (document.compatMode === "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }

  // 跳转单个学生详情页面
  goToStudentSelf = (studentNames, studentId) => {
    const { dispatch, location: { state } } = this.props;
    dispatch({
      type: 'examResult/getSingleResult',
      payload: {
        ExamRecordId: state.ExamRecordId,
        StudentId: studentId
      },
      callback: (response) => {
        response.Rows.forEach(item => {
          const s = item;
          if (s.CourseQuestion.Type === 1 || s.CourseQuestion.Type === 2) {
            s.CourseQuestion.Answer = s.CourseQuestion.Answer.split(',')
            s.AnswerItemAnalysis.forEach(elements => {
              const element = elements;
              // 如果是正确答案就true
              if (s.CourseQuestion.Answer.indexOf(element.index.toString()) !== -1) {
                element.rightCheck = true;
              } else {
                element.rightCheck = false;
              }
            })
          }
        })
        router.push('/nolayout/teacher/issued/studentTestDetail/studentSelfDetail', {
          studentName: studentNames,
          ExamRecordId: state.ExamRecordId,
          getSingleResult: response,
          InitialPage: state.InitialPage
        }
        )
      }
    })

  }

  getStudentTestDetail = () => {
    const { dispatch, location: { state }, examResult: { getStudentList } } = this.props;
    const { PageNumbers } = this.state;
    const that = this;
    dispatch({
      type: 'examResult/resultsOfStudentsAnswers',
      payload: {
        ExamRecordId: state.ExamRecordId,
        PageNumber: PageNumbers,
        PageSize: 9,
      },
      callback: (response) => {
        if (response.Rows.length === 0) {
          that.setState({
            IsOK: false,
          })
        }
        getStudentList.Rows.push(...response.Rows);
        dispatch({
          type: 'examResult/getStudentList',
          payload: getStudentList,
        });
      },
    });
  };

  render() {
    const { examResult: { getStudentList }, location: { state } } = this.props;
    // const { refreshing, height } = this.state;
    return (
      <div>
        <PublicNavBar
          NavBarTitle="学生答题详情"
          NavBarLeft={<Icon size="lg" type="left" onClick={() => router.push('/teacher/issued', { teachRecordId: state.ExamRecordId })} />}
        />
        <div className={styles.testAllDetailBox1}>
          <div id="echarId" className={styles.echartCSS} />
        </div>
        {
          getStudentList && getStudentList.Rows && getStudentList.Rows.map((v) =>
            <div key={v.Id} className={styles.testAllDetailBox} onClick={() => this.goToStudentSelf(v.RealName, v.StudentId)}>
              <div className={styles.testAllDetailBoxBody}>
                <img src={personImg} alt="图片" className={styles.testAllDetailBBImg} />
                <span className={styles.testAllDetailBBSpan}>
                  {v.RealName || '无名氏'}：<span style={{ color: 'rgb(68,157,68)', fontSize: 15 }}>{v.ScoreFinal}</span> 分
                </span>
                <span style={{ marginLeft: 5, position: 'relative', top: 1, fontSize: 12 }}>
                  答对：<span style={{ color: 'rgb(68,157,68)', fontSize: 15 }}>{v.AnswerNumber}</span> 道
                </span>
                <span style={{ marginLeft: 5, position: 'relative', top: 1, fontSize: 12 }}>
                  答错：<span style={{ color: 'rgb(217,83,79)', fontSize: 15 }}>{v.WrongAnswerNumber}</span> 道
                </span>
              </div>
            </div>
          )
        }
        {/* <PullToRefresh
          damping={60}
          style={{
            height,
            overflow: 'auto',
            backgroundColor: 'white',
          }}
          direction='up'
          refreshing={refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            this.getMoreRecord();
            this.setState({ refreshing: false });
          }}
        >
         
        </PullToRefresh> */}


      </div>
    )
  }
}
export default studentTestDetail;
