import React, { PureComponent } from 'react';
import { NavBar, Button, Card, Tabs, Modal, Icon, List } from 'antd-mobile';
import { connect } from 'dva';
import styles from './index.less';
import router from 'umi/router';
import PublicNavBar from '@/publicAssembly/NavBar';

import ZILIAOSVG from '@/publicAssembly/Icons/ziliao.svg';
import DOWNLOAD from '@/publicAssembly/Icons/download.svg';
import XIAFA from '@/publicAssembly/Icons/xiafa.svg';
import PLUS from '@/publicAssembly/Icons/plus.svg';

const Item = List.Item;
@connect(({ resourceFile, resourceFolder, loading }) => ({
  CourseFile: resourceFile.data,
  CourseFolder: resourceFolder.data,
  courseTeacherLoading: loading.effects['resourceFild/fetch'],
}))
class SpecificDocuments extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch, location: { state } } = this.props;
    dispatch({
      type: 'resourceFile/fetch',
      payload: {
        CourseInfoId: "",
        ResourceFolderId: state.folderId,
      }
    })
  }

  // 返回文件夹
  goInfoIssuance=() =>{
    router.push({
      pathname: '/teacher/infoIssuance'
    })
  }



  render() {
    const {  CourseFile, location: { state } } = this.props;
    return (
      <div className={styles.MYcontent}>
        <PublicNavBar
          NavBarTitle={state.folderName}
          NavBarLeft={<Icon type="left" size={'lg'} onClick={this.goInfoIssuance} />}
          NavBarRight={<img alt="" src={PLUS} style={{ width: "28px", height: "28px", marginRight: "10px" }} />} />

        <div className={styles.tab_0}>
          {
            CourseFile.Rows.map((item) => {
              return (
                <List className="my-list">
                  <Item multipleLine extra={<img alt="" src={XIAFA} style={{ width: "25px", height: "25px", marginRight: "10px" }} />}>
                    <img alt="" src={ZILIAOSVG} style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                    {item.Name}
                  </Item>
                </List>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default SpecificDocuments;
