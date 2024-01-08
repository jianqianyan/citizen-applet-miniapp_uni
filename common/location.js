import * as util from '../common/common';
const QQMapWX = require('../utils/qqmap-wx-jssdk.min.js');
/**
 * @description 用户定位信息获取
 * @param { Function } cb 逻辑执行成功回调
 * @param { Function } reject  逻辑执行失败回调
 * @returns
 */
export default async function location (cb = () => { }, reject = () => { }) {
  /**
   * 获取用户设备定位开启状态,以及所处环境进行不同逻辑执行
   *
   */

  //开发环境测试
  return getUserCurlatAndlng().then((res) => {
    cb(res);
  })

  //根据逆地址解析获取当前用户经纬度信息 以及所在市区
  function getUserCurlatAndlng () {
    return new Promise((resolve) => {
      uni.getLocation({
        isHighAccuracy: true,
        type: 'gcj02',
        success: (res) => {
          const qqmapsdk = new QQMapWX({
            key: getApp().globalData.key
          });
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success (res) {
              resolve(res);
            },
            fail (err) {
              console.log(err)
            }
          });
        },
        fail: (err) => {
          console.log(err)
        }
      });
    });
  }
}
