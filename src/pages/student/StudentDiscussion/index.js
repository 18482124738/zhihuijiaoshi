import React, { PureComponent } from 'react';
import { Icon, List,Toast } from 'antd-mobile';
import { connect } from 'dva';
// import styles from './index.less';
import router from 'umi/router';
import PublicNavBar from '@/publicAssembly/NavBar';
import SYNC from '@/publicAssembly/Icons/sync.svg';
import USER from '@/publicAssembly/Icons/jiaoshi.svg';
import MESSAGE from '@/publicAssembly/Icons/message.svg';

@connect(({ discussTitle }) => ({
  discussTitle
}))
class StudentDiscussion extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch, location: { query } } = this.props;
    dispatch({
      type: 'discussTitle/fetch',
      payload: {
        TeachRecordId: query.teachRecordId
      },
    });
  }

  // 详细界面
  goConcreteDiscussion = (TitleId) => {
    const { location: { query } } = this.props;
    router.push({ pathname: '/nolayout/student/studentDiscussion/concreteDiscussion', query: { teachRecordId: query.teachRecordId, classRoomDiscussTitleId: TitleId} });
  };

  // 刷新
  refrash=()=>{
  const { dispatch, location: { query } } = this.props;
    dispatch({
      type: 'discussTitle/fetch',
      payload: {
        TeachRecordId: query.teachRecordId
      },
      callback:()=>{
        Toast.info('已刷新！',1);
      }
    });
  }

  render() {
    const { discussTitle: { data } } = this.props;
    return (
      <div style={{ width: '100%' }}>
        <PublicNavBar
          NavBarTitle="分组讨论"
          NavBarLeft={
            <Icon
              type="left"
              size="lg"
              onClick={() => router.push({ pathname: '/student/home' })}
            />
          }
          NavBarRight={
            <img alt="" onClick={this.refrash} src={SYNC} style={{ width: '28px', height: '28px', marginRight: '10px' }} />
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
                <List.Item.Brief>{item.CreateTime}丨
                  <img alt="" src={USER} style={{width: '18px', height: '18px', margin: '0 5px 0 5px' }} />
                  {item.DiscussStudentNum ? item.DiscussStudentNum : "0"}丨
                  <img alt="" src={MESSAGE} style={{width: '18px', height: '18px', margin: '0 5px 0 5px' }} />
                  {item.DiscussNum ? item.DiscussNum : "0"}
                </List.Item.Brief>
              </List.Item>
            )
          }
        </List>
      </div>
    );
  }
}

export default StudentDiscussion;
