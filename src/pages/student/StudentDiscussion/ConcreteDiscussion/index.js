import React, { PureComponent } from 'react';
import { Connector } from 'mqtt-react';
import { Icon } from 'antd-mobile';
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
    const {
      location: { query }
    } = this.props;
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
                  router.push({
                    pathname: '/nolayout/student/studentDiscussion',
                    query: { teachRecordId: query.teachRecordId },
                  })
                }
              />
            }
            NavBarRight={
              <img alt="" src={SYNC} style={{ width: '28px', height: '28px', marginRight: '10px' }} />
            }
          />
          <DiscussionSender
            classRoomDiscussTitleId={query.classRoomDiscussTitleId}
            teachRecordId={query.teachRecordId}
          />
        </div>
      </Connector>
    );
  }
}

export default ConcreteDiscussion;
