<template>
    <view>
        <view :class="'custom-nav-bar ' + (transparentBk ? 'background-ttransparent' : 'background-image')" :style="'height:' + custom_navHeight + 'rpx;'">
            <view class="custom-nav-bar-info" :style="'height:' + custom_info_height + 'px;margin-top:' + custom_info_top + 'px'">
                <view class="custom-left">
                    <block v-if="isTab">
                        <slot name="custom-left"></slot>
                    </block>
                    <block v-if="!isTab">
                        <view class="capsule-button">
                            <view class="back-button" @tap="goBack">
                                <text class="iconfont icon-fanhui"></text>
                            </view>
                            <view class="home-button" @tap="goHome">
                                <text class="iconfont icon-home"></text>
                            </view>
                        </view>
                    </block>
                </view>
                <view class="custom-content">
                    <slot name="custom-Info"></slot>
                </view>
            </view>
        </view>
        <view v-if="isFixed" :style="'height:' + custom_navHeight + 'rpx'"></view>
    </view>
</template>

<script>
// components/custom-nav-bar/custom-nav-bar.js
let app = getApp();
export default {
    data() {
        return {
            custom_navHeight: null,
            isTab: true,
            custom_info_height: '',
            custom_info_top: ''
        };
    },
    /**
     * 组件的属性列表
     */

    options: {
        multipleSlots: true
    },
    props: {
        transparentBk: {
            type: Boolean,
            default: false
        },
        isFixed: {
            type: Boolean,
            default: true
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        attached: function () {
            //判断当前是否为tab页
            this.judgeTabs();

            //获取导航栏高度以及胶囊按钮参数
            let { height, top } = uni.getMenuButtonBoundingClientRect();
            this.setData(
                {
                    custom_navHeight: app.globalData.navHeight,
                    custom_info_height: height,
                    custom_info_top: top
                },
                () => {}
            );
        },

        judgeTabs() {
            const tabs = ['/pages/index/index'];
            const curPage = getCurrentPages();
            if (tabs.indexOf(curPage) === -1 && getCurrentPages().length > 1) {
                this.setData({
                    isTab: false
                });
            }
        },

        goBack() {
            console.log('占位：函数 goBack 未声明');
        },

        goHome() {
            console.log('占位：函数 goHome 未声明');
        }
    },
    created: function () {}
};
</script>
<style>
@import './custom-nav-bar.css';
</style>
