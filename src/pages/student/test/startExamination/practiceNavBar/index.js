import React, { Component } from 'react';
import { Icon, NavBar, Modal } from 'antd-mobile';
import router from 'umi/router';
import styles from './index.less';
import moment from 'moment';
const alert = Modal.alert;

class PracticeNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Time: this.props.item.date,
      Name: this.props.item.Name,
    };
  }

  componentDidMount() {
    let item = this.props.item;
    let that = this;
    that.setState({
      setIntervalTime: setInterval(() => {
        if (item.Minute === 900000) {
          alert('离考试结束还有15分钟');
        }
        if (item.Minute === 0) {
          this.props.SubmitFun();
        }
        let date = '';
        if (item.Minute < 3600000) {
          date = moment(item.Minute).format('mm:ss');
        } else {
          date =
            (item.Minute - (item.Minute % 3600000)) / 3600000 +
            ':' +
            moment(item.Minute % 3600000).format('mm:ss');
        }
        that.setState(
          {
            Time: date,
          },
          () => {
            item.Minute = item.Minute - 1000;
          }
        );
      }, 1000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.setIntervalTime);
  }

  // 提示框弹出方法
  showAlert = promtText => {
    if (this.props.AnswerList.NotAnswerLen > 0) {
      promtText = '还有未完成的题，退出等于交卷！！！';
    } else {
      promtText = '是否交卷！！！';
    }
    alert(promtText, '', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => this.props.SubmitFun() }, //交卷
    ]);
  };

  goBack = () => {
    router.push({
      pathname: '/student/test',
    });
  };

  render() {
    return (
      <div>
        <NavBar
          icon={<Icon size="lg" type="left" />}
          onLeftClick={this.showAlert} // onLeftClick={() => console.log('onLeftClick')}
          className={styles.MYNav}
          rightContent={this.state.Time}
        >
          <span className={styles.MYNavTitleBox}>
            <div className={styles.MYNavTitle}>{this.state.Name}</div>
          </span>
        </NavBar>
      </div>
    );
  }
}
export default PracticeNavBar;
