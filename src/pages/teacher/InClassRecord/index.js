import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PublicNavBar from '@/publicAssembly/NavBar';
import styles from './index.less';
import {
  Icon,
  WingBlank,
  ImagePicker,
  Badge,
  InputItem,
  List,
  TextareaItem,
  Button,
  WhiteSpace,
  Tabs,
} from 'antd-mobile';
import router from 'umi/router';
import { createForm } from 'rc-form';
import CourRecordList from '@/components/CourRecord/CourRecordList';

const tabs = [{ title: '新增' }, { title: '随堂记录' }];

@connect(({ courRecord, loading }) => ({
  courRecord: courRecord.data,
  courseTeacherLoading: loading.effects['courseInfo/fetch'],
}))
class InClassRecord extends PureComponent {
  state = {
    files: [],
    // multiple: false,
  };

  componentDidMount() {

  }



  onChange = (files) => {
    // console.log(files, type, index);
    this.setState({
      files,
    });
  };

  TextareaItem = () => { };

  TextareaItemBlur = () => { };

  canvasDataURL = (path, callback) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      const that = this;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      // quality值越小，所绘制出的图像越模糊
      const base64 = canvas.toDataURL('image/jpeg', 0.5);// 压缩一半
      that.convertBlob(base64, callback)
    }
  }

  convertBlob = (dataurl, callback, filename = 'file') => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const suffix = mime.split('/')[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    const blob = new File([u8arr], `${filename}.${suffix}`, { type: mime })
    callback(blob);
  }

  Submit = () => {
    const { dispatch, form, location } = this.props;
    const { files } = this.state;
    const that = this;
    files.map(item => {
      that.canvasDataURL(item.url, (value) => {
        dispatch({
          type: 'courRecord/fileUpload',
          payload: {
            ...form.getFieldsValue(),
            TeachRecordId: location.state.query.Id,
            Files: [value],
          },
          callBack: () => {
            that.setState({
              currentPage: 1,
            });
          },
        });
      })
      return item;
    });

  };

  render() {
    const { files, currentPage } = this.state;
    const {
      form: { getFieldProps },
      location,
    } = this.props;
    return (
      <div>
        <PublicNavBar
          NavBarTitle="课堂记录"
          NavBarLeft={
            <Icon
              type="left"
              size="lg"
              onClick={() => router.push({ pathname: '/teacher/home' })}
            />
          }
        />
        <Tabs
          tabs={tabs}
          initialPage={0}
          page={currentPage}
        // onChange={(tab, index) => { console.log('onChange', index, tab); }}
        // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <WingBlank>
            <Badge
              text="图片"
              style={{
                margin: '10px 0 0 12px',
                padding: '1px 3px',
                backgroundColor: 'rgb(16, 142, 233)',
                borderRadius: 2,
                fontSize: 13,
                height: 22,
                width: 50,
                lineHeight: '22px',
              }}
            />
            <ImagePicker
              files={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 7}
              multiple={1}
            />
            <WhiteSpace />
            <Badge
              text="学号"
              style={{
                margin: '10px 0 0 12px',
                padding: '1px 3px',
                backgroundColor: 'rgb(16, 142, 233)',
                borderRadius: 2,
                fontSize: 13,
                height: 22,
                minWidth: 50,
                lineHeight: '22px',
              }}
            />
            <List style={{ margin: '10px 0 ' }}>
              <InputItem
                {...getFieldProps('StudentName')}
                placeholder="请输入学生姓名"
                data-seed="logId"
              />
            </List>
            <WhiteSpace />
            <Badge
              text="描述"
              style={{
                margin: '10px 0 10px 12px',
                padding: '1px 3px',
                backgroundColor: 'rgb(16, 142, 233)',
                borderRadius: 2,
                fontSize: 13,
                height: 22,
                minWidth: 50,
                lineHeight: '22px',
              }}
            />
            <List>
              <TextareaItem
                {...getFieldProps('Context')}
                rows={5}
                placeholder="请描述..."
                count={300}
              />
            </List>
            <WhiteSpace />
            {/* <Button className={styles.addBindBtn}>提交</Button> */}
            <Button type="primary" onClick={this.Submit}>
              提交
            </Button>
          </WingBlank>
          <div>
            <CourRecordList TeachRecord={location.state.query} />
          </div>
        </Tabs>
      </div>
    );
  }
}

export default createForm()(InClassRecord);
