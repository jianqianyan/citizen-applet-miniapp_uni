<template>
    <view class="buying-drug-wrapper">
        <!-- 背景占位 -->
        <view class="background-holder"></view>
        <!-- 背景占位 -->

        <view class="profile-cotent-wrapper">
            <!-- 药品信息 -->
            <view class="profile-info shadow-wrapper">
                <view class="profile-title">药品信息</view>
                <view class="filed">
                    <text class="label">药品名称</text>
                    <view class="filed-content">{{ detailList.drugGenericName }}</view>
                </view>
                <!-- <view class="filed">
                <text class="label">生产批次</text>
                <view class="filed-content">123453</view>
            </view>
            <view class="filed">
                <text class="label">生产厂家</text>
                <view class="filed-content">同仁堂总部</view>
            </view>
            <view class="filed last-filed">
                <text class="label">批准文号</text>
                <view class="filed-content">BJ4356</view>
            </view> -->
            </view>

            <!-- 药品信息 END -->

            <!-- 购买信息 -->
            <view class="profile-info shadow-wrapper">
                <view class="profile-title">购买信息</view>
                <view class="filed">
                    <text class="label">乡镇名称</text>
                    <view class="filed-content">{{ detailList.regionName ? detailList.regionName : '无' }}</view>
                </view>
                <view class="filed">
                    <text class="label">详细乡镇名称</text>
                    <view class="filed-content">{{ detailList.regionFullName }}</view>
                </view>
                <view class="filed">
                    <text class="label">药店名称</text>
                    <view class="filed-content">{{ detailList.drugstore }}</view>
                </view>
                <view class="filed">
                    <text class="label">药店地址</text>
                    <view class="filed-content">{{ detailList.drugstoreAddress }}</view>
                </view>
                <view class="filed">
                    <text class="label">姓名</text>
                    <view class="filed-content">{{ detailList.name }}</view>
                </view>
                <view class="filed">
                    <text class="label">年龄</text>
                    <view class="filed-content">{{ detailList.age }}</view>
                </view>
                <view class="filed">
                    <text class="label">住址</text>
                    <view class="filed-content">{{ detailList.address }}</view>
                </view>
                <view class="filed">
                    <text class="label">身份证号</text>
                    <view class="filed-content">{{ detailList.idNumber }}</view>
                </view>
                <view class="filed">
                    <text class="label">联系方式</text>
                    <view class="filed-content">{{ detailList.contactinformation }}</view>
                </view>
                <view class="filed">
                    <text class="label">体温</text>
                    <view class="filed-content">{{ detailList.temperature }}</view>
                </view>
                <view class="filed">
                    <text class="label">是否疫区返回</text>
                    <view class="filed-content">{{ detailList.epidemicAreaReturns == 1 ? '是' : '否' }}</view>
                </view>
                <view class="filed">
                    <text class="label">是否与疫区返回人员或发热症状人员接触</text>
                    <view class="filed-content">{{ detailList.contactWithFebrilePersonnel == 1 ? '是' : '否' }}</view>
                </view>
                <view class="filed">
                    <text class="label">紧急联系人</text>
                    <view class="filed-content">{{ detailList.emergencyContact ? detailList.contactWithFebrilePersonnel : '无' }}</view>
                </view>
                <view class="filed">
                    <text class="label">购买数量</text>
                    <view class="filed-content">{{ detailList.purchaseQuantity }}</view>
                </view>
                <view class="filed last-filed">
                    <text class="label">购买时间</text>
                    <view class="filed-content">{{ detailList.createTime }}</view>
                </view>
            </view>
            <!-- 购买信息 END -->
        </view>
    </view>
</template>

<script>
// pages/buying-drug-details/index.js
export default {
    data() {
        return {
            detailList: {
                drugGenericName: '',
                regionName: false,
                regionFullName: '',
                drugstore: '',
                drugstoreAddress: '',
                name: '',
                age: '',
                address: '',
                idNumber: '',
                contactinformation: '',
                temperature: '',
                epidemicAreaReturns: 0,
                contactWithFebrilePersonnel: 0,
                emergencyContact: false,
                purchaseQuantity: '',
                createTime: ''
            }
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        let detailList = JSON.parse(options.drugInfo);
        console.log('options', detailList);
        this.setData({
            detailList
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
