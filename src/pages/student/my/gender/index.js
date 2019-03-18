import React, { Component } from 'react'
import { NavBar, Button, Card, Tabs, Modal, List, WhiteSpace, WingBlank, Radio, Flex } from 'antd-mobile';
import { Icon, Input } from 'antd';
import router from 'umi/router';
import styles from './index.less';


const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;

class gender extends React.Component {
  state = {
    disabled: false,
    value: 0,
  }
  //返回学生个人信息
  goPersonalInformation = ()=>{
    router.push({
      pathname:"/student/my/personalInformation"
    })
  }
  //*********性别修改 *********/
  onChange = (value) => {
    this.setState({
      value,
    });
  };
  onChange2 = (value) => {
    this.setState({
      value2: value,
    });
  };
  /**************************/

  render() {
    const { value } = this.state;
    const data = [
      { value: 0, label: '男' },
      { value: 1, label: '女' },
    ];

    return (
      <div className={styles.box_actualName}>
        <div className={styles.head}>
          <Icon type="left" className={styles.head_icon} onClick={this.goPersonalInformation} />
          修改性别
        </div>
        <div className={styles.neck}>
          选择你的性别：
        </div>
        <List>
          {data.map(i => (
            <RadioItem key={i.value} checked={value === i.value} onChange={() => this.onChange(i.value)}>
              {i.label}
            </RadioItem>
          ))}
        </List>
        <WhiteSpace size="lg" />
          <Button style={{ margin: "0 15px 0 15px", height: "35px", lineHeight: "35px" }} type="primary">保存</Button>
      </div>
    );
  }
}
export default gender;
