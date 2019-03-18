
import React, { PureComponent } from 'react';
import { Tabs, Modal, Icon, List } from 'antd-mobile';
import { connect } from 'dva';
import styles from './index.less';
import router from 'umi/router';
import ServerHost from '../../../../config/server.config';
import PublicNavBar from '@/publicAssembly/NavBar';

import TIMESVG from '@/publicAssembly/Icons/time.svg';
// import COURSEFOLDER from '@/publicAssembly/Icons/courseFolder.png';
import ZILIAOSVG from '@/publicAssembly/Icons/ziliao.svg';
import DOWNLOAD from '@/publicAssembly/Icons/download.svg';

const Alert = Modal.alert;

const tabs = [
  { title: '下载资料' },
  { title: '下载记录' },
];

const Item = List.Item;
@connect(({ coursewareSend, downRecords }) => ({
  coursewareSend,
  downRecords

}))
class DataDownload extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch, location: { query } } = this.props;
    dispatch({
      type: 'coursewareSend/fetch',
      payload: {
        TeachRecordId: query.teachRecordId
      }
    });
    // 获取下载记录
    dispatch({
      type: 'downRecords/history',
      payload: {
        TeachRecordId: query.teachRecordId
      }
    });
  }


  /* 下载资料 */
  downFile = (coursewareId, filePath) => {
    Alert('是否下载该资料?', '', [
      { text: '取消' },
      {
        text: '确定', onPress: () => {
          const { dispatch, location: { query } } = this.props;
          dispatch({
            type: 'downRecords/downLoad',
            payload: { TeachRecordId: query.teachRecordId, DownCoursewareId: coursewareId, FilePath: filePath },
            callback: (value) => {
              window.location.href = `${ServerHost.OnlineEducationServer}${value.Data}?mp.wexin.qq.com`;
              // console.log(`http://210.41.215.35:8022/${value.Data}?mp.wexin.qq.com`)
            }
          })
        }
      },
    ]);
  }


  render() {
    const { coursewareSend: { data }, downRecords: { history } } = this.props;

    return (
      <div className={styles.MYcontent}>
        <PublicNavBar
          NavBarTitle="课程资料"
          NavBarLeft={<Icon type="left" size='lg' onClick={() => router.push({ pathname: '/student/home' })} />}
          NavBarRight=""
        />
        <Tabs
          tabs={tabs}
          initialPage={0}
        // onChange={(tab, index) => { console.log('onChange', index, tab); }}
        // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div className={styles.tab_0}>
            <div>
              <List className="my-list">
                {
                  data && data.Rows && data.Rows.map(item => (
                    <Item
                      style={{ display: item.State === 2 ? 'block' : 'none' }}
                      key={item.Id}
                      multipleLine
                      extra={<img alt="" onClick={() => this.downFile(item.Id, item.FilePaths)} src={DOWNLOAD} style={{ width: "25px", height: "25px", marginRight: "10px" }} />}
                    >
                      <img alt="" src={ZILIAOSVG} style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                      {item.FileNames ? item.FileNames : ''}
                    </Item>
                  ))
                }
              </List>
            </div>
          </div>
          <div className={styles.tab_2}>
            <div>
              <List className="my-list" onClick={() => { }}>
                {
                  history && history.Rows && history.Rows.map(item => (
                    <Item
                      // style={{ display: item.State === 2 ? 'block' : 'none' }}
                      key={item.Id}
                      multipleLine
                    >
                      <img alt="" src={TIMESVG} style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                      {item.CoursewareSend.FileNames ? item.CoursewareSend.FileNames : ''}
                    </Item>
                  ))
                }
              </List>
            </div>
          </div>


        </Tabs>
      </div>
    )
  }
}

export default DataDownload;
