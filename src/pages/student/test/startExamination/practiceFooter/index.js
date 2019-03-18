import React, { Component } from 'react'
import { Modal, Button } from 'antd-mobile';
// import router from 'umi/router';
import styles from './index.less';

const Alert = Modal.alert;

class PracticeFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal2: false,
    }
  }

  componentDidMount() {

  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }

  // 交卷
  SubmitFun = () => {
    const { SubmitFun } = this.props;
    SubmitFun();
  }

  onCloseModel = (key) => {
    this.setState({
      [key]: false,
    });
  }

  // 提示框弹出方法
  showAlert = () => {
    const { AnswerList } = this.props;

    let promtText = ''
    if (AnswerList.NotAnswerLen > 0) {
      promtText = '还有未完成的题，是否交卷？'
    } else {
      promtText = '是否交卷？'
    }
    const alertInstance = Alert(promtText, '', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => this.SubmitFun() },
    ]);
    setTimeout(() => {
      // 可以调用close方法以在外部close
      alertInstance.close();
    }, 500000);
  }

  // 跳转到该题的方法
  goToThisQuestion = (k) => {
    const { changeCurrent } = this.props;
    changeCurrent(k);
    this.onCloseModel('modal2')
  }

  render() {
    const { modal2 } = this.state;
    const { AnswerList } = this.props;

    return (
      <div>
        <div className={styles.PracticeFooter}>
          <Button onClick={this.showAlert} className={styles.PracticeBtn} type="warning">交卷</Button>
          <Button onClick={this.showModal('modal2')} className={styles.PracticeBtn} type="primary">详情</Button>
        </div>
        <Modal
          popup
          visible={modal2}
          onClose={() => this.onCloseModel('modal2')}
          animationType="slide-up"
        >
          <div className={styles.ModalBox}>
            <div className={styles.ModalBoxHead}>
              总题数：<span style={{ fontSize: 15, color: 'rgb(13, 174, 232)' }}>{AnswerList.length}</span>
              <div className={styles.ModalBoxHeadCircleType1} />
              <span>已答：<span style={{ fontSize: 15, color: 'rgb(35, 70, 186)' }}>{AnswerList.AnswerLen}</span></span>
              <div className={styles.ModalBoxHeadCircleType2} />
              <span>未答：<span style={{ fontSize: 15, color: 'rgb(232, 13, 13)' }}>{AnswerList.NotAnswerLen}</span></span>
            </div>
            <div className={styles.ModalBoxBody}>
              {
                AnswerList.map((v, k) => {
                  return (
                    <div key={k} onClick={() => { this.goToThisQuestion(k + 1) }} className={v.CricleType ? (styles.ModalBoxBodyCircleType1) : (styles.ModalBoxBodyCircleType2)}>{k + 1}</div>
                  )
                })
              }
            </div>
          </div>
        </Modal>

      </div>

    )
  }
}
export default PracticeFooter;
