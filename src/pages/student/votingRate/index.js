import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon, WingBlank, WhiteSpace, Button, Toast, TextareaItem } from 'antd-mobile';
// import styles from './index.less';
import router from 'umi/router';
import PublicNavBar from '@/publicAssembly/NavBar';
import EMPTYSTAR from '@/publicAssembly/Icons/emptyStar.png';
import FILLSTAR from '@/publicAssembly/Icons/fillStar.png';

@connect(({ teachRecordStudent }) => ({
  teachRecordStudent: teachRecordStudent.current,
}))
class VotingRate extends PureComponent {
  state = {
    stars: 5,
    starText: '完美',
  };

  componentDidMount() {}

  /* 星级评分 */
  handleStarClick = index => {
    let currentText = '';
    switch (index) {
      case 0:
        currentText = '一般';
        break;
      case 1:
        currentText = '良好';
        break;
      case 2:
        currentText = '满意';
        break;
      case 3:
        currentText = '非常满意';
        break;
      case 4:
        currentText = '完美';
        break;
      default:
        break;
    }
    this.setState({
      stars: index + 1,
      starText: currentText,
    });
  };

  /* 提交打分 */
  handleButtonClick = () => {
    const { stars } = this.state;
    const { teachRecordStudent, dispatch } = this.props;
    teachRecordStudent.EvaluationScore = stars;
    teachRecordStudent.EvaluationContent = this.Textarea.state.value;
    dispatch({ type: 'teachRecordStudent/update', payload: teachRecordStudent });
  };

  render() {
    const { stars, starText } = this.state;
    return (
      <div>
        <PublicNavBar
          NavBarTitle="投票打分"
          NavBarLeft={[<Icon type="left" size="lg" onClick={() => router.push('/student/home')} />]}
          NavBarRight={[<Icon key="0" type="ellipsis" />]}
        />
        <WingBlank>
          <WhiteSpace size="lg" />
          感兴趣：
          <span>
            {[0, 1, 2, 3, 4].map(item => {
              let img = EMPTYSTAR;
              if (item < stars) {
                img = FILLSTAR;
              }
              return (
                <img
                  alt="星级"
                  src={img}
                  onClick={() => this.handleStarClick(item)}
                  style={{ width: 30, height: 30 }}
                  key={item}
                />
              );
            })}
          </span>
          <span style={{ float: 'right' }}>{starText}</span>
          <WhiteSpace size="lg" />
          <hr />
          <TextareaItem
            placeholder="该门课还满意吗？说说它的优点和不足的地方"
            ref={el => {
              this.Textarea = el;
            }}
            clear
            rows={7}
            count={200}
          />
          <hr />
          <WhiteSpace size="lg" />
          <Button type="primary" onClick={this.handleButtonClick}>
            提交
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default VotingRate;
