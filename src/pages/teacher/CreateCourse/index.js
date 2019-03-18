import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
  Icon,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Toast,
  Menu,
  Accordion,
  Card,
  Radio,
} from 'antd-mobile';
import styles from './index.less';
import PublicNavBar from '@/publicAssembly/NavBar';
import SHOUDONG from '@/publicAssembly/Icons/shoudong.svg';
import BEIKE from '@/publicAssembly/Icons/beike.svg';
import KUAISU from '@/publicAssembly/Icons/kuaisu.svg';
import TIANJIA from '@/publicAssembly/Icons/plus24.svg';

@connect(({ teachRecord, userInfo, loading }) => ({
  teachRecord,
  userInfo,
  teachRecordLoading: loading.effects['teachRecord/fetch'],
}))
class CreateCourse extends PureComponent {
  state = {
    index: '',
  };

  componentDidMount() {}

  // 点击确定
  handleOK = () => {
    const {
      dispatch,
      userInfo: { currentUser },
    } = this.props;
    const { classroom, course, grade } = this;
    const classroomVal = classroom.state.value;
    const courseVal = course.state.value;
    const gradeVal = grade.state.value;
    let UserName;
    if (currentUser && currentUser.RealName) {
      UserName = currentUser.RealName;
    }
    if (!classroomVal || !courseVal || !gradeVal) {
      Toast.info('请填写完整信息！', 1);
      return;
    }
    dispatch({
      type: 'teachRecord/add',
      payload: {
        ClassRoomName: classroomVal, // 教室名称
        CourseName: courseVal, // 课程id
        ClassName: gradeVal, // 课程名称
        // ClassRoomId: 'lal', // 教室id
        // CourseId: 'lal', // 课程id
        // ClassId: 11122, // 班级id
        UserName,
      },
      callback: () => {
        router.push('/teacher/home');
      },
    });
  };

  onMenuChange = value => {
    console.log(value);
  };

  onRadioChange = index => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    const initData = [
      {
        value: '课程',
        label: '课程',
        children: [
          {
            label: [
              <img src={TIANJIA} alt="新增" />,
              <span style={{ color: 'red', marginLeft: 10 }}>新增</span>,
            ],
            value: '课程新增',
          },
          { label: '数字医疗软件', value: '数字医疗软件' },
          { label: '操作系统原理', value: '操作系统原理' },
          { label: '计算机导论', value: '计算机导论' },
          { label: '计算机基础', value: '计算机基础' },
        ],
      },
      {
        value: '章节',
        label: '章节',
        children: [
          {
            label: [
              <img src={TIANJIA} alt="新增" />,
              <span style={{ color: 'red', marginLeft: 10 }}>新增</span>,
            ],
            value: '章节新增',
          },
          { label: '第一章', value: '第一章' },
          { label: '第二章', value: '第二章' },
          { label: '第三章', value: '第三章' },
          { label: '第四章', value: '第四章' },
          { label: '第五章', value: '第五章' },
          { label: '第六章', value: '第六章' },
          { label: '第七章', value: '第七章' },
          { label: '第八章', value: '第八章' },
        ],
      },
      {
        value: '班级',
        label: '班级',
        children: [
          {
            label: [
              <img src={TIANJIA} alt="新增" />,
              <span style={{ color: 'red', marginLeft: 10 }}>新增</span>,
            ],
            value: '班级新增',
          },
          { label: '2015级1班', value: '2015级1班' },
          { label: '2016级1班', value: '2016级1班' },
          { label: '2016级2班', value: '2016级2班' },
          { label: '2017级1班', value: '2017级1班' },
        ],
      },
      {
        value: '3',
        label: 'A教',
        children: [
          { label: '101', value: '1' },
          { label: '102', value: '2' },
          { label: '103', value: '3' },
          { label: '104', value: '4' },
          { label: '105', value: '5' },
          { label: '106', value: '6' },
          { label: '107', value: '7' },
          { label: '108', value: '8' },
          { label: '101', value: '9' },
          { label: '102', value: '10' },
          { label: '103', value: '12' },
          { label: '104', value: '13' },
          { label: '105', value: '14' },
          { label: '106', value: '15' },
          { label: '107', value: '16' },
          { label: '108', value: '17' },
        ],
      },
      {
        value: '4',
        label: 'B教',
        children: [
          { label: '201', value: '1' },
          { label: '202', value: '2' },
          { label: '203', value: '3' },
          { label: '204', value: '4' },
        ],
      },
      {
        value: '5',
        label: 'C教',
        children: [
          { label: '301', value: '1' },
          { label: '302', value: '2' },
          { label: '303', value: '3' },
          { label: '304', value: '4' },
        ],
      },
      {
        value: '6',
        label: 'D教',
        children: [
          { label: '401', value: '1' },
          { label: '402', value: '2' },
          { label: '403', value: '3' },
          { label: '404', value: '4' },
        ],
      },
      {
        value: '7',
        label: 'E教',
        children: [
          { label: '501', value: '1' },
          { label: '502', value: '2' },
          { label: '503', value: '3' },
          { label: '504', value: '4' },
        ],
      },
      {
        value: '8',
        label: 'F教',
        children: [
          { label: '601', value: '1' },
          { label: '602', value: '2' },
          { label: '603', value: '3' },
          { label: '604', value: '4' },
        ],
      },
    ];

