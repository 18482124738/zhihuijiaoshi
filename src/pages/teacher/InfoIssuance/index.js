import React, { PureComponent } from 'react';
import { Tabs, Icon, List, Modal, Accordion, SwipeAction } from 'antd-mobile';
import { connect } from 'dva';
import styles from './index.less';
import router from 'umi/router';
import PublicNavBar from '@/publicAssembly/NavBar';
import SearchSelect from '@/publicAssembly/SearchSelect';

import TIMESVG from '@/publicAssembly/Icons/time.svg';
import PLUS from '@/publicAssembly/Icons/plus.svg';
// import COURSEFOLDER from '@/publicAssembly/Icons/courseFolder.png';
import ZILIAOSVG from '@/publicAssembly/Icons/ziliao.svg';
import DOWNFILE from '@/publicAssembly/Icons/downFile.svg';
import SHAIXUAN from '@/publicAssembly/Icons/shaixuan.svg';
import COURSEFOLDER from '@/publicAssembly/Icons/courseFolder.svg';

const tabs = [{ title: '下发资料' }, { title: '下发记录' }];
const Alert = Modal.alert;
const Item = List.Item;
// let Lists = []
@connect(({ coursewareSend, courseInfo, courseCatalog, resourceFile }) => ({
  coursewareSend,
  courseInfo,
  courseCatalog,
  resourceFile
}))
class InfoIssuance extends PureComponent {
  state = {
    Visible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // 获取初始化的列表
    const ua = navigator.userAgent.toLowerCase(); // 获取浏览器的userAgent,并转化为小写——注：userAgent是用户可以修改的
    const isIos = ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1; // 判断是否是苹果手机，是则是true
    // const iswx = ua.indexOf('qqbrowser') >= 0; // 判断是否是苹果手机，是则是true
    if (isIos) {
      document.getElementById('fileId').removeAttribute('capture');
    };
    dispatch({
      type: 'courseCatalog/getUserFileList',
      payload: {
        PageSize: 10,
        PageNumber: 1,
        CourseTermId: localStorage.getItem('CourseTermId')
      }
    })
  }

  // 筛选
  changeVisible = () => {
    const { Visible } = this.state
    const { dispatch } = this.props
    dispatch({ // 获取筛选学期的列表
      type: 'courseInfo/getCourseTerm',
      callback: (value) => {
        value.map(items => {
          const item = items;
          item.title = item.CourseName;
          item.TermList.map(s => { s.IsCheck = false; s.Name = s.TermName; return 0; });
          item.ButtonList = item.TermList;
          return 0;
        })
        // Lists = value;
        this.setState({
          Lists: value,
          Visible: !Visible
        })
      }
    });
  }

  goSpecificDocuments = (id, name) => {
    router.push( '/nolayout/teacher/infoIssuance/specificDocuments',  { folderId: id, folderName: name });
  };

  // 获取学期Id
  getTerm = (value) => {
    const { dispatch } = this.props;
    localStorage.setItem('CourseTermId', value.Id)
    dispatch({
      type: 'courseCatalog/getUserFileList',
      payload: {
        CourseTermId: value.Id
      }
    })
  }

  tabClick = (index) => {
    const { dispatch, location: { state } } = this.props;
    // 获取下发记录
    if (index === 1) {
      dispatch({
        type: 'coursewareSend/history',
        payload: {
          TeachRecordId: state.teachRecordId,
          state: 2,
        }
      });
    }
  }

  /* 上传资料 */
  upperCase = () => {
    const {
      dispatch,
      location: { state },
    } = this.props;
    const file = document.getElementById('fileId');
    const uploadFile = [];
    uploadFile.push(file.files[0]);
    dispatch({
      type: 'coursewareSend/fileUpload',
      payload: {
        TeachRecordId: state.teachRecordId,
        Files: uploadFile,
      },
      callback: () => {
        file.value = '';
        dispatch({
          type: 'courseCatalog/getUserFileList',
          payload: {
            PageSize: 10,
            PageNumber: 1,
            CourseTermId: localStorage.getItem('CourseTermId')
          }
        })
      },
    });
  };

  onChange = () => {
    // console.log(key);
  }

