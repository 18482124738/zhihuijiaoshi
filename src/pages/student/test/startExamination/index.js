import React, { Component } from 'react'
import { Pagination, Modal } from 'antd-mobile';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
import PracticeNavBar from './practiceNavBar'
import PracticeType from './practiceType'
import PracticeFooter from './practiceFooter'

const Alert = Modal.alert;


@connect(({ testPaperQuestion, examResult }) => ({ testPaperQuestion, examResult }))
class StartExamination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      AnswerList: [],
    }
  }

  componentDidMount() {
    const {  location:{state} } = this.props;
    const that = this;
    const item = state;
    that.setState({
      AnswerList: item.ItemList,
      total: item.ItemList.length,
      resultList: item.list
    })
  }

  // 提示框弹出方法
  showAlert = (promtText) => {
    Alert(promtText, '', [
      // { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => this.goBack() },
    ]);
  }

  // 保存每道题答案方法
  PreserveFun = (MyAnswer, currentValue, type, checkBoxKey, QuestionId) => {
    const { AnswerList, resultList, current } = this.state;
    const list = AnswerList;
    const resultLists = resultList;
    list.NotAnswerLen = 0;// 未答题数
    list.AnswerLen = 0;// 已答题数
    list[current].CricleType = true;
    if (type === 1 || type === 2 || type === 3) {
      if (type === 1) {
        // 单选//点击下一道题再返回此题保存答案
        list[current].currentValue = currentValue;
      } else if (type === 2) {
        // 多选//点击下一道题再返回此题保存答案
        list[current].QuestionItem[checkBoxKey].currentValue = currentValue;
      }
      list[current].MyAnswer = MyAnswer;
    } else if (type === 4 || type === 5) {
      if (type === 5) {
        // 填空//点击下一道题再返回此题保存答案
        list[current].QuestionItem = MyAnswer;
      } else {
        // 简答//点击下一道题再返回此题保存答案
        list[current].MyAnswer = MyAnswer;
      }
    }
    // 保存每道题的答案
    resultList.examResultDetails.forEach(elements => {
      const element = elements;
      if (element.QuestionId === QuestionId) {
        element.Answer = MyAnswer;
      }
    })

    // 如果是已回答就++
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].CricleType) {
        list.AnswerLen += 1;
      }
    }
    list.NotAnswerLen = list.length - list.AnswerLen;
    this.setState({
      AnswerList: list,
      resultList: resultLists,
    })
  }

  // 提交试题
  SubmitFun = () => {
    const { dispatch } = this.props;
    const { resultList } = this.state;
    const Result = resultList;
    Result.examResultDetails.forEach(elements => {
      const element = elements;
      if (element.Type === 5) { // 如果是填空题就转化
        if (element.Answer !== '') {
          element.Answer = JSON.stringify(element.Answer);
        }
      }
    });
    dispatch({
      type: 'examResult/resultPreservation',
      payload: Result,
      callback: (value) => {
        if (value.Success) {
          this.showAlert('交卷成功');
        } else {
          // JSON.parse(Result);//失败重新转为对象，不然报错
          this.showAlert(value.Message);
        }
      }
    });

  }

  // 回到首页
  goBack = () => {
    const { location: { state } } = this.props;
    router.push( '/student/test', {
        teachRecordId: state.teachRecordId,
      }
    )
  }

  // 题目分页
  changeCurrent = (value) => {
    const that = this;
    const { AnswerList } = this.state;
    const list = AnswerList;
    let urrentValues;
    if (list[value - 1].currentValue || list[value - 1].currentValue === 0) {
      // 如果该题的答案是空或者0
      urrentValues = list[value - 1].currentValue
    } else {
      urrentValues = ''
    }
    that.setState({
      current: value - 1,
      currentValue: urrentValues,// 点击下一题过后初始化题选项
    })
  }

  // 改变分页
  onChange = (value) => {
    this.setState({
      current: value,
    });
  };

  render() {
    const { currentValue, AnswerList, current, total } = this.state;
    const { location: { state } } = this.props;
    return (
      <div className={styles.MYcontent}>
        <PracticeNavBar SubmitFun={this.SubmitFun} AnswerList={AnswerList} item={state} />
        <PracticeType currentValue={currentValue} testPaperQuestionData={AnswerList[current]} current={current + 1} PreserveFun={this.PreserveFun} />
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Pagination
            style={{ marginTop: 20, width: 230, height: 30 }}
            total={total}
            className="custom-pagination-with-icon"
            current={current + 1}
            // mode="pointer"
            onChange={this.changeCurrent}
            locale={{
              prevText: <span style={{ height: '30px', lineHeight: '32px', fontSize: 13 }} className="arrow-align">上一题</span>,
              nextText: (<span style={{ height: '30px', lineHeight: '32px', fontSize: 13 }} className="arrow-align">下一题</span>),
            }}
          />
        </div>
        <PracticeFooter SubmitFun={this.SubmitFun} AnswerList={AnswerList} changeCurrent={this.changeCurrent} />

      </div>

    )
  }
}
export default StartExamination;