    return (
      <div>
        <PublicNavBar
          NavBarTitle="创建课程"
          NavBarLeft={[<Icon type="left" size="lg" onClick={() => router.push('/teacher/home')} />]}
          NavBarRight={<span onClick={this.handleOK}>确定</span>}
        />
        <WingBlank size="md">
          <WhiteSpace />
          <List>
            <InputItem
              clear
              placeholder="如：A-101"
              ref={e => {
                this.classroom = e;
              }}
            >
              教室
            </InputItem>
            <InputItem
              clear
              placeholder="如：医学概论"
              ref={e => {
                this.course = e;
              }}
            >
              课程
            </InputItem>
            <InputItem
              clear
              placeholder="如：2019级1班"
              ref={e => {
                this.grade = e;
              }}
            >
              班级
            </InputItem>
          </List>
          <WhiteSpace />
          <Accordion defaultActiveKey="0" accordion onChange={this.onChange}>
            <Accordion.Panel
              header={[
                <img src={BEIKE} alt="备课" />,
                <span style={{ color: '#108ee9', marginLeft: 10 }}>使用备课</span>,
              ]}
            >
              {[1, 2].map(item => (
                <div style={{ margin: '10 0' }} key={item}>
                  <WhiteSpace />
                  <Card>
                    <Card.Header title="数字医疗概论" extra="2019-03-13" />
                    <Card.Body>第{item}章</Card.Body>
                    <Card.Footer
                      content={`适用班级：2018级${item}班`}
                      extra={[
                        <Radio
                          name="radio22"
                          className={styles.myRadio}
                          checked={item === index}
                          onChange={() => this.onRadioChange(item)}
                        />,
                        <span>选择</span>,
                      ]}
                    />
                  </Card>
                  <WhiteSpace />
                </div>
              ))}
            </Accordion.Panel>
            <Accordion.Panel
              header={[
                <img src={KUAISU} alt="最近使用" />,
                <span style={{ color: '#108ee9', marginLeft: 10 }}>最近使用</span>,
              ]}
            >
              <Menu
                className="foo-menu"
                style={{ width: document.documentElement.clientWidth * 1 }}
                data={initData}
                value={['1', '3']}
                onChange={this.onMenuChange}
                height={document.documentElement.clientHeight * 1.0 - 45}
              />
            </Accordion.Panel>
          </Accordion>
        </WingBlank>
      </div>
    );
  }
}

export default CreateCourse;