  /* 下发资料 */
  downFile = (items) => {
    const { dispatch, location: { state } } = this.props;
    const item = items
    Alert('是否下发该资料?', '', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          item.State = 2;
          dispatch({
            type: 'coursewareSend/add',
            payload: {
              ResourceFileId: item.ResourceFile.Id,
              TeachRecordId: state.teachRecordId,
              State: 2,
              FilePaths: item.ResourceFile.FilePath,
              FileNames: item.ResourceFile.FileName,
            },
          });
        }
      },
    ]);
  };

  // 删除资料
  delectFile = (Id) => {
    console.log(Id)
    const { dispatch } = this.props;
    Alert('是否删除该资料?', '', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          dispatch({
            type: 'resourceFile/removeFile',
            payload: [Id],
            callback: () => {
              dispatch({
                type: 'courseCatalog/getUserFileList',
                payload: {
                  PageSize: 10,
                  PageNumber: 1,
                  CourseTermId: localStorage.getItem('CourseTermId')
                }
              })
            }
          });
        }
      },
    ]);
  };

  render() {
    const {
      location: { state },
      coursewareSend: { history },
      courseCatalog: { data }
    } = this.props;
    const { Visible, Lists } = this.state;
    return (
      <div className={styles.MYcontent}>
        <PublicNavBar
          NavBarTitle="所有资料"
          NavBarLeft={
            <Icon
              type="left"
              size="lg"
              onClick={() =>
                state
                  ? router.push('/nolayout/teacher/teacherHistorical/singleDetail', {
                    query: state.teachRecordId,
                  })
                  : router.push('/teacher/home')
              }
            />
          }
          NavBarRight={
            state && state.nowState === 3 ? '' : <div>
              <img
                alt=""
                src={SHAIXUAN}
                onClick={this.changeVisible}
                style={{ width: '28px', height: '28px', marginRight: '10px' }}
              />
              <label htmlFor="fileId" style={{ position: 'relative' }}>
                <img
                  alt=""
                  src={PLUS}
                  style={{ width: '28px', height: '28px' }}
                />
              </label>
            </div>
          }
        />
        <Tabs tabs={tabs} swipeable={false} initialPage={0} onChange={(tab, index) => this.tabClick(index)}>
          <div className={styles.tab_0}>
            <input
              onChange={e => this.upperCase(e)}
              style={{ position: 'absolute', zIndex: -100, display: 'none' }}
              id="fileId"
              type="file"
            />
            <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
              {
                data && data.Rows && data.Rows.map((v, index) =>
                  <Accordion.Panel
                    key={index}
                    header={
                      <div style={{ fontSize: 14 }}>
                        <img
                          alt=""
                          src={COURSEFOLDER}
                          style={{ width: '28px', height: '28px' }}
                        /> {v.Name}
                      </div>
                    }
                  >
                    <List>
                      {
                        v.CourseTasks && v.CourseTasks.map((item, k) => (
                          <SwipeAction
                            key={k}
                            style={{ backgroundColor: 'gray' }}
                            autoClose
                            right={[
                              {
                                text: '删除',
                                onPress: () => this.delectFile(item.ResourceFile.Id),
                                style: { backgroundColor: '#F4333C', color: 'white' },
                              },
                            ]}
                          >
                            <List.Item

                              multipleLine
                              wrap
                              style={{ display: item.ResourceFile ? 'block' : 'none', fontSize: 12 }}
                              extra={
                                state && state.nowState === 3 ?
                                  ''
                                  :
                                  <span style={{ color: '#108ee9' }}>
                                    <img
                                      alt=""
                                      onClick={() => this.downFile(item)}
                                      src={DOWNFILE}
                                      style={{ width: '25px', height: '25px', marginRight: '10px' }}
                                    />
                                  </span>

                              }
                            >
                              <img
                                alt=""
                                src={ZILIAOSVG}
                                style={{ width: '25px', height: '25px', marginRight: '10px' }}
                              />
                              <span style={{ fontSize: 14 }}>{item.ResourceFile && item.ResourceFile.Name || '未命名'}</span>
                              <span style={{ color: '#108ee9', marginLeft: 10, fontSize: 12 }}>  {item.State === 1 ? '已下发' : '未下发'}</span>
                            </List.Item>
                          </SwipeAction>

                        ))
                      }
                    </List>
                  </Accordion.Panel>
                )
              }

            </Accordion>
          </div>
          <div className={styles.tab_2}>
            <div>
              <List className="my-list">
                {
                  history && history.Rows && history.Rows.map((item, k) => (
                    <Item
                      style={{ display: item.State === 2 ? 'block' : 'none' }}
                      key={k}
                      wrap
                      extra={<span style={{fontSize:13}}>{item.CreateTime} </span>}
                      multipleLine
                    >
                      <img alt="" src={TIMESVG} style={{ width: "25px", height: "25px", marginRight: "10px" }} />
                      <span style={{fontSize:13}}>{item.FileNames} </span>
                    </Item>
                  ))
                }
              </List>
            </div>
          </div>
        </Tabs>
        <SearchSelect onChangeFun={this.getTerm} Type="Single" Lists={Lists} Visible={Visible} changeVisible={this.changeVisible} />

      </div>
    );
  }
}

export default InfoIssuance;
