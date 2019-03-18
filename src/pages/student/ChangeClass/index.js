import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { WingBlank, Card, Icon, WhiteSpace, Radio, Toast } from 'antd-mobile';
import styles from './index.less';
import PublicNavBar from '@/publicAssembly/NavBar';

@connect(({ teachRecordStudent, loading }) => ({
  teachRecordStudent,
  teachRecordStudentLoading: loading.effects['teachRecordStudent/fetch'],
}))
class Student extends PureComponent {
  state = {
    studentId: '',
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'teachRecordStudent/fetch', payload: { Nowstate: 2 } });
  }

  componentDidMount() {}

  onChange = studentId => {
    this.setState({ studentId });
  };

  handleOK = () => {
    const { studentId } = this.state;
    const {
      location: { state },
      dispatch,
    } = this.props;
    if (studentId) {
      dispatch({
        type: 'teachRecordStudent/updateCurrent',
        payload: {
          newId: studentId,
          oldId: state.oldId,
        },
        callback: () => {
          router.push('/student/home');
        },
      });
    } else {
      Toast.info('请选择要切换至的课程！', 2);
    }
  };

  render() {
    const { studentId } = this.state;
    const { teachRecordStudent } = this.props;
    const currentRows = teachRecordStudent.data.Rows;
    return (
      <div>
        <PublicNavBar
          NavBarLeft={[<Icon type="left" size="lg" onClick={() => router.push('/student/home')} />]}
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
                    title={item.TeachRecord ? item.TeachRecord.CourseName : '暂无数据'}
                    extra={item.TeachRecord.UserName || '未知教师'}
                  />
                  <Card.Body>
                    <div>
                      教室：
                      {item.TeachRecord.ClassRoomName || '未知教室'}
                    </div>
                    <div>
                      开课时间：
                      {item.TeachRecord ? item.TeachRecord.CreateTime.slice(0, 16) : '暂无数据'}
                    </div>
                    <div>
                      加入时间：
                      {item.CreateTime ? item.CreateTime.slice(0, 16) : '暂无数据'}
                    </div>
                  </Card.Body>
                  <Card.Footer
                    content={`班级：${item.TeachRecord.ClassName}`}
                    extra={[
                      <Radio
                        key={item.TeachRecordId}
                        name="radio22"
                        className={styles.myRadio}
                        checked={studentId === item.Id}
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

export default Student;
