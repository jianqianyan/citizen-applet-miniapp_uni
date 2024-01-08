<template>
  <view class="home-page-wrapper">
    <uni-nav-bar
      title="首页"
      backgroundColor="#0990ff"
      color="#fff"
      :border="false"
    >
      <template v-slot:left>
        <image src="/static/images/logo.png" mode="aspectFit"></image>
      </template>
    </uni-nav-bar>
    <!-- 顶部药店搜索栏 -->
    <view class="search-drug-store">
      <!-- 当前定位地址 -->
      <view class="location-address-wrapper">
        <view class="cur-location-address">
          <picker
            mode="multiSelector"
            :range="regionArr"
            :value="regionSign"
            range-key="regionName"
            @change="hanldeSelect"
            @columnchange="handleColumnChange"
          >
            <text>{{ curRegion.regionName }}</text>
          </picker>
          <view class="pull-down-icon">
            <image
              mode="aspectFill"
              src="/static/images/tab_index_icons/pull_down.png"
            ></image>
          </view>
        </view>
        <view
          class="search-wrapper shadow-wrapper"
          @tap.stop.prevent="toSearch"
        >
          <text class="icon-search iconfont search-icon"></text>
          <input
            type="text"
            placeholder="查药店、查药品"
            placeholder-class="input-holder"
            :disabled="true"
          />
        </view>
      </view>
      <!-- 当前定位地址 END -->
    </view>
    <!-- 区域列表信息 -->

    <!-- 区域列表信息 END -->

    <!-- 顶部药店搜索栏 END -->

    <!-- 轮播 -->
    <swiper class="swiper-style" autoplay circular>
      <block>
        <swiper-item class="swiper-item-style">
          <image src="/static/images/banner/1.png" mode="aspectFill"></image>
        </swiper-item>
      </block>
      <block>
        <swiper-item class="swiper-item-style">
          <image src="/static/images/banner/2.jpg" mode="aspectFill"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 轮播 END -->

    <!-- 首页工具栏菜单 -->
    <view class="utils-menu-wrapper">
      <view class="utils-menu-list shadow-wrapper">
        <block v-for="(item, index) in menuList" :key="index">
          <navigator class="utils-menu-item" :url="item.url" hover-class="none">
            <view :class="'icon ' + item.style">
              <image :src="`/static/images/${item.icon}`"></image>
            </view>
            <text class="menu-title">{{ item.title }}</text>
          </navigator>
        </block>
      </view>
    </view>
    <!-- 首页工具栏菜单 -->

    <!-- 位置标题 -->
    <view class="location-title">
      <text class="icon-dingwei iconfont location-icon"></text>
      <text @tap.stop.prevent="getRegionAndlocation">{{ curLocation }}</text>
    </view>
    <!-- 位置标题 END -->

    <!-- 附近药店内容 -->
    <view class="nearby-drug-info">
      <view class="tab-menu-wrapper">
        <custom-tab-panel
          :tabList="tabList"
          :tabHeight="96"
          rangKey="title"
          @changeTab="handleChangetab"
          @getScrollH="getScrollH"
        />
      </view>
      <!-- 附近药店列表 -->
      <view class="tab-item-content">
        <view class="drug-list" @tap="toDrugStoreDetl">
          <view
            class="drug-list-item shadow-wrapper"
            v-for="(item, index) in tabList[curTabSign].list"
            :key="index"
          >
            <view class="bubble-holder" :data-id="item.id"></view>

            <view class="drug-store-pic">
              <block v-if="item.enterpriseImage">
                <image
                  :src="BASE_URL + item.enterpriseImage"
                  mode="aspectFill"
                  :lazy-load="true"
                ></image>
              </block>
              <block v-else>
                <image
                  :src="`/static/images/icons/drugIcon.png`"
                  mode="aspectFill"
                  :lazy-load="true"
                ></image>
              </block>
            </view>

            <view class="drug-store-info">
              <!-- 详细地址及图片信息 -->
              <view class="drug-store-address">
                <text class="text-overflow address-text-style">{{
                  item.enterpriseName
                }}</text>
                <text class="iconfont icon-jiantou"></text>
              </view>
              <!-- 详细地址及图片信息 END -->
              <!-- 标签 -->
              <view class="drug-label-wrapper">
                <block
                  v-for="(tag, tagIndex) in item.featureLabel"
                  :key="tagIndex"
                >
                  <text class="medicare-label">{{ tag }}</text>
                </block>
              </view>
              <!-- 标签 END -->
              <!-- 药店其他信息 -->
              <view class="drug-other-wrapper">
                <!-- 左侧信息 -->
                <view class="drug-other-left">
                  <view class="drug-bus-time">
                    <text
                      class="icon-shizhong iconfont drug-bus-time-icon"
                    ></text>
                    <view class="drug-bus-time-info">
                      <block v-if="item.businessHours && item.businessHoursEnd">
                        <text class="start-time"
                          >{{ item.businessHours }} -</text
                        >
                        <text class="end-time">{{
                          item.businessHoursEnd
                        }}</text>
                      </block>
                      <block v-else>
                        <text class="">无营业时间信息</text>
                      </block>
                    </view>
                  </view>
                  <view class="drug-bus-address">
                    <text
                      class="icon-jiantouarrow591 iconfont drug-bus-time-icon"
                    ></text>
                    <text class="drug-bus-address-info">{{
                      item.drugstoreLocation
                    }}</text>
                  </view>
                </view>
                <!-- 左侧信息 END -->
                <!-- 右侧信息 -->
                <view class="drug-other-right">
                  <block v-if="item.distance">
                    <view class="drug-dist">{{
                      item.distance && format.locationFormat(item.distance)
                    }}</view>
                  </block>
                </view>
                <!-- 右侧信息 END -->
              </view>
              <!-- 药店其他信息 END -->
            </view>
          </view>
        </view>
      </view>
      <!-- 附近药店列表 -->
    </view>
    <!-- 附近药店内容 END -->
    <evaluateButton v-if="isGFT"></evaluateButton>
    <MyFooter></MyFooter>
  </view>
