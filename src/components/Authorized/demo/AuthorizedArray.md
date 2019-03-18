---
order: 1
title: 
  zh-CN: 使用数组作为参数
  en-US: Use Array as a parameter
---

Use Array as a parameter

```jsx
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { NoticeBar } from 'antd-mobile';

const Authorized = RenderAuthorized('user');
const noMatch = <NoticeBar mode="closable" icon={<Icon type="check-circle-o" size="xxs" />} >No permission.</NoticeBar>;

ReactDOM.render(
  <Authorized authority={['user', 'admin']} noMatch={noMatch}>
    <NoticeBar mode="closable" icon={<Icon type="check-circle-o" size="xxs" />} />Use Array as a parameter passed!</NoticeBar>
  </Authorized>,
  mountNode,
);
```
