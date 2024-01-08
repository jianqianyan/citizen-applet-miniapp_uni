<script>
// app.js
// import location from './common/location'

// const EventEmitter = require("events");
import EventEmitter from "./utils/event";
import { handlerTokenTime } from "./common/permission";
import { needLogin } from "./common/config";
export default {
  data() {
    return {};
  },
  onLaunch() {
    handlerTokenTime();

    if (!needLogin) {
      uni.setTabBarItem({
        index: 2,
        visible: false,
      });
    }
    // 获取导航高度；
    uni.getSystemInfo({
      success: (res) => {
        //导航高度
        this.globalData.navHeight =
          res.statusBarHeight * (750 / res.windowWidth) + 97;
      },
      fail(err) {},
    });

    // location();

    // 发布订阅
    uni.$emitter = new EventEmitter();
    uni.$global = {
      topLevelRegionCode: "",
      //当前用户所在区域
      curRegion: {
        regionCode: "",
        level: null,
        regionName: "",
      },
    };
  },
  onShow() {
    this.globalData.autoUpdate();
  },
  globalData: {
    // 位置信息
    location: {
      latitude: "",
      longitude: "",
    },

    //位置服务 key
    key: "THGBZ-55GH2-HLKUM-CAQXP-SFKPS-4UFPK",

    //导航栏高度
    navHeight: null,

    enterpriseId: "",

    //测试企业ID
    // enterpriseId:'068f8490f52a11eb8dfa52540024473f',

    // 扫码药店的区域ID
    regionCode: "",

    // 版本更新提示
    autoUpdate: function () {
      var that = this;
      // 获取小程序更新机制兼容
      if (uni.canIUse("getUpdateManager")) {
        const updateManager = uni.getUpdateManager();
        //1. 检查小程序是否有新版本发布
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            uni.showLoading({
              title: "正在更新",
            });
            //2. 小程序有新版本，则静默下载新版本，做好更新准备
            updateManager.onUpdateReady(function () {
              uni.hideLoading();
              uni.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function (res) {
                  if (res.confirm) {
                    //3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                  } else if (res.cancel) {
                    //如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                    uni.showModal({
                      title: "温馨提示~",
                      content:
                        "本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~",
                      success: function (res) {
                        that.autoUpdate();
                        return;
                        //第二次提示后，强制更新
                        if (res.confirm) {
                          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                          updateManager.applyUpdate();
                        } else if (res.cancel) {
                          //重新回到版本更新提示
                          that.autoUpdate();
                        }
                      },
                    });
                  }
                },
              });
            });
            updateManager.onUpdateFailed(function () {
              // 新的版本下载失败
              uni.showModal({
                title: "已经有新版本了哟~",
                content:
                  "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
              });
            });
          }
        });
      } else {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        uni.showModal({
          title: "提示",
          content:
            "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
        });
      }
    },
  },
};
</script>
<style>
@import "./app.css";
</style>
