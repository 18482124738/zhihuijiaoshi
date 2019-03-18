import React from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { getUserInfo} from '@/utils/authority';
import 'antd-mobile/dist/antd-mobile.css';
import { TabBar, ActivityIndicator } from 'antd-mobile';
import styles from './baseLayout.less';
// import otherUrl from '../../../config/websiteUrl.config';
import myIcon1 from '../../assets/recycleH5_04.png';
import myIcon2 from '../../assets/recycleH5_05.png';
import home1 from '../../assets/recycleH5_07.png';
import home2 from '../../assets/recycleH5_02.png';

const TIMER = 800;
let timeoutId = null;

const TabBarData = [
  // {
  //   id: 'home',
  //   name: '首页',
  //   icon: home1,
  //   selectedicon: home2,
  //   url: otherUrl.IntelligentClassroom,
  // },
  {
    id: 'home',
    name: '首页',
    icon: home1,
    selectedicon: home2,
    url: '/home',
  },
  // {
  //   id: 'class',
  //   name: '课程',
  //   icon: require('../../assets/recycleH5_03.png'),
  //   selectedicon: require('../../assets/recycleH5_06.png'),
  //   url: '/student/course',
  // },
  // {
  //   id: 'my',
  //   name: '消息',
  //   icon: require('../../assets/recycleH5_18.png'),
  //   selectedicon: require('../../assets/recycleH5_19.png'),
  //   url: '/student/course/classSchedule',
  // },
  {
    id: 'my',
    name: '我的',
    icon: myIcon1,
    selectedicon: myIcon2,
    url: '/my',
  },
];

@connect(({ userInfo, loading }) => ({
  userInfo,
  dataLoading: loading.global && !loading.models.Verify,
}))
class BaseLayout extends React.Component {
  state = {
    show: false,
  };

  componentDidMount() {
    const { dispatch, dataLoading } = this.props;
    const userInfo = getUserInfo();
    dispatch({
      type: 'userInfo/saveCurrentUser',
      payload: userInfo,
    });
    if (dataLoading) {
      timeoutId = setTimeout(() => {
        this.setState({
          show: true,
        });
      }, TIMER);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dataLoading } = nextProps;

    this.setState({
      show: false,
    });
    if (dataLoading) {
      timeoutId = setTimeout(() => {
        this.setState({
          show: true,
        });
      }, TIMER);
    }
  }

  componentWillUnmount() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  isTabBarSelect = url => {
    const {
      location: { pathname },
    } = this.props;
    if (pathname === '/' && url === '/home') {
      return true;
    }
    return pathname === url;
  };

  render() {
    const {
      children,
      dataLoading,
    } = this.props;
    const { show } = this.state;

    return (
      <div className={styles.baseLayout}>
        <TabBar
          unselectedTintColor="#333"
          tintColor="#ef5f55"
          barTintColor="white"
          tabBarPosition="bottom"
        >
          {TabBarData.map(t => {
            const isSelect = this.isTabBarSelect(t.url);
            return (
              <TabBar.Item
                title={t.name}
                key={t.id}
                icon={
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      background: `url(${t.icon}) center center /  21px 21px no-repeat`,
                    }}
                  />
                }
                selectedIcon={
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      background: `url(${t.selectedicon}) center center /  21px 21px no-repeat`,
                    }}
                  />
                }
                // badge={1}
                onPress={() => {
                  // if (t.name === '首页') {
                  //   router.push(currentUrl, currentUser);
                  // } else {
                    router.push(t.url);
                  // }
                }}
                selected={isSelect}
                data-seed="logId"
              >
                {children}
              </TabBar.Item>
            );
          })}
        </TabBar>
        <ActivityIndicator toast text="正在加载" animating={show && dataLoading} />
      </div>
    );
  }
}

export default BaseLayout;
