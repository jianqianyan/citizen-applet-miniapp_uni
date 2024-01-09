<template>
  <!-- pages/drua-description/index.wxml -->
  <view
    id="myview"
    :class="myFontSize ? 'drua-description-small' : 'drua-description-big'"
  >
    <view class="drua-description-nei" style="margin: auto">
      <view class="desc-holder"></view>
      <view class="top_box">
        <view class="listening_box" @tap="playAudio">
          <image src="/static/images/profile/laba.png" class="laba" mode="" />
          <text class="listening">{{ myText }}</text>
          <view class="listening_right"></view>
        </view>
      </view>
      <view class="fontSize-box">
        <view class="f-left">
          <radio :checked="myFontSize" @tap="changeSmall">正常字</radio>
        </view>
        <view class="line"></view>
        <view class="f-right">
          <radio :checked="!myFontSize" @tap="changeBig">大字号</radio>
        </view>
      </view>

      <view class="name_box">
        <scroll-view
          class="img"
          @touchstart="touchstartCallback"
          @touchmove="touchmoveCallback"
          @touchend="touchendCallback"
          :scroll-x="true"
          :scroll-y="true"
          data-myscroll="scale1"
        >
          <view :style="'zoom: ' + (stv.scale1 || 1) + ';'">
            <view
              :class="acticeIndex == 0 ? 'content_box' : ''"
              data-index="0"
              @tap="paragraphRead"
              @longpress="copyText"
              :data-key="broadcastContent[0]"
            >
              <view class="drua-name">{{ infoData.insName }}</view>
            </view>
            <view
              :class="acticeIndex == 1 ? 'content_box' : ''"
              data-index="1"
              @tap="paragraphRead"
              @longpress="copyText"
              :data-key="broadcastContent[1]"
            >
              <view class="drua-desc"
                >核准日期：{{ infoData.approvalDate }}</view
              >
            </view>
            <view
              :class="acticeIndex == 2 ? 'content_box' : ''"
              data-index="2"
              @tap="paragraphRead"
              @longpress="copyText"
              :data-key="broadcastContent[2]"
            >
              <view class="drua-desc">修改日期：{{ infoData.updateDate }}</view>
            </view>
            <view
              :class="acticeIndex == 3 ? 'content_box' : ''"
              data-index="3"
              @tap="paragraphRead"
              @longpress="copyText"
              :data-key="broadcastContent[3]"
            >
              <view class="drua-desc">警示语：{{ infoData.warning }}</view>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="tis_box">
        <view class="Tips-box">
          <image
            src="/static/images/profile/ts.png"
            mode="widthFix"
            class="tis-img"
          />
          <view class="Tips">用药贴士</view>
        </view>

        <block
          v-for="(item, index) in infoData.drugInstructionsContentEntities"
          :key="item.id"
        >
          <scroll-view
            class="img"
            @touchstart="touchstartCallback"
            @touchmove="touchmoveCallback"
            @touchend="touchendCallback"
            :scroll-x="true"
            :scroll-y="true"
            :data-myscroll="'scale' + (index + 4)"
          >
            <view :style="'zoom: ' + (stv['scale' + (index + 4)] || 1) + ';'">
              <view
                :class="acticeIndex == index + 4 ? 'content_box' : ''"
                :data-index="index + 4"
                @tap="paragraphRead"
                @longpress="copyText"
                :data-key="broadcastContent[index + 4]"
              >
                <view class="title-box">
                  <view class="title-text">{{ item.title }}</view>
                </view>
                <view class="desc-text" id="myContents">
                  <rich-text :nodes="item.contents"></rich-text>
                </view>
              </view>
            </view>
          </scroll-view>
        </block>
        <block v-if="infoData.adrsCode">
          <image
            :show-menu-by-longpress="true"
            :src="file_base_url + infoData.adrsCode"
            mode=""
            style="width: 260rpx; height: 260rpx"
          />
        </block>
      </view>
      <view class="bottom-text" style="height: 20rpx"></view>
    </view>
  </view>
</template>

