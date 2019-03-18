import React, { Component } from 'react'
import { Tabs, Menu } from 'antd-mobile';
import styles from './index.less';

const TabsList = [
  {
    show: false,
    title: '试题类型', initData: [
      {
        value: '12',
        label: '综合排序',
      }, {
        value: '2213',
        label: '好评率排序',
      },
      {
        value: '333',
        label: '人气排序',
        isLeaf: true,
      },
      {
        value: '4',
        label: '价格最低',
        isLeaf: true,
      },
      {
        value: '5',
        label: '价格最高',
        isLeaf: true,
      },
    ]
  },
  {
    show: false,
    title: '全部类型', initData: [
      {
        value: '1',
        label: '综合排序',
      }, {
        value: '2',
        label: '好评率排序',
      },
      {
        value: '3',
        label: '人气排序',
        isLeaf: true,
      },
    ]
  },
  { title: '筛选', show: false,},
]

class PublicTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: TabsList
    }
  }

  componentDidMount() {
  }

  onChange = (item,k) => {
    const {  tabs } = this.state;
    console.log(item,k)
    const TabList = tabs;
    TabList[k].show = !TabList[k].show;
    const titleindex = item[0];
    let title = "";
    TabList[k].initData.forEach(element => {
      if (element.value === titleindex) {
        title = element.label;
      }
    })
    TabList[k].title = title;
    this.setState({
      tabs: TabList,
    })
  }

  Tabsclick = (tab, index) => {
    const { tabs } = this.state;
    tabs.forEach((elements,k)=>{
      const element = elements;
      if(k === index){
        element.show = true;
      }else{
        element.show = false;
      }
    })
    this.setState({
      tabs
    })
  }

  Tabchange = (tab, index) => {
    const { tabs } = this.state;
    tabs.forEach((elements,k)=>{
      const element = elements;
      if(k === index){
        element.show = true;
      }else{
        element.show = false;
      }
    })
    this.setState({
      tabs
    })
  }

  render() {
    const {  tabs } = this.state;
    return (
      <div>
        <div className={styles.Mytab}>
          <Tabs tabs={tabs} initialPage={0} animated={true} useOnPan={false} onTabClick={this.Tabsclick} onChange={this.Tabchange}>
            {
              tabs && tabs.map((v, k) =>
                <div key={k} className={styles.tabStyle} style={{ display: v.show ? "block" : "none" }}>
                  <Menu
                    className="single-foo-menu"
                    data={v.initData}
                    defaultValue={['1']}
                    level={1}
                    onChange={(item) => { this.onChange(item,k) }}
                  />
                </div>
              )
            }
          </Tabs>
        </div>
      </div>
    )
  }
}
export default PublicTab;
