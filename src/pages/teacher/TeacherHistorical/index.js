import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Icon,
  Toast,
  Button,
  DatePicker,
  List,
  ActionSheet,
  WingBlank,
  WhiteSpace, PullToRefresh
} from 'antd-mobile';
// import styles from './index.less';
import router from 'umi/router';
import PublicNavBar from '@/publicAssembly/NavBar';
import TeachRecordEcharts from '@/components/Echart/TeachRecordEcharts';

@connect(({ teachRecord, loading }) => ({
  teachRecord: teachRecord.data,
  teachRecordLoading: loading.effects['teachRecord/fetch'],
}))
class TeacherHistorical extends PureComponent {
  state = {
    buttonChecked: '全部',
    refreshing: false,
    height: document.documentElement.clientHeight - 140,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'teachRecord/fetch',
    });
  }


  getMoreRecord = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'teachRecord/getMore',
    });
  };



  /* 日期选择ok */
  handleDateOK = val => { };

  /* 显示筛选 */
  showActionSheet = () => {
    const BUTTONS = ['全部', '优秀', '一般', '临时课程', '研究所考勤'];
    let { buttonChecked } = this.state;
    ActionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        // cancelButtonIndex: BUTTONS.length - 1,
        // destructiveButtonIndex: BUTTONS.length - 2,
        // title: 'title',
        // message: 'I am description, description, description',
        maskClosable: true,
        'data-seed': 'logId',
        // wrapProps,
      },
      buttonIndex => {
        buttonChecked = BUTTONS[buttonIndex] ? BUTTONS[buttonIndex] : buttonChecked;
        this.setState({ buttonChecked });
      }
    );
  };

  render() {
    const { teachRecord } = this.props;
    const currentRows = teachRecord.Rows;
    const { buttonChecked, height, refreshing } = this.state;

    return (
      <div className="single_detail">
        <PublicNavBar
          NavBarTitle={[
            <Button
              onClick={this.showActionSheet}
              type="ghost"
              style={{ border: 'none', color: 'white  ' }}
            >
              {buttonChecked}
            </Button>,
            <Icon type="down" />,
          ]}
          NavBarLeft={[<Icon type="left" size="lg" onClick={() => router.push('/teacher/home')} />]}
        />
        <DatePicker
          mode="date"
          title="选择日期"
          extra="Optional"
          value={new Date(Date.now())}
          onChange={date => this.setState({ date })}
          maxDate={new Date(2020, 1, 1, 23, 59, 59)}
          onOk={val => this.handleDateOK(val)}
        >
          <List.Item>
            <span style={{ color: '#108ee9' }}>选择日期</span>
          </List.Item>
        </DatePicker>
        <WingBlank>
          <span>总课时：{teachRecord.Total}</span>
          <span style={{ float: 'right' }}>优秀率：80%</span>
          <WhiteSpace size="lg" />
          <PullToRefresh
            damping={60}
            style={{
              height,
              overflow: 'auto',
              backgroundColor: 'rgb(240, 240, 240)',
            }}
            direction='up'
            refreshing={refreshing}
            onRefresh={() => {
              this.setState({ refreshing: true });
              this.getMoreRecord();
              this.setState({ refreshing: false });
            }}
          >
            {currentRows
              ? currentRows.map(item => <TeachRecordEcharts item={item} isTeacher />)
              : ''}
          </PullToRefresh>
        </WingBlank>
      </div>
    );
  }
}

export default TeacherHistorical;
