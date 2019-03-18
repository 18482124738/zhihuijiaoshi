import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { WingBlank, Card, Icon, WhiteSpace, Radio, Toast } from 'antd-mobile';
import styles from './index.less';
import PublicNavBar from '@/publicAssembly/NavBar';

@connect(({ teachRecord, loading }) => ({
  teachRecord,
  teachRecordLoading: loading.effects['teachRecord/fetch'],
}))
class ChangeCourse extends PureComponent {
  state = {
    teacherId: '',
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'teachRecord/fetch', payload: { Nowstate: 2 } });
  }

  componentDidMount() {}

  onChange = teacherId => {
    this.setState({ teacherId });
  };

  handleOK = () => {
    const { teacherId } = this.state;
    const {
      location: { state },
      dispatch,
    } = this.props;
    if (teacherId) {
      dispatch({
        type: 'teachRecord/updateCurrent',
        payload: {
          newId: teacherId,
          oldId: state.oldId,
        },
        callback: () => {
          router.push('/teacher/home');
        },
      });
    } else {
      Toast.info('请选择要切换至的课程！', 2);
    }
  };

  render() {
    const { teacherId } = this.state;
    const { teachRecord } = this.props;
    const currentRows = teachRecord.data.Rows;
    return (
      <div>
        <PublicNavBar
          NavBarLeft={[<Icon type="left" size="lg" onClick={() => router.push('/teacher/home')} />]}
          NavBarTitle="课程切换"
          NavBarRight={[<span onClick={this.handleOK}>确定</span>]}
        />
        <WhiteSpace />
        <WingBlank size="lg">
          {currentRows &&
            currentRows.map(item => (
              <div key={item.Id}>
                <Card>
                  <Card.Header
                    title={item.CourseName || '暂无数据'}
                    extra={item.UserName || '未知教师'}
                  />
                  <Card.Body>
                    <div>
                      教室：
                      {item.ClassRoomName || '未知教室'}
                    </div>
                    <div>
                      开课时间：
                      {item.CreateTime ? item.CreateTime.slice(0, 16) : '暂无数据'}
                    </div>
                  </Card.Body>
                  <Card.Footer
                    content={`班级：${item.ClassName}`}
                    extra={[
                      <Radio
                        key={item.TeachRecordId}
                        name="radio22"
                        className={styles.myRadio}
                        checked={teacherId === item.Id}
                        onChange={() => this.onChange(item.Id)}
                      />,
                      <span key={`${item.TeachRecordId}2020`}>选择</span>,
                    ]}
                  />
                </Card>
                <WhiteSpace size="lg" />
              </div>
            ))}
        </WingBlank>
      </div>
    );
  }
}

export default ChangeCourse;
