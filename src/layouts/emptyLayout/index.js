import React from 'react';
import { connect } from 'dva';
import 'antd-mobile/dist/antd-mobile.css';
import { ActivityIndicator } from 'antd-mobile';
import styles from './emptyLayout.less';

const TIMER = 800;
let timeoutId = null;
@connect(({ userInfo, loading }) => ({
  userInfo,
  dataLoading: loading.global && !loading.models.Verify
}))
class EmptyLayout extends React.Component {
  state = {
    show: false
  }
  
  componentDidMount() {
    const { dispatch, dataLoading } = this.props;

    dispatch({
      type: 'userInfo/fetchCurrent',
    });

    if (dataLoading) {
      timeoutId = setTimeout(() => {
        this.setState({
          show: true
        });
      }, TIMER);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dataLoading } = nextProps;

    this.setState({
      show: false
    });
    if (dataLoading) {
      timeoutId = setTimeout(() => {
        this.setState({
          show: true
        });
      }, TIMER);
    }
  }

  componentWillUnmount() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }


  render() {
    const { children, dataLoading } = this.props;
    const { show } = this.state;
    return (
      <div className={styles.baseLayout}>{children}
        <ActivityIndicator toast text="正在加载" animating={show && dataLoading} />

      </div>
    );
  }
}


export default EmptyLayout;

