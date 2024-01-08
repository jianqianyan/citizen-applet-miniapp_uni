<template>
  <view class="drug-ascend-wrapper">
    <!-- 背景占位 -->
    <view class="profile-cotent-wrapper">
      <view class="profile-info shadow-wrapper">
        <view class="scancode">
          <view class="profile-title">追溯码</view>
          <text class="iconfont icon-saoma" @tap.stop.prevent="handleScanCodeOftcCode"></text>
        </view>
        <view class="scancode-input-wrapper">
          <input type="text" placeholder="请输入追溯码或扫一扫药品上的追溯码" v-model="tcCode" />
        </view>
        <view class="button-wrapper" @tap="handleSearch">
          <!-- <button size="mini">提交</button> -->
          <view>提交</view>
        </view>
      </view>
      <view class="profile-info shadow-wrapper">
        <view class="scancode">
          <view class="profile-title">商品码</view>
          <text class="iconfont icon-saoma" @tap.stop.prevent="handleScancodeByCommodityCode"></text>
        </view>
        <view class="scancode-input-wrapper">
          <input type="text" placeholder="请输入商品码或扫一扫药品上的商品码" v-model="commodityCode" />
        </view>
        <view class="scancode-input-wrapper">
          <input type="text" placeholder="请输入生产批号信息" v-model="batch" />
        </view>
        <view class="button-wrapper" @tap="getProInfoByCommodityCode">
          <!-- <button size="mini">提交</button> -->
          <view>提交</view>
        </view>
      </view>
    </view>
    <MyFooter></MyFooter>
  </view>
</template>

<script>
  // pages/drug-ascend/index.js
  import * as util from '../../common/common';
  import Api from "../../apis/apis"
  import Schema from '../../utils/validator';
  import MyFooter from "../../components/MyFooter/fixedIndex.vue"
  import { organCode, scanAbilityCode } from "../../common/config"
  export default {
    components: {
      MyFooter
    },
    data () {
      return {
        //追溯码
        tcCode: '',
        //商品码
        commodityCode: '',
        //生产批号
        batch: '',
        //追溯码追溯详情
        dtcProfile: {},
        //商品码追溯详情
        commodityProfile: {},
        // 校验规则
        commonRules: {
          commodityCode: [
            {
              required: true,
              message: '商品码不能为空'
            }
          ],
          batch: [
            {
              required: true,
              message: '生产批号不能为空'
            }
          ]
        },
        // 校验规则
        tcCodeRules: {
          tcCode: [
            {
              required: true,
              message: '追溯码不能为空'
            }
          ]
        }
      };
    },
    methods: {
      //扫追溯码获取药品追溯详情
      handleScanCodeOftcCode () {
        // 原微信逻辑
        // uni.scanCode({
        //   success: (res) => {
        //     this.setData(
        //       {
        //         tcCode: res.result
        //       },
        //       () => {
        //         this.getProInfoByDtc();
        //       }
        //     );
        //   },
        //   fail: (err) => {
        //     util.Toast({
        //       title: '扫码失败'
        //     });
        //   }
        // });
        hw.scan({
          abilityCode: scanAbilityCode,
          organCode,
          success: res => {
            this.setData({
              tcCode: res.data
            }, () => {
              this.getProInfoByDtc()
            })
          },
          fail: err => {
            util.Toast({
              title: '扫码失败'
            });
          }
        })
      },

      //扫商品码获取药品追溯详情
      handleScancodeByCommodityCode () {
        // 原微信逻辑
        // uni.scanCode({
        //   scanType: ['barCode'],
        //   success: (res) => {
        //     this.setData({
        //       commodityCode: res.result
        //     });
        //   },
        //   fail: (err) => {
        //     util.Toast({
        //       title: '扫码失败'
        //     });
        //   }
        // });
        hw.scan({
          abilityCode: scanAbilityCode,
          organCode,
          success: res => {
            this.setData({
              commodityCode: res.data
            });
          },
          fail: err => {
            util.Toast({
              title: '扫码失败'
            });
          }
        })
      },

      handleSearch () {
        this.getProInfoByDtc();
      },

      //根据追溯码获取药品追溯详情
      getProInfoByDtc () {
        let { tcCodeRules } = this;
        const validator = new Schema(tcCodeRules);
        validator.validate(this, (errors) => {
          if (errors) {
            return util.Toast({
              title: errors[0]
            });
          } else {
            let { tcCode } = this;
            if (tcCode) {
              util.Loading({
                title: '查询中'
              });
            }
            if (tcCode) {
              Api.getProInfoByDtc({
                tcCode
              })
                .then((res) => {
                  util.HideLoading();
                  let { data: dtcProfile, code } = res.data;
                  if (code !== 200) {
                    return util.Toast({
                      title: '追溯码详情获取失败'
                    });
                  }
                  if (!dtcProfile) {
                    return util.Toast({
                      title: '未查询到该药品的追溯信息'
                    });
                  }
                  this.setData(
                    {
                      dtcProfile
                    },
                    () => {
                      let target = encodeURIComponent(JSON.stringify(dtcProfile));
                      uni.navigateTo({
                        url: `/pages/drug-ascend-detail/index?dtcProfile=${target}`
                      });
                    }
                  );
                })
                .catch((err) => {
                  util.Toast({
                    title: '请求超时'
                  });
                })
                .finally(() => {
                  // util.HideLoading()
                });
            }
          }
        });
      },

      //根据商品码获取药品追溯详情
      getProInfoByCommodityCode () {
        let { commonRules } = this;
        const validator = new Schema(commonRules);
        validator.validate(this, (errors) => {
          if (errors) {
            return util.Toast({
              title: errors[0]
            });
          } else {
            let { commodityCode, batch } = this;
            if (commodityCode) {
              util.Loading({
                title: '查询中'
              });
            }
            Api.getProInfoByCommodityCode({
              commodityCode,
              batch
            })
              .then((res) => {
                util.HideLoading();
                let { data: commodityProfile, code } = res.data;
                if (code !== 200) {
                  return util.Toast({
                    title: '商品码详情获取失败'
                  });
                }
                this.setData(
                  {
                    commodityProfile
                  },
                  () => {
                    let target = encodeURIComponent(JSON.stringify(commodityProfile));
                    uni.navigateTo({
                      url: `/pages/drug-goods-ascend-detail/index?commodityProfile=${target}`
                    });
                  }
                );
              })
              .catch((err) => {
                util.Toast({
                  title: '请求超时'
                });
              });
          }
        });
      }
    }
  };
</script>
<style>
@import './index.css';
</style>
