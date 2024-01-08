<template>
  <view class="my-center-wrapper">
    <!-- 背景占位 -->
    <view class="background-holder"></view>
    <!-- 背景占位 -->

    <!-- 背景图 -->
    <view class="background-view">
      <image
        class=""
        src="/static/images/my_background.png"
        mode="aspectFill"
      />
    </view>
    <!-- 背景图 -->

    <view class="user-wrapper">
      <!-- 登录 -->
      <view class="login-button" v-if="!isLogin">
        <button class="reset_btn shadow-wrapper" @tap="login">登录</button>
      </view>
      <!-- 登录 END -->

      <!-- 已登录的用户信息 -->
      <view class="user-info" v-if="isLogin">
        <view class="user-avatar">
          <image mode="aspectFill" :src="avatarUrl"></image>
        </view>
        <text class="user-name">{{ nickName }}</text>
      </view>
      <!-- 已登录的用户信息 END -->
    </view>

    <!-- 菜单栏 -->
    <view class="menu-list-wrapper shadow-wrapper">
      <view class="menu-list">
        <block v-for="(menu, index) in menuList" :key="index">
          <view
            class="menu-list-item"
            @tap.stop.prevent="handleRouter"
            :data-path="menu.url"
            :data-name="menu.title"
          >
            <view class="menu-icon">
              <image :src="menu.icon" mode="aspectFill"></image>
            </view>
            <text class="menu-title">{{ menu.title }}</text>
          </view>
        </block>
      </view>
    </view>
    <!-- 菜单栏 END -->
    <MyFooter></MyFooter>
  </view>
</template>

<script>
import customPopup from "../../components/custom-popup/index";
import { Toast } from "../../common/common";
import MyFooter from "../../components/MyFooter/fixedIndex.vue"
export default {
  components: {
    customPopup,
    MyFooter
  },
  data() {
    return {
      menuList: [
        {
          icon: "/static/images/tab_my_center_menu/per_info.png",
          title: "个人信息",
          url: "/pages/profile/index",
        },
        {
          icon: "/static/images/tab_my_center_menu/buy_drug_record.png",
          title: "购药记录",
          url: "/pages/buying-drug-record/index",
        },
        {
          icon: "/static/images/tab_my_center_menu/about_us.png",
          title: "关于我们",
          url: "/pages/about/about",
        },
      ],
      // 用户头像
      nickName: uni.getStorageSync("nickName"),
      // 用户名称
      //isLogin
      isLogin: true,
      menu: {
        url: "",
        title: "",
        icon: "",
      },
    };
  },
  onLoad: function () {
    if (uni.getStorageSync("access_token") && uni.getStorageSync("userId")) {
      this.setData({
        isLogin: true,
      });
    }
  },
  onReady: function () {},
  onShow: function () {},
  methods: {
    //login
    login() {
      this.handleLogin();
    },
    // 路由跳转
    handleRouter(event) {
      const { name, path } = event.currentTarget.dataset;
      switch (name) {
        case "个人信息":
          if (!uni.getStorageSync("userId")) {
            return Toast({
              title: "请先登录",
            });
          }
          uni.navigateTo({
            url: path,
          });
          break;
        case "购药记录":
          if (!uni.getStorageSync("userId")) {
            return Toast({
              title: "请先登录",
            });
          }
          uni.navigateTo({
            url: path,
          });
          break;
        case "关于我们":
          uni.navigateTo({
            url: path,
          });
          break;
      }
    },
  },
  computed: {
    avatarUrl() {
      return uni.getStorageSync("avatarUrl") || './static/images/userheader.png'
    },
  },
};
</script>
<style>
@import "./index.css";
</style>
