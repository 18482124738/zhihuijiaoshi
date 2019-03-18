import React, { Component } from 'react'
import { Icon, NavBar, Checkbox, TextareaItem, Flex, Button, Card, Tabs, List, Radio, WhiteSpace, InputItem } from 'antd-mobile';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
import moment from 'moment';
import { type } from 'os';
// import "font-awesome-sprockets";
// import "font-awesome";

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
const RadioItem = Radio.RadioItem;

@connect(({
  examRecord,
  testPaper
}) => ({
  testPaper,
  examRecord
}))
class PracticeType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      value2: '',
      value3: 0,
      value4: 0,
      testData: { Type: 0, QuestionItem: [], QuestionTitle: 1 },
      checkboxList: []
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(Nextporps) {
    let list = [];
    const nextporps  = Nextporps;
    if (nextporps.testPaperQuestionData) {
      if (nextporps.testPaperQuestionData.Type === 1 || nextporps.testPaperQuestionData.Type === 2) {
        if (typeof nextporps.testPaperQuestionData.QuestionItem === 'string') {
          nextporps.testPaperQuestionData.QuestionItem = JSON.parse(nextporps.testPaperQuestionData.QuestionItem);
        }
        if (nextporps.testPaperQuestionData.Type === 2) {
          if (nextporps.testPaperQuestionData.MyAnswer) {
            const arr = []
            list = nextporps.testPaperQuestionData.MyAnswer.split(",");
            list.forEach(element => {
              arr.push(parseInt(element))
            });
            list = arr;
          }
        }

      } else if (nextporps.testPaperQuestionData.Type === 5) {
        // 如果是填空题  初始化
        if (nextporps.testPaperQuestionData.QuestionItem === null) {
          let itemlist = []
          for (let i = 0; i < nextporps.testPaperQuestionData.Number; i++) {
            itemlist.push({ index: 0, text: '' })
          }
          nextporps.testPaperQuestionData.QuestionItem = itemlist;
        } else if (typeof nextporps.testPaperQuestionData.QuestionItem === 'string') {
          nextporps.testPaperQuestionData.QuestionItem = JSON.parse(nextporps.testPaperQuestionData.QuestionItem);
        }
      }
    }
    this.setState({
      value: nextporps.currentValue,
      testData: nextporps.testPaperQuestionData,
      checkboxList: list,
      value2: parseInt(nextporps.testPaperQuestionData.MyAnswer)
    });
  }

  // 判断保存答案
  judgeChange = (value, QuestionId) => {
    const that = this;
    that.props.PreserveFun(value.toString(), '', 3, '', QuestionId)
    that.setState({
      value2: value
    });

  }

  // 简答保存答案
  TextareaItem = (value) => {
    const { testData } = this.state;
    const str = testData
    str.MyAnswer = value
    this.setState({
      testData: str,
    });
  };

  // 简答题失去焦点时保存答案
  TextareaItemBlur = () => {
    const { PreserveFun } = this.props
    const { testData } = this.state;
    PreserveFun(testData.MyAnswer, '', 4, '', testData.QuestionId)
  }

  // 单选点击保存答案
  SingleChange = (values, MyAnswer, QuestionId) => {
    const { PreserveFun } = this.props
    PreserveFun(MyAnswer.toString(), values, 1, '', QuestionId)
    this.setState({
      value: values
    });
  };

  // 多选点击保存答案
  checkboxChange = (val, index, QuestionId) => {
    const { checkboxList } = this.state
    const { PreserveFun } = this.props
    const list = checkboxList;
    let str = '';
    let check = false;
    // 数组里面没有就添加，有就删除
    if (list.indexOf(index) === -1) {
      list.push(index)
      check = true;
    } else {
      check = false;
      list.splice(list.indexOf(index), 1);
    }
    if (list.length > 0) {
      for (let i = 0; i < list.length - 1; i++) {
        str += list[i] + ',';
      }
      str += list[list.length - 1];
    } else {
      str = '';
    }
    this.setState({
      checkboxList: list
    })
    PreserveFun(str, check, 2, val, QuestionId)
  }

  // 填空题输入答案事件
  textChange = (MyAnswer, k) => {
    const { testData } = this.state;
    const list = testData;
    list.QuestionItem[k].text = MyAnswer.toString();
    this.setState({
      testData: list
    })
  }

  textChange1 = () => {// 填空题失去焦点时保存答案
    const { testData } = this.state;
    const { PreserveFun } = this.props;
    PreserveFun(testData.QuestionItem, '', 5, '', testData.QuestionId)
  }

  render() {
    const { value, value2, testData } = this.state;
    const { current } = this.props;
    const data2 = [{
      value: 0,
      label: '正确'
    },
    {
      value: 1,
      label: '错误'
    },
    ];

    return (
      <div >

        { /* 选择题  单选 */}
        <div style={{ display: testData.Type === 1 ? 'block' : 'none', position: 'relative' }}>
          <div className={styles.PracticeTitle}>
            <span>
              <span style={{ fontSize: 18, color: '#0a81ea' }}>{current}、</span>
              <span dangerouslySetInnerHTML={{ __html: testData.QuestionTitle }}></span>
            </span>
            <span className={styles.PracticeScord}>{testData.Scord}分</span>
          </div>
          <List renderHeader={() => '单选'}>
            {
              testData.QuestionItem && testData.QuestionItem.map((i, k) => {
                return (
                  <RadioItem style={{ whiteSpace: 'pre-wrap' }} key={k} checked={value === k} onChange={() => this.SingleChange(k, i.index, testData.QuestionId)}>
                    <div style={{ fontSize: 13, letterSpacing: 1, whiteSpace: 'pre-wrap' }}>
                      <div dangerouslySetInnerHTML={{ __html: i.text }}></div>
                    </div>
                  </RadioItem>
                )
              })
            }
          </List>
        </div>
        { /* 选择题  多选 */}
        <div style={{ display: testData.Type === 2 ? 'block' : 'none' }}>
          <div className={styles.PracticeTitle}>
            <span style={{ fontSize: 18, color: '#0a81ea' }}>{current}、</span>
            <span dangerouslySetInnerHTML={{ __html: testData.QuestionTitle }}></span>
            <span className={styles.PracticeScord}>{testData.Scord}分</span>
          </div>
          <List renderHeader={() => '多选'}>
            {
              testData.QuestionItem && testData.QuestionItem.map((i, k) => {
                return (
                  <CheckboxItem key={k} checked={i.currentValue} onChange={() => this.checkboxChange(k, i.index, testData.QuestionId)}>
                    <div style={{ fontSize: 13, letterSpacing: 1, whiteSpace: 'pre-wrap' }}>
                      <div dangerouslySetInnerHTML={{ __html: i.text }}></div>
                    </div>
                  </CheckboxItem>
                )
              })
            }
          </List>
        </div>

        { /* 选择题  简答 */}
        <div style={{ display: testData.Type === 4 ? 'block' : 'none' }}>
          <div className={styles.PracticeTitle}>
            <span style={{ fontSize: 18, color: '#0a81ea' }}>{current}、</span>

            <span dangerouslySetInnerHTML={{ __html: testData.QuestionTitle }}></span>
            <span className={styles.PracticeScord}>{testData.Scord}分</span>
          </div>
          <List renderHeader={() => '简答'}>
            <TextareaItem
              value={testData.MyAnswer}
              rows={5}
              count={300}
              onBlur={this.TextareaItemBlur}
              onChange={this.TextareaItem}
            />
          </List>
        </div>
        { /* 选择题  判断 */}
        <div style={{ display: testData.Type === 3 ? 'block' : 'none' }}>
          <div className={styles.PracticeTitle}>
            <span style={{ fontSize: 18, color: '#0a81ea' }}>{current}、</span>

            <span dangerouslySetInnerHTML={{ __html: testData.QuestionTitle }}></span>
            <span className={styles.PracticeScord}>{testData.Scord}分</span>
          </div>
          <List renderHeader={() => '判断'}>
            {data2 && data2.map(i => (
              <RadioItem key={i.value} checked={value2 === i.value} onChange={() => this.judgeChange(i.value, testData.QuestionId)}>
                <span style={{ fontSize: 13, letterSpacing: 1 }}>{i.label}</span>
              </RadioItem>
            ))}
          </List>
        </div>
        { /* 选择题  填空 */}
        <div style={{ display: testData.Type === 5 ? 'block' : 'none' }}>
          <div className={styles.PracticeTitle}>
            <span style={{ fontSize: 18, color: '#0a81ea' }}>{current}、</span>

            <span dangerouslySetInnerHTML={{ __html: testData.QuestionTitle }}></span>
            <span className={styles.PracticeScord}>{testData.Scord}分</span>
          </div>
          <List renderHeader={() => '填空'}>
            <div className={styles.PracticeFillBox}>
              <div className={styles.PracticeFillBoxBody}>
                {

                  testData.QuestionItem && testData.QuestionItem.map((v, k) => {
                    return (
                      <InputItem onChange={(event) => this.textChange(event, k)} onBlur={this.textChange1} key={k} value={v.text} defaultValue={v.text} clear placeholder="请再此输入答案">
                        <div className={styles.PracticeFillBoxBTitle}>
                          {k + 1}
                        </div>
                      </InputItem>
                    )
                  })
                }
              </div>
            </div>
          </List>
        </div>
      </div>

    )
  }
}
export default PracticeType;
