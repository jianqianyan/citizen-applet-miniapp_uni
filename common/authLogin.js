import { cryptoKey } from './config';
import { decrypt } from "../utils/crypto"
import * as Tip from '../common/common';
import { userAbilityCode, organCode } from "../common/config"
import { desensitization } from "../common/desensitization"
import Api from '../apis/apis'
import { isGFT } from './config';

/**
 * @description
 * 登录机制: 调用微信接口获取用户信息，请求后台接口 判断userId;
 * 为空时未注册走注册流程
 * 有值时直接登录
 */

/**
 * @description 获取用户信息
 * @returns { promise }
 */
function getUserProfile () {
  return new Promise((resolve, reject) => {
    if (isGFT) {
      hw.getUserByTicketAES({
        abilityCode: userAbilityCode,
        organCode: organCode,
        success: async (res) => {
          try {
            // 成功的回调（返回加密用户信息）
            let userdetail = decrypt(res.userdetail, cryptoKey)
            userdetail = JSON.parse(userdetail)
            let userId = res.uuid
            uni.setStorageSync('nickName', desensitization(userdetail.name, 'name'));
            uni.setStorageSync('avatarUrl', userdetail.headportraitpath);
            uni.setStorageSync('mobile', desensitization(userdetail.mobile, 'phone'))
            let loginRes = await Api.Login(userId)
            let data = JSON.parse(loginRes.data.data)
            uni.setStorageSync('access_token', data.access_token);
            uni.setStorageSync('userId', data.userId);
            resolve();
          } catch (err) {
            Tip.Toast({
              title: JSON.stringify(err)
            });
            reject(err);
          }
        },
        fail: (err) => {
          Tip.Toast({
            title: err.msg
          });
          reject(err);
        }
      })
    }
  });
}

export { getUserProfile };
