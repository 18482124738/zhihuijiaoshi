import React, { PureComponent } from 'react';
import { Icon, List, Modal, Toast } from 'antd-mobile';
import { connect } from 'dva';
// import styles from './index.less';
import router from 'umi/router';
import PublicNavBar from '@/publicAssembly/NavBar';
import PLUS from '@/publicAssembly/Icons/plus.svg';
import USER from '@/publicAssembly/Icons/jiaoshi.svg';
import DELETE from '@/publicAssembly/Icons/delete.svg';
import MESSAGE from '@/publicAssembly/Icons/message.svg';



@connect(({ discussTitle }) => ({
  discussTitle
}))
class TeacherDiscussion extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch, location: { state } } = this.props;
    dispatch({
      type: 'discussTitle/fetch',
      payload: {
        TeachRecordId: state.teachRecordId
      },
    });


  }

  /* 创建讨论 */
  createTalk = () => {
    const { dispatch, location: { state } } = this.props;
    Modal.prompt(
      '请输入讨论主题',
      '',
      [
        {
          text: '取消',
          onPress: () =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                Toast.info('取消创建！', 1);
              }, 200);
            }),
        },
        {
          text: '创建',
          onPress: value => {
            if (value !== '') {
              dispatch({
                type: 'discussTitle/add',
                payload: {
                  TeachRecordId: state.teachRecordId,
                  Name: value,
                },
              });
            }
          },
        },
      ],
      'default',
      null,
      // ['6位数字']
    );
  };

  // 跳转讨论详细界面
  goConcreteDiscussion = (TitleId) => {
    const { location: { state } } = this.props;
    router.push('/nolayout/teacher/teacherDiscussion/concreteDiscussion', { teachRecordId: state.teachRecordId, classRoomDiscussTitleId: TitleId } );
  };

  // 删除讨论
  DeleteDiscussTitle = (e, ids, teachRecordId) => {
    const { dispatch } = this.props;
    e.stopPropagation();// 阻止点击冒泡
    dispatch({
      type: 'discussTitle/remove',
      payload: {
        titleId: [ids],
        teachId: {teachRecordId},
      },
    });
  }

  render() {
    const { discussTitle: { data }, location: { state } } = this.props;
    return (
      <div style={{ width: '100%' }}>
        <PublicNavBar
          NavBarTitle="分组讨论"
          NavBarLeft={
            <Icon
              type="left"
              size="lg"
              onClick={() => router.push({ pathname: '/teacher/home' })}
            />
          }
          NavBarRight={
            <img alt="" onClick={this.createTalk} src={PLUS} style={{ width: '28px', height: '28px', marginRight: '10px' }} />
          }
        />
        <List className="my-list">
          {
            data && data.Rows && data.Rows.map((item) =>
              <List.Item
                key={item.Id}
                arrow="horizontal"
                multipleLine
                onClick={() => this.goConcreteDiscussion(item.Id)}
                // platform="android"
                wrap
              >
                {item.Name}
                <List.Item.Brief>
                  {item.CreateTime}丨
                  <img alt="" src={USER} style={{width: '18px', height: '18px', margin: '0 5px 0 5px' }} />
                  {item.DiscussStudentNum ? item.DiscussStudentNum : "0"}丨
                  <img alt="" src={MESSAGE} style={{width: '18px', height: '18px', margin: '0 5px 0 5px' }} />
                  {item.DiscussNum ? item.DiscussNum : "0"}
                  <img alt="" id="ImgId" src={DELETE} onClick={(e) => this.DeleteDiscussTitle(e, item.Id, state.teachRecordId)} style={{ position: 'absolute', zIndex: '100', width: '18px', height: '18px', right: '35px', margin: '6px' }} />
                </List.Item.Brief>
              </List.Item>
            )
          }
        </List>
      </div>
    );
  }
}

export default TeacherDiscussion;
