import React, { PureComponent } from 'react';
import { Connector } from 'mqtt-react';
import { Icon } from 'antd-mobile';
// import { createForm } from 'rc-form';
import DiscussionSender from '@/components/DiscussionSender'
import router from 'umi/router';
import PublicNavBar from '@/publicAssembly/NavBar';
import SYNC from '@/publicAssembly/Icons/sync.svg';



class ConcreteDiscussion extends PureComponent {
  state = {};

  componentDidMount() {

  }

  componentWillUnmount() {
    this.setState = () => {  }
  }



  render() {
    // const { getFieldProps } = this.props.form;
    const { location: { state } } = this.props;
    // const DiscussionSender = subscribe({ topic: `@discussion/11056`, dispatch: this.customDispatch })(_DiscussionSender);
    return (
      <Connector mqttProps="ws://mqtt.mamios.com:8083/">
        <div style={{ width: '100%' }}>
          <PublicNavBar
            NavBarTitle="我的讨论"
            NavBarLeft={
              <Icon
                type="left"
                size="lg"
                onClick={() =>
                  router.push( '/nolayout/teacher/teacherDiscussion',  { teachRecordId: state.teachRecordId } )
                }
              />
            }
            NavBarRight={
              <img
                alt=""
                onClick={this.getDiscussDetail}
                src={SYNC}
                style={{ width: '28px', height: '28px', marginRight: '10px' }}
              />
            }
          />
          <DiscussionSender
            classRoomDiscussTitleId={state.classRoomDiscussTitleId}
            teachRecordId={state.teachRecordId}
          />
        </div>
      </Connector>
    );
  }
}

export default ConcreteDiscussion;
