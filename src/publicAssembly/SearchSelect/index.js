import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace, Modal, Button } from 'antd-mobile';
import styles from './index.less';

// Type='Single' 单选 Type='Multiple' 多选
class SearchSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }



  componentDidMount() {
  }

  componentWillReceiveProps(nextProp) {
    const that = this;
    that.setState({
      List: nextProp.Lists,
    })
  }


  FilterFun = (elements) => {
    const element = elements
    return element.IsCheck === true
  }

  // Type=1单选
  SingleFun = (items) => {
    const { List } = this.state;
    const { onChangeFun } = this.props;
    const lists = List;
    const item = items;
    lists.map(element => {
      element.ButtonList.map(s => {
        const v = s;
        v.IsCheck = false;
        return 0;
      })
      return 0;
    })
    item.IsCheck = !item.IsCheck;
    onChangeFun(items)
    this.setState({
      List: lists,
    })
  }

  // Type=2 多选
  MultipleFun = (items) => {
    const { List } = this.state;
    const { onChangeFun } = this.props;
    const lists = List;
    const item = items;
    const CheckLists = [];
    item.IsCheck = !item.IsCheck;
    lists.map(element => {
      if (element.ButtonList.filter(this.FilterFun).length !== 0) { // 不是空就push
        CheckLists.push([...element.ButtonList.filter(this.FilterFun)])
      }
      return 0;
    })
    onChangeFun(CheckLists)
    this.setState({
      List: lists,
    })

  }


  render() {
    const { List } = this.state;
    const { Visible, changeVisible, Type } = this.props;
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <Modal
          popup
          // transparent={true}
          style={{ position: 'absolute', maxHeight: '70%', overflow: 'scroll' }}
          visible={Visible}
          onClose={() => changeVisible()}
          animationType="slide-up"
        // afterClose={() => { alert('afterClose'); }}
        >
          {
            List && List.map((v) =>
              <div key={v.title}>
                <Card full={true} >
                  {/* <Card.Header
                    title={v.title}
                  /> */}
                  <Card.Body>
                    <div style={{ textAlign: 'left', fontSize: 12, color: '#888787', letterSpacing: 2 }}>{v.title}</div>
                    <div className={styles.CardBtnBox}>
                      {
                        v.ButtonList && v.ButtonList.map((item) =>
                          <div onClick={() => Type === 'Single' ? this.SingleFun(item) : this.MultipleFun(item)} key={item.Id} className={item.IsCheck ? styles.CardBtn1 : styles.CardBtn}>
                            {item.Name}
                          </div>
                        )
                      }
                    </div>
                  </Card.Body>
                </Card>
                {/* <p /> */}
              </div>
            )
          }
          <p />
          <Button style={{ height: 30 }} onClick={() => changeVisible()} type="primary" size="small">确定</Button>
          <p />

        </Modal>

        <WhiteSpace size="lg" />
      </WingBlank>
    )
  }
}
export default SearchSelect;
