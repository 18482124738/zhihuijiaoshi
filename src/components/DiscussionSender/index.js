import React, { PureComponent } from 'react';
import { subscribe } from 'mqtt-react';
import { Button, List, InputItem, Toast, PullToRefresh } from 'antd-mobile';
import { connect } from 'dva';
import { getRole } from '@/utils/authority';
import DiscussionList from "../DiscussionList"
// import LIKE from '@/publicAssembly/Icons/like.svg';
// import LIKEYELLOW from '@/publicAssembly/Icons/likeYellow.svg';
// import DELETE from '@/publicAssembly/Icons/delete.svg';
// import { createForm } from 'rc-form';

@connect(({ discussDetail }) => ({
  discussDetail,
}))
class DiscussionSender extends PureComponent {
  constructor(props) {
    const role = getRole();
    super(props);
    const { dispatch } = this.props;
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight - 100,
      buttons: role === "2" ?
        [{
          // 点赞
          Id: 1, handle: (item) => {
            item.Like === false ? item.Like = true : item.Like = false;
            delete item.UserInfo
            // console.log(item)
            dispatch({
              type: 'discussDetail/update',
              payload: item,
            });
          }
        }, {
          // 删除数据
          Id: 2, handle: (item) => {
            dispatch({
              type: 'discussDetail/remove',
              payload: [item.Id],
            });
          }
        }] : [{
          // 点赞
          Id: 1, handle: () => {

          }
        }]
    };
  }

  // componentDidMount() {
  //   // this.getDiscussDetail()
  // }
  componentWillMount() {

    this.InitDiscussDetail()
  }

  InitDiscussDetail = () => {
    const {
      dispatch,
      classRoomDiscussTitleId,
    } = this.props;
    dispatch({
      type: 'discussDetail/fetch',
      payload: {
        ClassRoomDiscussTitleId: classRoomDiscussTitleId,
      },
    });
  };


  getMoreDiscussDetail = () => {
    const {
      dispatch,
      classRoomDiscussTitleId,
    } = this.props;
    dispatch({
      type: 'discussDetail/getMore',
      payload: {
        ClassRoomDiscussTitleId: classRoomDiscussTitleId,
      },
    });
  };


  handleClick = () => {
    const {
      dispatch,
      classRoomDiscussTitleId,
      teachRecordId,
    } = this.props;
    const { state: { value } } = this.autoFocusInst
    if (this.autoFocusInst.state.value === '') {
      Toast.fail('请不要发空评论');
    } else {
      dispatch({
        type: 'discussDetail/add',
        payload: {
          ClassRoomDiscussTitleId: classRoomDiscussTitleId,
          TeachRecordId: teachRecordId,
          Content: value,
        },
        callback: (resposn) => {
          this.addMessage(JSON.stringify(resposn.Data));
          this.autoFocusInst.state.value = ''
        }
      });
      // this.addMessage('{"Id":11337,"ClassRoomDiscussTitleId":11056,"DiscussTitle":null,"TeachRecordId":20466,"Content":"123","UserId":"3453807377256546304","UserInfo":null,"CreateTime":"2019-03-11 10:59:06","LasteModifyTime":null,"Enable":true}');
    }
  };

  addMessage(message) {
    const { mqtt } = this.props;
    mqtt.publish(`@discussion/Content`, message);
  }

  render() {
    // const { getFieldProps } = this.props.form;
    const { classRoomDiscussTitleId, data, discussDetail: { data: historyDiscuss }, } = this.props;
    const { buttons, height, refreshing } = this.state;

    // props中的data为mqtt发送过来的讨论，将mqtt发送过来的讨论追加到从数据库读取的历史讨论中，然后一起呈现到界面
    let discussList = [];
    if (historyDiscuss && historyDiscuss.Rows) {
      discussList = discussList.concat(historyDiscuss.Rows);
    }
    if (data && data.length > 0) {
      data.map(item => {
        if (item.ClassRoomDiscussTitleId === classRoomDiscussTitleId)
          discussList.push(item);
        return item;
      })
    }

    return (
      <div>
        <PullToRefresh
          damping={60}
          style={{
            height,
            overflow: 'auto',
            backgroundColor: 'rgb(240, 240, 240)',
          }}
          direction='down'
          refreshing={refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true });
            this.getMoreDiscussDetail();
            this.setState({ refreshing: false });
          }}
        >
          <DiscussionList buttons={buttons} data={discussList} classRoomDiscussTitleId={classRoomDiscussTitleId} />
        </PullToRefresh>
        <div
          style={{
            width: '100%',
            position: 'fixed',
            bottom: '0',
            height: '50px',
            zIndex: '100',
            padding: '0 0 15px',
            background: 'white',
          }}
        >
          <div style={{ width: '76%', float: 'left' }}>
            <List>
              <InputItem
                clear
                placeholder="请输入内容"
                ref={el => {
                  this.autoFocusInst = el;
                }}
              />
            </List>
          </div>
          <Button
            style={{ width: '20%', float: 'right', margin: '4px 10px 0 0', height: '35px', lineHeight: '35px' }}
            type="primary"
            onClick={this.handleClick}
          >
            发表
          </Button>
        </div>
      </div>
    );
  }
}

export default subscribe({ topic: `@discussion/Content` })(DiscussionSender);
