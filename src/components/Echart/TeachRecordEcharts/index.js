import React, { PureComponent } from 'react';
import { Card, Icon, WhiteSpace } from 'antd-mobile';
import router from 'umi/router';
// import styles from './index.less';
import EMPTYSTAR from '@/publicAssembly/Icons/emptyStar.png';
import FILLSTAR from '@/publicAssembly/Icons/fillStar.png';
import teacherAssessment from '@/utils/teacherEchart';

class TeachRecordEcharts extends PureComponent {
  componentDidMount() {
    const { item } = this.props;
    if (item) {
      const scores = [];
      scores.push(
        item.AttendanceScore || 0,
        item.Active || 0,
        item.PracticeScore || 0,
        item.DiscussScore || 0,
        item.FilesScore || 0
      );
      teacherAssessment(scores, this[`teacherChart${item.Id}`]);
    }
  }

  LinkToSingleDetail = () => {
    const { isTeacher, item } = this.props;
    if (isTeacher) {
      router.push('/nolayout/teacher/teacherHistorical/singleDetail', { query: item.Id });
    } else {
      router.push('/nolayout/student/studentHistorical/singleDetail', {
        Id: item.Id,
        TeachRecordId: item.TeachRecordId,
        back: 1, // 返回：1代表学生，2代表教师
      });
    }
  };

  render() {
    const { item } = this.props;
    let nowState = '';
    if (item.Nowstate) {
      switch (item.Nowstate) {
        case 1:
          nowState = '未开始';
          break;
        case 2:
          nowState = '正在上课';
          break;
        default:
          nowState = '已结束';
          break;
      }
    } else if (item.TeachRecord && item.TeachRecord.Nowstate) {
      switch (item.TeachRecord.Nowstate) {
        case 1:
          nowState = '未开始';
          break;
        case 2:
          nowState = '正在上课';
          break;
        default:
          nowState = '已结束';
          break;
      }
    }
    let courseName = '--';
    if (item.CourseName) {
      courseName = item.CourseName;
    } else if (item.TeachRecord && item.TeachRecord.CourseName) {
      courseName = item.TeachRecord.CourseName;
    }
    let classRoomName = '--';
    if (item.ClassRoomName) {
      classRoomName = item.ClassRoomName;
    } else if (item.TeachRecord && item.TeachRecord.ClassRoomName) {
      classRoomName = item.TeachRecord.ClassRoomName;
    }
    return (
      <div>
        <Card>
          <Card.Header
            title={courseName}
            extra={
              <span style={{ color: 'blue' }} onClick={this.LinkToSingleDetail}>
                <Icon type="right" />
              </span>
            }
          />
          <Card.Body>
            <div style={{ height: 22 }}>
              <span style={{ float: 'left' }}>
                {item.CreateTime ? item.CreateTime.slice(0, 16) : '--'}
              </span>
              <span style={{ float: 'right' }}>{classRoomName}</span>
            </div>
            <div
              ref={e => {
                this[`teacherChart${item.Id}`] = e;
              }}
              style={{ width: '100%', height: '185%' }}
            />
          </Card.Body>
          <Card.Footer
            content={nowState}
            extra={
              <div>
                {[0, 1, 2, 3, 4].map(temp => {
                  let img = EMPTYSTAR;
                  if (item.Star && temp < item.Star) {
                    img = FILLSTAR;
                  }
                  return <img alt="星级" src={img} style={{ width: 20, height: 20 }} key={temp} />;
                })}
              </div>
            }
          />
        </Card>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

export default TeachRecordEcharts;
