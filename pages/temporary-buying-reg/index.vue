<template>
    <view class="container">
        <!-- 临时抗议药品购买页面登记 -->
        <view class="reg-wrapper">
            <view class="poster-wrapper">
                <view class="poster-image">
                    <image :src="IMAGE_BASE_URL + 'undraw_bg.svg'" mode="aspectFill"></image>
                </view>
            </view>
            <view class="button-wrapper">
                <button class="reset-button-style" @tap="handleLogin">购药登记</button>
            </view>
        </view>
        <!-- 临时抗议药品购买页面登记 END -->

        <custom-popup position="center" width="450rpx" height="300rpx" :radius="true" :isShow="isShow">
            <view class="getPhone-wrapper">
                <button open-type="getPhoneNumber" @getphonenumber="handleGetPhone" class="reset-phone-button-style">获取手机号码</button>
            </view>
        </custom-popup>
    </view>
</template>

<script>
import customPopup from '../../components/custom-popup/index';
import customAreaPicker from '../../components/custom-area-picker/index';
import { IMAGE_BASE_URL } from '../../common/config';
import { getUserProfile, getUserPhone } from '../../common/authLogin';
import { Loading, HideLoading, Toast } from '../../common/common';
import { getInfoByEnterprise } from '../../apis/apis';
let app = getApp().globalData;
export default {
    components: {
        customPopup,
        customAreaPicker
    },
    data() {
        return {
            IMAGE_BASE_URL,
            township: null,
            isShow: false
        };
    },
    onLoad: function (options) {
        let { enterpriseId } = options;
        console.log(enterpriseId);
        if (enterpriseId) {
            app.enterpriseId = enterpriseId;
        }
    },
    methods: {
        //前往购药登记
        async handleLogin() {
            // wx.setStorage({
            //   data: '123',
            //   key: 'userId',
            // })
            if (uni.getStorageSync('access_token') && !uni.getStorageSync('userId')) {
                return this.setData({
                    isShow: true
                });
            }
            try {
                if (uni.getStorageSync('access_token') && uni.getStorageSync('userId')) {
                    console.log('goto 1');
                    return uni.navigateTo({
                        url: '/pages/buying-drug-reg/index'
                    });
                    // return this.handleChangePage();
                }
                Loading();
                let {
                    data: { userId }
                } = await getUserProfile();
                console.log('login after');
                await HideLoading();
                if (!userId) {
                    //弹出获取手机号码授权框
                    this.setData({
                        isShow: true
                    });
                } else {
                    // this.handleChangePage()
                    console.log('goto 2');
                    uni.navigateTo({
                        url: '/pages/buying-drug-reg/index'
                    });
                }
            } catch (error) {
                console.log('CatchClause', error);
                console.log('CatchClause', error);
                HideLoading();
            }
        },

        async handleGetPhone(e) {
            try {
                await Loading();
                let {
                    data: { userId }
                } = await getUserPhone(e);
                await HideLoading().then(() => {
                    uni.setStorageSync('userId', userId);

                    // this.handleChangePage().then(() =>{
                    //   this.setData({
                    //     isShow:false
                    //   })
                    // })
                    uni.navigateTo({
                        url: '/pages/buying-drug-reg/index',
                        success: (res) => {
                            this.setData({
                                isShow: false
                            });
                        }
                    });
                });
            } catch (error) {
                console.log('CatchClause', error);
                console.log('CatchClause', error);
            }
        },

        //根据企业ID获取 企业、药店信息
        getInfoByEnterprise() {
            if (app.enterpriseId) {
                getInfoByEnterprise({
                    enterpriseId: app.enterpriseId
                }).then((res) => {
                    let { township, regionCode } = res.data.data;
                    app.regionCode = regionCode;
                    this.setData({
                        township
                    });
                });
            }
        },

        handleChangePage() {
            return new Promise((resolve) => {
                //没有则选择区域信息
                if (!this.township) {
                    uni.navigateTo({
                        url: '/pages/temporary-region-reg/index',
                        success: (res) => {
                            resolve(res);
                        }
                    });
                } else {
                    uni.navigateTo({
                        url: '/pages/buying-drug-reg/index',
                        success: (res) => resolve(res)
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
