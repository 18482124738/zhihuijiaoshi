import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { connect } from 'dva';
import { Icon, ActivityIndicator } from 'antd-mobile';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './AccountLayout.less';
import logo from '../assets/logo.png';

const TIMER = 800;
let timeoutId = null;
const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 成都中医药大学
  </Fragment>
);

class AccountLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  state = {
    show: false
  }

  componentDidMount() {
    const { loading } = this.props;
    if (loading) {
      timeoutId = setTimeout(() => {
        this.setState({
          show: true
        });
      }, TIMER);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;

    this.setState({
      show: false
    });
    if (loading) {
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
    const { children, loading } = this.props;
    const { show } = this.state;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.lang}>
          {/* <SelectLang /> */}
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>智慧教室</span>
              </Link>
            </div>
            <div className={styles.desc}>--</div>
          </div>
          {children}
        </div>
        <GlobalFooter links={links} copyright={copyright} />
        <ActivityIndicator toast text="正在加载" animating={show && loading} />
      </div>
    );
  }
}
const mapStateToProps = (state) => (
  {
    loading: state.loading.global && !state.loading.models.Verify
  });
export default connect(mapStateToProps)(AccountLayout);
