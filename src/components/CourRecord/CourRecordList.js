import React, { Component } from 'react'
import { ListView } from 'antd-mobile';
// import styles from './CourRecordList.less'
import { connect } from 'dva';
import WxImageViewer from 'react-wx-images-viewer';
import ServerHost from '../../../config/server.config';

let pageIndex = 0;
const PAGE_SIZE = 10;

@connect(({ courRecord, loading }) => ({
  courRecord: courRecord.data,
  courRecordLoading: loading.effects['courRecord/fetch'],
}))
class CourRecordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: document.documentElement.clientHeight * 3 / 4,
      hasMore: true,
      index: 0,
      isOpen: false,
    };
  }

  componentDidMount() {
    const { dispatch, TeachRecord } = this.props;
    dispatch({
      type: 'courRecord/fetch',
      payload: { pageSize: PAGE_SIZE, pageNumber: pageIndex, TeachRecordId: TeachRecord.Id }
    });

  }

  onEndReached = (event) => {
    const { courRecordLoading } = this.props;
    const { hasMore } = this.state;
    if (courRecordLoading && !hasMore) {
      return;
    }
    const { dispatch, } = this.props;
    pageIndex += 1;
    dispatch({
      type: 'courRecord/fetch',
      payload: { pageSize: PAGE_SIZE, pageNumber: pageIndex }
    });

  }

  onClose = () => {
    this.setState({
      isOpen: false
    })
  }

  openViewer = (index) => {
    const num = parseInt(index)
    this.setState({
      index: num,
      isOpen: true
    })
  }

  render() {
    const { courRecord: { Rows }, courRecordLoading } = this.props;
    const { height, index, isOpen } = this.state;
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    const newDataSource = dataSource.cloneWithRows(Rows);
    const imags = [];
    if (Rows) {
      Rows.forEach(elements => {
        const element = elements;
        imags.push(`${ServerHost.OnlineEducationServer}/${element.ImagePath}`)
      })
    }
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
            }}
          >
            {rowData.StudentName}
          </div>
          <div style={{ display: 'flex', padding: '15px 0' }}>
            <img onClick={() => this.openViewer(rowID)} style={{ height: '64px', marginRight: '15px' }} src={`${ServerHost.OnlineEducationServer}/${rowData.ImagePath}`} alt="" />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.Context}</div>
              {/* <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div> */}
            </div>
            {
              isOpen ? <WxImageViewer onClose={this.onClose} urls={imags} index={index} /> : ""
            }
          </div>
        </div>
      );
    };
    return (
      <ListView
        ref={el => { this.lv = el }}
        dataSource={newDataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>{courRecordLoading ? 'Loading...' : 'Loaded'}</div>)}
        // renderSectionHeader={sectionData => (
        //   <div>{`Task ${sectionData.split(' ')[1]}`}</div>
        // )}
        renderRow={row}
        renderSeparator={separator}
        style={{
          height: height,
          overflow: 'auto',
        }}
        pageSize={PAGE_SIZE}
        // onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        // onEndReached={this.onEndReached}
        onEndReachedThreshold={2}
      />
    )
  }
}

export default CourRecordList;
