import React, { Component } from 'react'
import { connect } from 'dva';
import { SearchBar, Modal, Menu, Toast,Icon} from 'antd-mobile';
import router from 'umi/router';
import styles from './index.less';

class newsPages extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className='search_cart'>
      ....
      <Icon type="search" size="lg" />
      <Icon type="ellipsis" size="lg"  />
      <Icon type="down" />
      <Icon type="exclamation" />
      <Icon type="left" />
      <Icon type="question-circle" />
      </div>
    )
  }
}


export default newsPages;
