<template>
  <view class="quality-info-wrapper">
    <!-- 背景占位 -->
    <view class="profile-cotent-wrapper">
      <view class="profile-info shadow-wrapper">
        <view class="filed filed-column" v-for="(item, index) in licenceMessage" :key="index">
          <text class="label">{{ item.certificateName }}</text>

          <view class="filed-content">{{ item.certificateNumber }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  // pages/licence-quality-info/index.js
  import Api from "../../apis/apis"
  import { Toast } from '../../common/common';
  export default {
    data () {
      return {
        licenceMessage: []
      };
    }
      /**
       * 生命周期函数--监听页面加载
       */,
    onLoad: function (options) {
      this.getlicenceMessage(options);
    },
    methods: {
      async getlicenceMessage (options) {
        let res = await Api.getlicenceMessage(options);
        if (res.data.code !== 200) {
          return Toast({
            title: '许可证请求失败'
          });
        }
        this.setData({
          licenceMessage: res.data.data
        });
      }
    }
  };
</script>
<style>
@import './index.css';
</style>