</template>
<script module="format" lang="wxs" src="@/wxsFormat/format.wxs"></script>
<script>
import customTabPanel from "../../components/custom-tab-panel/index";
import customPopup from "../../components/custom-popup/index";
import evaluateButton from "../../components/evaluateButton.vue";
// pages/tab_index/index.js
import { IMAGE_BASE_URL, BASE_URL, regionCode } from "../../common/config";
import { getUserProfile } from "../../common/authLogin";
import Api from "../../apis/apis";
import location from "../../common/location";
import * as util from "../../common/common";
import MyFooter from "../../components/MyFooter";
import { needLogin, isGFT } from "../../common/config";
let app = getApp().globalData;
let districtMap = new Map();
let townMap = new Map();
export default {
  components: {
    customTabPanel,
    customPopup,
    evaluateButton,
    MyFooter,
  },
  data() {
    return {
      BASE_URL,
      bannerList: [],
      IMAGE_BASE_URL,
      isGFT,

      //工具栏菜单
      menuList: [
        {
          icon: "tab_index_icons/yaodian.png",
          title: "药品查询",
          style: "drug-select",
          url: "/pages/medicine-inquire/index?type=0",
        },
        {
          icon: "tab_index_icons/yaopin.png",
          title: "药店查询",
          style: "drug-store",
          url: "/pages/medicine-inquire/index?type=1",
        },
        {
          icon: "tab_index_icons/fujin.png",
          title: "附近药店",
          style: "nearby-drug",
          url: "/pages/nearby-drug-store/index",
        },
        {
          icon: "tab_index_icons/shangpinzhuisu.png",
          title: "药品追溯",
          style: "drug-ascend",
          url: "/pages/drug-ascend/index",
        },
        {
          icon: "tab_index_icons/fangda.png",
          title: "药品说明",
          style: "drug-illustrate",
          url: "/pages/medicine-inquire/index?type=0&state=1",
        },
      ],

      //tab栏
      tabList: [
        {
          id: 0,
          title: "全部药店",
          featureLabelCode: null,
          pageSize: 10,
          pageNum: 1,
          list: [],
          total: 0,
        },
        {
          id: 1,
          title: "医保药店",
          featureLabelCode: "YB00",
          pageSize: 10,
          pageNum: 1,
          list: [],
          total: 0,
        },
        // {
        //   id: 2,
        //   title: "24小时药店",
        //   featureLabelCode: "24XS00",
        //   pageSize: 10,
        //   pageNum: 1,
        //   list: [],
        //   total: 0,
        // },
      ],

      //顶部区域栏列表信息
      regionList: [],

      //当前区域信息
      curRegion: {
        //区域码
        regionCode: "",
        //区域名称
        regionName: "区域选择",
        //级别
        levels: "",
      },

      // 搜索过滤条件(区域经纬度)
      pagiNation: {
        latitude: "",
        longitude: "",
        level: 1,
        regionCode: regionCode,
      },

      getDrugStoreList: [],
      totalCount: 0,
      curLocation: "",

      //当前选中tab下标
      curTabSign: 0,

      //是否获取到用户位置信息
      isGetloc: false,

      //三级联动数据
      regionArr: [],

      //三级联动数据Sign
      regionSign: [0, 0],

      //市列表
      cityList: [],

      //区列表
      districtList: [],

      //乡镇列表
      townsList: [],

      scrollHeight: "",

      banner: {
        url: "",
      },

      list: [],
      tagIndex: 0,
      tag: "",
    };
  },
  async onLoad() {
    util.Loading();

    //首次请求市区级数据
    await this.getCityList();

    //获取区域以及经纬度信息
    await this.getRegionAndlocation();

    util.HideLoading();

    if (needLogin) {
      setTimeout(() => {
        // 获取用户信息
        getUserProfile();
      }, 1000);
    }
  },
  onUnload() {
    //页面卸载时清除缓存
    this.handleClearRegionMap();
  },
  // 上滑加载
  onReachBottom() {
    let { curTabSign, tabList } = this;
    let { total, pageSize, pageNum } = tabList[curTabSign];
    if (pageSize * pageNum < total) {
      tabList[curTabSign].pageNum++;
      this.setData(
        {
          tabList,
          curTabSign,
        },
        () => {
          // console.log(pageNum)
          this.getDrugStoreListFun();
        }
      );
    }
  },
  methods: {
    //获取高度信息
    getScrollH(event) {
      this.setData({
        scrollHeight: event.detail,
      });
    },

    //选择区域
    hanldeSelect(event) {
      let { districtList, townsList } = this;
      let [, district, town] = event.detail.value;
      let { curRegion, tabList, pagiNation } = this;
      let regionCode, levels, regionName;
      regionCode = districtList[district].regionCode;
      levels = districtList[district].level;
      // 处理缺少区级信息的错误问题
      if (townsList && townsList.length > 0) {
        //取乡镇街道名称用于渲染
        regionName = townsList[town].regionName;
      } else if (districtList && districtList.length > 0) {
        regionName = districtList[district].regionName;
      }
      //取区级信息用于查询
      curRegion = {
        regionCode,
        regionName,
        levels,
      };
      app.curRegion = {
        regionCode,
        regionName,
        levels,
      };
      pagiNation.level = levels;
      pagiNation.regionCode = regionCode;

      // //重新设置区域信息
      this.setData(
        {
          curRegion,
        },
        () => {
          //重置缓存数据
          for (const tabItem of tabList) {
            tabItem.pageNum = 1;
            tabItem.list = [];
            tabItem.total = 0;
          }
          this.getDrugStoreListFun();
        }
      );
    },

    //选择器列事件
    handleColumnChange(event) {
      let { cityList, districtList, regionSign } = this;
      let { column: curColumn, value } = event.detail;

      //当前操作列
      regionSign[curColumn] = event.detail.value;
      switch (curColumn) {
        case 0:
          /**
           * 切换市 请求区数据
           */
          let regionOfCityCode = cityList[value].regionCode;

          //当前市中查看缓存中是否存在已缓存过的区数据
          let districtCache = districtMap.get(regionOfCityCode);
          if (districtCache) {
            this.setData({
              regionArr: [cityList, districtCache],
            });
          } else {
            //无缓存则请求数据
            this.setData(
              {
                regionArr: [cityList, []],
              },
              () => {
                this.getDistrictList(regionOfCityCode);
              }
            );
          }
          regionSign[1] = 0;
          break;
        case 1:
          /**
           * 切换区，请求乡镇数据
           *
           */
          break;
      }
      this.setData({
        regionSign,
      });
    },

    //清除地区选择器缓存
    handleClearRegionMap() {
      districtMap.clear();
      townMap.clear();
    },

    //tab栏切换
    handleChangetab(event) {
      let { pagiNation, tabList, scrollHeight, curTabSign } = this;
      let id = event.detail;
      curTabSign = id;
      tabList[curTabSign].pageNum = 1;
      this.setData(
        {
          pagiNation,
          tabList,
          curTabSign,
        },
        () => {
          if (tabList[curTabSign].list.length === 0) {
            if (scrollHeight) {
              uni.pageScrollTo({
                scrollTop: scrollHeight,
                duration: 300,
              });
              this.getDrugStoreListFun();
            }
          }
        }
      );
    },

    //授权当前位置
    getRegionAndlocation() {
      let { pagiNation, tabList, isGetloc } = this;

      //已获取授权以及区域 不执行下面逻辑
      if (isGetloc) {
        return;
      }

      //重置缓存数据
      for (let tabItem of tabList) {
        tabItem.pageNum = 1;
        tabItem.list = [];
        tabItem.total = 0;
      }

      //获取区域信息
      try {
        // util.Loading();
        location(
          async (locationMessage) => {
            // 获取到位置信息
            this.setData({
              isGetloc: true,
              curLocation: "附近药店",
            });

            // 设置当前区域信息
            let {
              address_component: { city, district },
              address_reference: { town },
              location,
            } = locationMessage.result;
            if (location) {
              const { lat: latitude, lng: longitude } = location;
              app.location.latitude = latitude;
              app.location.longitude = longitude;
              pagiNation.latitude = latitude;
              pagiNation.longitude = longitude;
            }
            for (const tabItem of tabList) {
              tabItem.pageNum = 1;
              tabItem.list = [];
              tabItem.total = 0;
            }
            await this.getDrugStoreListFun();
            //传入授权获取的区域信息进行匹对处理
            await this.initRegionInfo({
              city,
              district,
              town: town.title,
            });

            this.setData({
              tabList,
            });
          },
          //未授权处理
          async (err) => {
            if (!err) {
              this.setData({
                isGetloc: err,
                curLocation: "未获取到位置信息，点击重新获取",
              });
              await this.getDrugStoreListFun();
            }
          }
        );
      } catch (err) {
        //未获取到区域信息，则查询所有药店
        this.setData({
          curLocation: "获取位置失败，点击重新获取",
        });
      }
    },

    //授权成功后初始化区域信息处理函数
    async initRegionInfo(authRegion) {
      let { curRegion, cityList, pagiNation } = this;
      //根据授权获取的位置信息，请求对应的区域信息，回显至上方区域picker
      try {
        const authRegionCityCode = cityList.find(
          (city) => city.regionName === authRegion.city
        ).regionCode;
        const authRegionCitySign = cityList.findIndex(
          (city) => city.regionName === authRegion.city
        );
        const authDefaultDistrictList = await this.getDistrictList(
          authRegionCityCode
        );
        const { regionCode: authRegionDistrictCode, level } =
          authDefaultDistrictList.find(
            (district) => district.regionName === authRegion.district
          );
        //获取区regionCode作为列表筛选条件
        pagiNation.regionCode = authRegionDistrictCode;
        // pagiNation.regionCode = "360400";
        uni.setStorageSync("regionCode", authRegionDistrictCode);
        uni.setStorageSync("level", level);
        uni.setStorageSync("latitude", pagiNation.latitude);
        uni.setStorageSync("longitude", pagiNation.longitude);
        pagiNation.level = level;
        const authRegionDistrictSign = authDefaultDistrictList.findIndex(
          (district) => district.regionName === authRegion.district
        );
        //将乡镇信息用于渲染
        curRegion.regionName = authRegion.district;
        this.setData({
          regionSign: [authRegionCitySign, authRegionDistrictSign],
          curRegion,
        });
      } catch (error) {
        console.log(error);
      }
      Promise.resolve(true);
    },

    //获取药店列表信息
    async getDrugStoreListFun() {
      let {
        pagiNation,
        getDrugStoreListFun: getDrugStoreList,
        totalCount,
        tabList,
        curTabSign,
      } = this;
      const { id, title, list, total, ...rest } = tabList[curTabSign];
      const params = {
        ...pagiNation,
        ...rest,
      };
      try {
        let res = await Api.getDrugStoreList(params);
        if (res.data.code !== 200) {
          return util.Toast({
            title: "获取列表数据失败",
          });
        }
        let { records, total } = res.data.data;
        tabList[curTabSign].list = [
          ...tabList[curTabSign].list,
          ...records.map((drugItem) => {
            let mergeSource = {};
            if (drugItem.featureLabel) {
              drugItem.featureLabel = drugItem.featureLabel.split(",");
            } else {
              drugItem.featureLabel = [];
            }
            if (drugItem.enterpriseImage) {
              const [first] = drugItem.enterpriseImage.split(",");
              mergeSource.enterpriseImage = first;
            }
            return {
              ...drugItem,
              ...mergeSource,
            };
          }),
        ];
        tabList[curTabSign].total = total;
        this.setData({
          tabList,
          getDrugStoreList,
          totalCount,
        });
      } catch (err) {
        util.Toast({
          title: "请求错误,获取药店数据失败",
        });
      }
    },

    //查看药店详情
    toDrugStoreDetl(event) {
      let { id } = event.target.dataset;
      uni.navigateTo({
        url: `/pages/drugSore-detail/index?id=${id}`,
      });
    },

    //药店药品搜索
    toSearch() {
      uni.navigateTo({
        url: "/pages/medicine-inquire/index",
      });
    },

    //获取市数据
    getCityList() {
      return new Promise((resolve, reject) => {
        // 默认获取江西省数据
        Api.getMultilevelRegion(regionCode).then((res) => {
          let cityList = res.data.data.map((item) => {
            return {
              regionName: item.regionName,
              regionCode: item.regionCode,
              level: item.levels,
            };
          });
          this.setData(
            {
              regionArr: [cityList, []],
              cityList,
            },
            async () => {
              resolve(cityList);
            }
          );
        });
      });

      //获取江西省下市级数据
    },

    //获取区数据
    getDistrictList(regionCode) {
      return new Promise((resolve, reject) => {
        let { cityList } = this;
        Api.getMultilevelRegion(regionCode).then((res) => {
          let districtList = res.data.data.map((item) => {
            return {
              regionName: item.regionName,
              regionCode: item.regionCode,
              level: item.levels,
            };
          });
          this.setData(
            {
              regionArr: [cityList, districtList],
              districtList,
            },
            async () => {
              //缓存已请求的地区数据
              if (!districtMap.has(regionCode)) {
                districtMap.set(regionCode, districtList);
              }
              resolve(districtList);
            }
          );
        });
      });
    },
  },
};
</script>
<style>
@import "./index.css";
</style>
