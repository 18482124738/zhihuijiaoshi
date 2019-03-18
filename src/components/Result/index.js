import { Result, Icon, WhiteSpace } from 'antd-mobile';
const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
export function ResultSuccess  () {
  return (
    <Result
      img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
      title="支付成功"
      message={<div>998.00元 <del>1098元</del></div>}
    />
  )
}

export function ResultFail ()  {
  return (
    <Result
    img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#F13642' }} />}
    title="支付失败"
    message="所选银行卡余额不足"
  />
  )
}
export function Waitforprocessing(){
  return (
    <Result
    img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
    title="等待处理"
    message="已提交申请，等待银行处理"
  />
  )
}
export function VerifySuccess(){
  return (
    <Result
    img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
    title="验证成功"
    message="所提交内容已成功完成验证"
  />
  )
}
export function OperationFailed(){
  return (
    <Result
    img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
    title="验证成功"
    message="所提交内容已成功完成验证"
  />
  )
}
