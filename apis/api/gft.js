import { myRequest, appCode, version } from "../../common/config";


/**
 *
 * @description 获取签名接口
 * 
 * @param { String } app_id 应用唯一标识（应用开发平台提供）
 * @param { String } interface_id 接口唯一标识（接口平台提供）
 * @param { String } version 版本号(例如:1.0)
 * @param { json }  biz_content 业务参数
 * @param { String } charset 编码格式, 默认UTF-8,不区分大小写
 * @param { String } timestamp 时间戳，毫秒为单位
 * @param { String } origin 访问渠道来源 0：PC；1：APP；2：支付宝；3：微信 
 * 
 */
export const eatesign = (id, timestamp, data = {}) => myRequest.post('https://ganfutong.jiangxi.gov.cn/jpaas-jags-server/interface/createsign.do', {
  app_id: appCode,
  version,
  interface_id: id,
  biz_content: JSON.stringify(data),
  charset: 'UTF-8',
  timestamp,
  origin: '1'
})


/**
 *
 * @description 网关接口 所有请求通过该接口进行转发
 * 
 * @param { String } app_id 应用唯一标识（应用开发平台提供）
 * @param { String } interface_id 接口唯一标识（接口平台提供）
 * @param { String } version 版本号(例如:1.0)
 * @param { json }  biz_content 业务参数
 * @param { String } charset 编码格式, 默认UTF-8,不区分大小写
 * @param { String } timestamp 时间戳，毫秒为单位
 * @param { String } origin 访问渠道来源 0：PC；1：APP；2：支付宝；3：微信 
 * @param { String } sign 签名
 * @param { String } header 头部参数
 * 
 */
export const gateway = (id, timestamp, sign, data = {}, header = {}) => myRequest.post('https://ganfutong.jiangxi.gov.cn/jpaas-jags-server/interface/gateway.do', {
  app_id: appCode,
  version,
  interface_id: id,
  biz_content: JSON.stringify(data),
  charset: 'UTF-8',
  timestamp,
  origin: '1',
  sign,
  header: JSON.stringify(header),
})