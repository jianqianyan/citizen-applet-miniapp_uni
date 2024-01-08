<template>
    <view class="record-wrapper" @touchmove.stop.prevent="trueFun">
        <!-- 占位 -->
        <view class="profile-cotent-wrapper">
            <view class="profile-info shadow-wrapper">
                <!-- 表头 -->
                <view class="scroll-title">
                    <view class="record-header-item">药品名称</view>
                    <view class="record-header-item">购买时间</view>
                    <view class="record-header-item">购买药店</view>
                    <view class="record-header-item">购买数量</view>
                </view>
                <!-- 表头 END -->
                <view class="record-line"></view>
                <!-- 表格内容 -->
                <scroll-view class="scroll-style" scroll-y>
                    <block v-for="(item, index) in drugInfo" :key="index">
                        <view class="record-item" @tap.stop.prevent="toRecordDetails" :data-drugInfo="item">
                            <view class="record-item-info">
                                <text>{{ item.drugGenericName }}</text>
                            </view>
                            <view class="record-item-info">
                                <text>{{ item.createTime }}</text>
                            </view>
                            <view class="record-item-info">
                                <text>{{ item.drugstore }}</text>
                            </view>
                            <view class="record-item-info">
                                <text>{{ item.purchaseQuantity }}</text>
                            </view>
                        </view>
                    </block>
                </scroll-view>
                <!-- 表格内容 -->
            </view>
        </view>
    </view>
</template>

<script>
// pages/buying-drug-record/index.js
import Api from "../../apis/apis"
import { Toast } from '../../common/common';
export default {
    data() {
        return {
            drugInfo: {
                drugName: '同仁保济',
                manufacturer: '白云山',
                buytime: '2020-12-12',
                buyStore: '爱心药房'
            }
        };
    },
    onLoad() {
        this.getDrugPurchaseRecord();
    },
    methods: {
        toRecordDetails(e) {
            // console.log('e', e.currentTarget.dataset.druginfo);
            let drugInfo = JSON.stringify(e.currentTarget.dataset.druginfo);
            // console.log(drugInfo);
            uni.navigateTo({
                url: `/pages/buying-drug-details/index?drugInfo=${drugInfo}`
            });
        },

        async getDrugPurchaseRecord() {
            let userId = uni.getStorageSync('userId');
            let res = await Api.getDrugPurchaseRecord({
                citizenUserId: userId
            });
            if (res.data.code !== 200) {
                return Toast('列表详情请求失败');
            }
            console.log('列表', res.data.data.records);
            this.setData({
                drugInfo: res.data.data.records
            });
        },

        trueFun() {
            console.log('占位：函数 true 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
