<template>
    <view class="my-advice-wrapper">
        <!-- 背景占位 -->
        <view class="background-holder"></view>
        <!-- 背景占位 -->
        <!-- 咨询列表 -->
        <block v-if="adivceList && adivceList.length !== 0">
            <view class="advice-list-wrapper">
                <view class="advice-list" @tap="toAdivceDetails">
                    <block v-for="(item, index) in adivceList" :key="index">
                        <view class="advice-list-item shadow-wrapper">
                            <!-- 医生头像 -->
                            <view class="medical-avatar">
                                <image :src="item.faceImage" mode="aspectFill"></image>
                            </view>
                            <!-- 医生头像 END -->
                            <!-- 咨询信息记录 -->
                            <view class="advice-info-wrapper">
                                <view class="consultant-time">
                                    <text class="medical-name">{{ item.pharmacistName }}</text>
                                    <text class="advice-time">{{ format.timeFormat(item.sendTime, false) }}</text>
                                </view>
                                <block v-if="item.informationType === 0">
                                    <text class="new-advice">{{ item.endWrittenWords }}</text>
                                </block>
                                <block v-if="item.informationType === 1">
                                    <text class="new-advice">[ 图片 ]</text>
                                </block>
                            </view>
                            <!-- 咨询信息记录 END -->
                            <view class="bubble-holder" :data-donsult-del="item"></view>
                        </view>
                    </block>
                </view>
            </view>
        </block>
        <block v-else>
            <view class="advice-hint">暂无咨询信息</view>
        </block>
        <!-- 咨询列表 END -->
        <MyFooter></MyFooter>
    </view>
</template>
<script module="format" lang="wxs" src="@/wxsFormat/format.wxs"></script>
<script>
// pages/tab-MyAdvice/index.js
import * as Tip from '../../common/common';
import Api from "../../apis/apis"
import MyFooter from "../../components/MyFooter/fixedIndex.vue"
import { _debounce } from '../../utils/util';
const DELAY = 2000;
const DEBOUNCE_DELAY = 800;
export default {
   components: {
      MyFooter
    },
    data() {
        return {
            adivceList: [],

            //页码器
            pagiNation: {
                pageNum: 1,
                pageSize: 10
            },

            //总条数
            total: 0
        };
    },
    onLoad() {
        // util.Toast({
        //   title:'功能暂未开放'
        // })
        // this.getConsultedList();
    },
    //下拉刷新 防抖
    onPullDownRefresh: _debounce(
        function () {
            this.pagiNation = 1;
            setTimeout(() => {
                this.setData(
                    {
                        adivceList: []
                    },
                    () => {
                        this.getConsultedList(() => uni.stopPullDownRefresh());
                    }
                );
            }, DELAY);
        },
        DEBOUNCE_DELAY,
        true
    ),
    //底部tab栏事件监听
    onTabItemTap: _debounce(
        function (item) {
            this.pagiNation = 1;
            this.setData(
                {
                    adivceList: []
                },
                () => {
                    this.getConsultedList();
                }
            );
        },
        DEBOUNCE_DELAY,
        true
    ),
    methods: {
        //查看咨询详情
        toAdivceDetails(event) {
            const { donsultDel } = event.target.dataset;
            const query = encodeURIComponent(JSON.stringify(donsultDel));
            uni.navigateTo({
                url: `/pages/advice-chat/index?dosultDel=${query}`
            });
        },

        //获取当前用户咨询的药师列表
        getConsultedList(cb = () => {}) {
            const citizenId = uni.getStorageSync('userId') || '';
            if (!citizenId) {
                return Tip.Toast({
                    title: '请先登录'
                });
            }
            let { adivceList } = this;
            Api.getConsultedList({
                ...this.pagiNation,
                citizenId
            })
                .then((res) => {
                    const { records, total } = res.data.data;
                    this.total = total;
                    this.setData({
                        adivceList: [...adivceList, ...records]
                    });
                    if (cb) {
                        cb();
                    }
                })
                .catch((err) => {
                    if (cb) {
                        cb();
                    }
                });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
