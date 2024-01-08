import MyRequest from '../utils/request';
let BASE_URL = '';
const IMAGE_BASE_URL = '/static/images/';
const IMAGE_URL = 'https://zhjg.mpa.jiangxi.gov.cn'
const myRequest = new MyRequest();
// 请求拦截器
myRequest.interceptors.request((req) => {
  // 拦截需要token的接口
  if (req.isAuth) {
    req.data['access_token'] = uni.getStorageSync('access_token') || '';
  }
  return req;
});

// 响应拦截器
myRequest.interceptors.response((res) => {
  // if( res.statusCode !== 200 ){
  //   util.Toast({
  //     title:'请求失败'
  //   })
  // }
  // if( res.statusCode === 401 ) {
  //   util.Toast({
  //     title:'登录过期，请重新登录'
  //   }).then(()=>{
  //     wx.removeStorageSync('access_token');
  //   })
  // }

  return res;
});

// 设置默认配置
myRequest.setConfig((config) => {
  //请求地址
  // config.baseURL = 'http://192.168.3.79:6062';
  // config.baseURL = 'http://192.168.3.200:9600';
  // config.baseURL = 'http://192.168.3.238:6062';
  // config.baseURL = 'http://192.168.3.141:6062';
  // config.baseURL = 'http://106.225.151.90:9511'//'https://zhjg.mpa.jiangxi.gov.cn';
  // config.baseURL = 'https://www.xxscjgj.top/xxapi';
  config.baseURL = 'https://zhjg.mpa.jiangxi.gov.cn';
  BASE_URL = config.baseURL;
  return config;
});

const cryptoKey = 'gOuWYBjME1cVtc5S'

export const abilityCode = '0272a09bed4140f2844579aacf01ef4f'

// 扫码应用code
export const scanAbilityCode = '64e2d1fcaf9840a996304cfa2aedb8be'
// 统一评价应用code
export const evaluateAbilityCode = '0272a09bed4140f2844579aacf01ef4f'

export const userAbilityCode = 'b6840fdacae2486ab864cae98031e2e6'

export const organCode = '3e84a8f181784c78abaf8e2d44d0dc2a'
export const appCode = 'zhydwvcfw'
export const appName = '智慧药店'
export const regionCode = '360000'
export const regionName = '江西省'
export const version = '1.0'

// 是否为赣服通环境
export const isGFT = false

// 是否需要登录
export const needLogin = false

export { myRequest, IMAGE_BASE_URL, BASE_URL, cryptoKey, IMAGE_URL };
