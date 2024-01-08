import { eatesign, gateway } from "../apis/api/gft"


// 赣服通对接接口，先获取获取sign后调用他的中转接口
export const gftRequest = async (code, data = {}, header = {}) => {
  const timestamp = new Date().getTime()
  let res = await eatesign(code, timestamp, data)
  const sign = res.data?.data?.sign;
  res = await gateway(code, timestamp, sign, data, header)
  let resData = res?.data
  resData.data = JSON.parse(resData.data)
  return resData
}

export const promiseGftRequest = (code, data = {}, header = {}) => {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().getTime()
    eatesign(code, timestamp, data).then((res) => {
      const sign = res.data?.data?.sign
      gateway(code, timestamp, sign, data, header).then(res => {
        let resData = res?.data
        resData.data = JSON.parse(resData.data)
        resolve(resData)
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
      reject(err)
    })
  })
}