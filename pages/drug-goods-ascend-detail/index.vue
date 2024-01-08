<template>
    <view class="drug-ascend-wrapper">
        <!-- 背景占位 -->
        <view class="background-holder"></view>
        <!-- 背景占位 -->

        <view class="profile-cotent-wrapper">
            <view class="profile-info shadow-wrapper">
                <!-- 药品名称 -->
                <view class="filed">
                    <text class="label">药品名称</text>
                    <view class="filed-content">{{ commodityProfile.drugGenericName ? commodityProfile.drugGenericName : '暂无信息' }}</view>
                </view>
                <!-- 药品名称 END -->

                <!-- 生产企业/生产厂家 -->
                <view class="filed">
                    <text class="label">生产企业/生产厂家</text>
                    <view class="filed-content">{{ commodityProfile.domesticProduceEnterpriseName ? commodityProfile.domesticProduceEnterpriseName : '暂无信息' }}</view>
                </view>
                <!-- 生产企业/生产厂家END -->

                <!-- 规格 -->
                <view class="filed">
                    <text class="label">规格</text>
                    <view class="filed-content">
                        <text class="date">{{ commodityProfile.strength ? commodityProfile.strength : '暂无信息' }}</text>
                        <!-- <text class="time">00:00:00</text> -->
                    </view>
                </view>
                <!-- 规格 END -->
            </view>
        </view>
    </view>
</template>

<script>
// pages/drug-goods-ascend-detail/index.js
export default {
    data() {
        return {
            commodityProfile: {
                drugGenericName: false,
                domesticProduceEnterpriseName: false,
                strength: false
            }
        };
    },
    onLoad(options) {
        let { commodityProfile } = options;
        this.setData({
            commodityProfile: JSON.parse(decodeURIComponent(commodityProfile))
        });
    },
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
