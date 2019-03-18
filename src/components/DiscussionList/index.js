import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import LIKE from '@/publicAssembly/Icons/like.svg';
import LIKEYELLOW from '@/publicAssembly/Icons/likeYellow.svg';
import DELETE from '@/publicAssembly/Icons/delete.svg';

// const DiscussionSender = subscribe({ topic: `@discussion/11056`})(_DiscussionSender);

@connect(({ discussDetail }) => ({
  discussDetail,
}))
class DiscussionList extends PureComponent {

  DeteleDiscussDetail = (ids) => {
    // console.log(detailId,"sfsd")
    const { dispatch } = this.props;
    dispatch({
      type: 'discussDetail/remove',
      payload: [ids],
    });
  };



  render() {
    // const { getFieldProps } = this.props.form;
    const { data, buttons } = this.props;
    return (
      <div>
        {data.map(item => (
          <div className={styles.bigDiscussBox} key={item.Id}>
            <div className={styles.nameBox}>
              <div className={styles.discussName}>{item.UserInfo.RealName}</div>
              <div className={styles.discussTime}>{item.CreateTime}</div>
              {buttons ? buttons.map((button) => (
                <div className={styles.discussLike} key={buttons.Id}>
                  <img
                    alt=""
                    src={button.Id===1?item.Like?LIKEYELLOW:LIKE:DELETE}
                    style={{ width: '21px', height: '21px', marginLeft: '15px' }}
                    onClick={() =>
                      button.handle(item)
                    }
                  />
                </div>
              )) : ''
              }
            </div>
            <div className={styles.dataBox}>
              <div className={styles.triangle} />
              <div className={styles.discussData}>{item.Content}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default DiscussionList;
