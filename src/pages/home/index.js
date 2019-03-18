import React, { Component } from 'react';
import { connect } from 'dva';
import { getRole } from '@/utils/authority';
import router from 'umi/router';


@connect(({ home }) => ({ home }))
class Home extends Component {
  componentDidMount() {
    const role = getRole();
    if (role === "2") {
      router.push('/teacher/home');
    } else {
      router.push('/student/home');
    }
  }

  render() {
    return (
      <div />
    )
  }
}


export default Home;