<script>
import Api from "../../apis/apis";
import * as util from "../../common/common";
import { file_base_url } from "../../common/config";
import { generateRandomString } from "../../utils/util";
export default {
  data() {
    return {
      myFontSize: true,
      isListening: false,
      myText: "一键收听",
      innerAudioContext: {},
      drugDelId: "",
      druaDesc: {},
      broadcastContent: [],
      acticeIndex: -1,
      isEnd: false,

      infoData: {
        insName: "",
        approvalDate: "",
        updateDate: "",
        warning: "",
        drugInstructionsContentEntities: [],
        adrsCode: "",
      },

      file_base_url: "",
      type: 1,

      stv: {
        offsetX: 0,
        offsetY: 0,
        zoom: false,

        //是否缩放状态
        distance: 0,

        //两指距离
        //缩放倍数
        // scale1:2
        scale: 1,

        scale1: "",
      },

      insList: [],
      name: "",
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */ onLoad(options) {
    let { drugDel } = options;
    const innerAudioContext = uni.createInnerAudioContext();
    this.setData({
      drugDelId: drugDel,
      innerAudioContext,
      file_base_url: file_base_url,
    });
    this.getDruDescInfo();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.innerAudioContext.pause();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  methods: {
    changeDesc(e) {
      let { type } = e.currentTarget.dataset;
      this.setData({
        type,
      });
      this.getDruDescInfo();
    },

    getDruDescInfo() {
      let params = {
        id: this.drugDelId,
      };
      Api.getDruDesc(params).then((res) => {
        if (res.data.code !== 200) {
          return util.Toast({
            title: "请求数据失败",
          });
        }
        let infoData = res.data.data;
        this.setData({
          infoData,
        });
        let content = [
          infoData.insName + "。",
          "核准日期：" + infoData.approvalDate,
          "修改日期：" + infoData.updateDate,
          "警示语：" + infoData.warning,
        ];
        infoData.drugInstructionsContentEntities.forEach((element) => {
          let str =
            element.title +
            "。" +
            element.contents.replace(/<[^>]+>/g, "").replace(/&nbsp;/gi, "");
          content.push(str);
        });
        this.setData({
          broadcastContent: content,
          infoData,
        });
      });
    },

    changeSmall() {
      let myFontSize = true;
      this.setData({
        myFontSize,
      });
    },

    changeBig() {
      let myFontSize = false;
      this.setData({
        myFontSize,
      });
    },

    playOnly() {
      let myText = "";
      this.innerAudioContext.play();
      myText = "播放中，点击暂停";
      let isListening = true;
      this.setData({
        isListening,
        myText,
      });
    },

    playAudio() {
      let myText = "";
      if (!this.isListening) {
        this.innerAudioContext.play();
        myText = "播放中，点击暂停";
      } else {
        this.innerAudioContext.pause();
        myText = "已暂停，点此继续收听";
      }
      let isListening = !this.isListening;
      this.setData({
        isListening,
        myText,
      });
      if (this.acticeIndex == -1) {
        let acticeIndex = 0;
        this.setData({
          acticeIndex,
        });
        this.getSrc(acticeIndex);
      }
    },

    paragraphRead(e) {
      let { index } = e.currentTarget.dataset;
      if (parseInt(index) == this.acticeIndex) {
        return;
      }
      this.setData({
        acticeIndex: parseInt(index),
      });
      this.getSrc(index);
    },

    async getSrc(index) {
      let data = {
        data: [
          JSON.stringify(this.broadcastContent[index]),
          "派蒙_ZH",
          0.2,
          0.6,
          0.8,
          1,
          "ZH",
          null,
          "Happy",
          "Text prompt",
          "",
          0.7,
        ],
        event_data: null,
        fn_index: 0,
        session_hash: generateRandomString(),
      };
      let res = await Api.getVoiceSrc(data);
      if (res.statusCode === 200) {
        this.innerAudioContext.src =
          `https://v2.genshinvoice.top/file=` + res.data.data[1].name;
        this.playOnly();
        if (!this.isEnd) {
          this.handelEnd();
        }
      }
    },

    handelEnd() {
      this.innerAudioContext.onEnded(() => {
        //播放结束，销毁该实例
        // this.innerAudioContext.destroy();
        let arrLength = this.broadcastContent.length;
        if (this.acticeIndex < arrLength - 1) {
          this.setData({
            acticeIndex: parseInt(this.acticeIndex) + 1,
            isEnd: true,
          });
          if (!this.broadcastContent[this.acticeIndex]) {
            this.setData({
              acticeIndex: parseInt(this.acticeIndex) + 1,
              isEnd: true,
            });
          }
          this.getSrc(this.acticeIndex);
        } else {
          let myText = "一键收听";
          let isListening = !this.isListening;
          let acticeIndex = -1;
          this.setData({
            myText,
            isListening,
            acticeIndex,
          });
        }
      });
    },

    copyText(e) {
      let key = e.currentTarget.dataset.key;
      uni.setClipboardData({
        data: key,
        success: (res) => {
          uni.getClipboardData({
            success: (res) => {
              uni.showToast({
                title: "复制成功",
              });
            },
          });
        },
      });
    },

    //事件处理函数
    touchstartCallback: function (e) {
      if (e.touches.length === 1) {
        let { clientX, clientY } = e.touches[0];
        this.startX = clientX;
        this.startY = clientY;
        this.touchStartEvent = e.touches;
      } else {
        let xMove = e.touches[1].clientX - e.touches[0].clientX;
        let yMove = e.touches[1].clientY - e.touches[0].clientY;
        let distance = Math.sqrt(xMove * xMove + yMove * yMove);
        this.setData({
          "stv.distance": distance,
          "stv.zoom": true, //缩放状态
        });
      }
    },

    touchmoveCallback: function (e) {
      if (e.touches.length === 1) {
        //单指移动
        if (this.stv.zoom) {
          //缩放状态，不处理单指
          return;
        }
        let { clientX, clientY } = e.touches[0];
        let offsetX = clientX - this.startX;
        let offsetY = clientY - this.startY;
        this.startX = clientX;
        this.startY = clientY;
        let { stv } = this;
        stv.offsetX += offsetX;
        stv.offsetY += offsetY;
        stv.offsetLeftX = -stv.offsetX;
        stv.offsetLeftY = -stv.offsetLeftY;
        this.setData({
          stv: stv,
        });
      } else {
        let valueName = e.currentTarget.dataset.myscroll;
        let name = `stv.${valueName}`;

        //双指缩放
        let xMove = e.touches[1].clientX - e.touches[0].clientX;
        let yMove = e.touches[1].clientY - e.touches[0].clientY;
        let distance = Math.sqrt(xMove * xMove + yMove * yMove);
        let distanceDiff = distance - this.stv.distance;
        let newScale = (this.stv[valueName] || 1) + 0.005 * distanceDiff;
        if (newScale < 0.7) {
          return;
        }
        if (newScale > 1.5) {
          return;
        }
        this.setData({
          "stv.distance": distance,
          [name]: newScale,
        });
      }
    },

    touchendCallback: function (e) {
      //触摸结束
      if (e.touches.length === 0) {
        this.setData({
          "stv.zoom": false, //重置缩放状态
        });
      }
    },
  },
};
</script>
<style>
@import "./index.css";
</style>
