<template>
  <view class="profile-wrapper">
    <!-- 背景占位 -->
    <view class="background-holder"></view>
    <!-- 背景占位 -->

    <!-- 个人信息 -->
    <view class="profile-cotent-wrapper">
      <view class="profile-info shadow-wrapper">
        <!-- 头像 -->
        <view class="user-avatar filed">
          <text class="label">头像</text>
          <view class="filed-content"></view>
          <view class="avatar-image-wrapper">
            <image mode="aspectFill" :src="avatarUrl"></image>
          </view>
          <text class="iconfont icon-jiantou arrows"></text>
        </view>
        <!-- 头像 END -->

        <!-- 用户姓名 -->
        <view class="user-name filed">
          <text class="label">用户姓名</text>
          <view class="filed-content">{{ nickName }}</view>
          <text class="iconfont icon-jiantou arrows"></text>
        </view>
        <!-- 用户姓名 END -->

        <!-- 手机号码 -->
        <view class="user-phone filed">
          <text class="label">手机号码</text>
          <view class="filed-content">{{ mobile }}</view>
          <text class="iconfont icon-jiantou arrows"></text>
        </view>
        <!-- 手机号码 END -->

        <!-- 身份证号码 -->
        <!-- <view class="user-identity filed">
                <text class="label">身份证号码</text>
                <view class="filed-content">440583199911024830</view>
                <text class="iconfont icon-jiantou arrows"></text>
            </view> -->
        <!-- 身份证号码 END -->
      </view>
    </view>
    <!-- 个人信息 END -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 用户头像
      avatarUrl: "",
      // 用户名称
      nickName: "",
      // 手机
      mobile: "",
    };
  },
  onLoad: function () {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      this.setData({
        avatarUrl: uni.getStorageSync("avatarUrl"),
        nickName: uni.getStorageSync("nickName"),
        mobile: uni.getStorageSync("mobile"),
      });
    },
  },
};
</script>
<style>
@import "./index.css";
</style>
