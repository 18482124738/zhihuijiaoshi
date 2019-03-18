import React, { Component } from 'react'
import { connect } from 'dva';
import { Flex, WhiteSpace } from 'antd-mobile';
import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';
import router from 'umi/router';
import styles from './index.less';

// @connect(({ my }) => ({ my }))



const data = [
  {
    value: '1',
    label: 'Food',
    children: [
      {
        label: 'All Foods',
        value: '1',
        disabled: false,
      },
      {
        label: 'Chinese Food',
        value: '2',
      }, {
        label: 'Hot Pot',
        value: '3',
      }, {
        label: 'Buffet',
        value: '4',
      }, {
        label: 'Fast Food',
        value: '5',
      }, {
        label: 'Snack',
        value: '6',
      }, {
        label: 'Bread',
        value: '7',
      }, {
        label: 'Fruit',
        value: '8',
      }, {
        label: 'Noodle',
        value: '9',
      }, {
        label: 'Leisure Food',
        value: '10',
      }],
  }, {
    value: '2',
    label: 'Super',
    children: [
      {
        label: 'All Supermarkets',
        value: '1',
      }, {
        label: 'Supermarket',
        value: '2',
        disabled: true,
      }, {
        label: 'C-Store',
        value: '3',
      }, {
        label: 'Personal Care',
        value: '4',
      }],
  },
  {
    value: '3',
    label: 'Extra',
    isLeaf: true,
    children: [
      {
        label: 'you can not see',
        value: '1',
      },
    ],
  },
];

class Classification extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initData: data,
      show: true,
    };
  }
  onChange = (value) => {
    let label = '';
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        if (dataItem.children && value[1]) {
          dataItem.children.forEach((cItem) => {
            if (cItem.value === value[1]) {
              label += ` ${cItem.label}`;
            }
          });
        }
      }
    });
    console.log(label);
  }

  onMaskClick = () => {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <div>
        <Flex>
          <Flex.Item className={styles.Classificationleft} style={{ flex: 1 }}>
            <div>
              <Flex direction="column">
                <Flex.Item className={styles.ClassificationleftItem} >IT·互联网
              </Flex.Item>
                <Flex.Item className={styles.ClassificationleftItem} >设计·创作
              </Flex.Item>
                <Flex.Item className={styles.ClassificationleftItem} >设计·创作
              </Flex.Item>
                <Flex.Item className={styles.ClassificationleftItem} >设计·创作
              </Flex.Item>
                <Flex.Item className={styles.ClassificationleftItem} >设计·创作
              </Flex.Item>
              </Flex>
            </div>
          </Flex.Item>
          <Flex.Item className={styles.ClassificationRight} style={{ flex: 3 }}>
              <div>
                 <div>
                   互联网产品
                 </div>
                 <div>
                   互联网产品
                 </div>
              </div>
            {/* <Flex >
              <Flex.Item Item>设计·创作
              </Flex.Item>
              <Flex.Item >设计·创作
              </Flex.Item>
              <Flex.Item >设计·创作
              </Flex.Item>
            </Flex> */}

          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
export default Classification;
