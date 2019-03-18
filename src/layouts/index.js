import React, { Component } from 'react'
import BaseLayout from './baseLayout';

const ULR_NO_LAYOUT = ['/', '/home', '/class', '/my','/news',"/student/course","/student/classification","/student/course/classSchedule","/teacher/issued",'/student/test'];

class Index extends Component {
  componentDidMount() {
  }
  
  renderBody = () => {
    const {location: {pathname}, children } = this.props;
    if (ULR_NO_LAYOUT.includes(pathname)) {
      return  (<BaseLayout {...this.props} />);
    }
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderBody()}
      </React.Fragment>
    )
  }
}

export default Index;
