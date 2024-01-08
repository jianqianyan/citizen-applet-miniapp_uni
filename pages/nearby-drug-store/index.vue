<template>
  <view class="container">
    <!-- title -->
    <view class="drug-panel-nearby">
      <view class="map-icon" @tap.stop.prevent="showStoreList">
        <image mode="aspectFill" src="/static/images/map.png"></image>
      </view>
      <text>附近药店</text>
      <view class="filter-icon" @tap.stop.prevent="showFilterPanel">
        <image mode="aspectFill" src="/static/images/filter.png"></image>
      </view>
    </view>
    <!-- title END -->

    <!-- 占位 -->
    <!-- 占位 END -->

    <!-- 为列表时的holder -->
    <view class="holder-reset background-holder" v-if="!showMode"></view>
    <!-- 为列表时的holder END -->

    <!-- 列表模式 -->
    <scroll-view class="scroll-style" scroll-y v-if="!showMode">
      <view class="profile-cotent-wrapper" @tap.stop.prevent="toDrugDetail">
        <block v-for="(item, index) in nearbyDrugList" :key="index">
          <view class="profile-info shadow-wrapper">
            <view class="cur-sold-item">
              <view class="drug-store-pic">
                <block v-if="item.enterpriseImage">
                  <image
                    :src="BASE_URL + item.enterpriseImage"
                    mode="aspectFill"
                  ></image>
                </block>
                <block v-else>
                  <image
                    :src="IMAGE_BASE_URL + 'icons/drugIcon.png'"
                    mode="aspectFill"
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
                    v-for="(label, index1) in item.featureLabel"
                    :key="index1"
                  >
                    <text class="medicare-label">{{ label }}</text>
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
                      <block v-if="item.businessHours && item.businessHoursEnd">
                        <view class="drug-bus-time-info">
                          <text class="start-time"
                            >{{ item.businessHours }} -</text
                          >
                          <text class="end-time">{{
                            item.businessHoursEnd
                          }}</text>
                        </view>
                      </block>
                      <block v-else>
                        <view class="drug-bus-time-info">
                          <text class="start-time">暂无营业时间信息</text>
                        </view>
                      </block>
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
                    <view class="drug-dist">{{
                      format.locationFormat(item.distance)
                    }}</view>
                  </view>
                  <!-- 右侧信息 END -->
                </view>
                <!-- 药店其他信息 END -->
              </view>
            </view>
            <view class="bubble-holder" :data-id="item.drugId"></view>
          </view>
        </block>
      </view>
    </scroll-view>
    <!-- 列表模式 END -->

    <!-- 地图模式 -->
    <view class="map-wrapper" v-if="showMode">
      <map
        id="map"
        @markertap.stop.prevent="drugStoreMarkerEvent"
        @tap.stop.prevent="handleTapMap"
        :longitude="searches.longitude"
        :latitude="searches.latitude"
        :markers="markers"
      >
        <view class="map-legend">
          <block v-for="(item, index) in classifyList" :key="index">
            <view class="map-legend-item">
              <image
                class="map-legend-icon"
                :src="IMAGE_BASE_URL + item.icon"
              ></image>
              <view class="map-legend-title">{{ item.title }}</view>
            </view>
          </block>
        </view>
      </map>
    </view>
    <!-- 地图模式 END -->

    <!-- 当前点击药店 -->
    <view
      :class="
        'shadow-wrapper cur-store-wrapper ' + (isStoreShow ? 'show' : 'hide')
      "
      @tap.stop.prevent="toDrugDetail"
      :data-id="curDrugStore.drugId"
      v-if="showMode"
    >
      <view class="cur-store-name">
        <view>{{ curDrugStore.enterpriseName }}</view>
        <text class="iconfont icon-jiantou"></text>
      </view>
      <view class="cur-info-wrapper">
        <!-- 其他信息 -->
        <view class="cur-other-content">
          <view class="drug-bus-time">
            <view class="icon-shizhong iconfont drug-bus-time-icon"></view>
            <block
              v-if="curDrugStore.businessHours && curDrugStore.businessHoursEnd"
            >
              <view class="cur-busi-time">
                <text class="start-time"
                  >{{ curDrugStore.businessHours }} -</text
                >
                <text class="end-time">{{
                  curDrugStore.businessHoursEnd
                }}</text>
              </view>
            </block>
            <block v-else>
              <view class="cur-busi-time">
                <text class="start-time">暂无营业时间信息</text>
              </view>
            </block>
          </view>
          <view class="drug-bus-address">
            <text
              class="icon-jiantouarrow591 iconfont drug-bus-time-icon"
            ></text>
            <view class="cur-address">{{
              curDrugStore.drugstoreLocation
            }}</view>
          </view>
        </view>
        <!-- 其他信息 END -->
        <!-- 右侧信息 -->
        <view class="drug-other-right">
          <view class="drug-dist">{{
            curDrugStore.distance &&
            format.locationFormat(curDrugStore.distance)
          }}</view>
        </view>
        <!-- 右侧信息 END -->
      </view>
    </view>
    <!-- 当前点击药店 END -->

    <!-- 过滤popup -->
    <custom-popup
      :isShow="isShow"
      height="calc( 100% - 87rpx )"
      width="526rpx"
      position="right"
    >
      <view class="filter-panel-wrapper">
        <!-- 药店分类 -->
        <view class="drug-classify">药店分类</view>
        <!-- 药店分类 -->

        <!-- 分类标签 -->
        <view class="classify-label-wrapper">
          <block v-for="(item, index) in classifyList" :key="index">
            <view class="label-item" @tap.stop.prevent="drugSelectedFun">
              <view
                :class="
                  'label-style ' + (item.id === drugSelected ? 'selected' : '')
                "
                :data-id="item.id"
                >{{ item.title }}</view
              >
            </view>
          </block>
        </view>
        <!-- 分类标签 END -->

        <!-- 距离 -->
        <view class="drug-classify">距离</view>
        <!-- 距离 END -->

        <!-- 分类标签 -->
        <view class="classify-label-wrapper">
          <block v-for="(item, index) in distRange" :key="index">
            <view class="label-item" @tap.stop.prevent="handleDistRangeChange">
              <view
                :class="
                  'label-style ' +
                  (item.id === distRangeScale ? 'selected' : '')
                "
                :data-id="item.id"
                >{{ item.title }}</view
              >
            </view>
          </block>
        </view>
        <!-- 分类标签 END -->

        <!-- 更多 -->
        <view class="drug-classify">更多</view>
        <!-- 更多 -->

        <!-- 分类标签 -->
        <view class="classify-label-wrapper">
          <block v-for="(item, index) in moreList" :key="index">
            <view class="label-item" @tap.stop.prevent="busSelected">
              <view
                :class="
                  'label-style ' + (item.id === isBusSelected ? 'selected' : '')
                "
                :data-id="item.id"
                >{{ item.title }}</view
              >
            </view>
          </block>
        </view>
        <!-- 分类标签 END -->

        <!-- 操作栏 -->
        <view class="operating-panel">
          <view class="reset" @tap.stop.prevent="handleSeacrhReset">重置</view>
          <view class="comfirm" @click="handleSearchComrirm">确定</view>
        </view>
        <!-- 操作栏 END -->
      </view>
    </custom-popup>
    <!-- 过滤popup END -->
  </view>
</template>
<script module="format" lang="wxs" src="@/wxsFormat/format.wxs"></script>
<script>
import customPopup from "../../components/custom-popup/index";
import { IMAGE_BASE_URL, BASE_URL } from "../../common/config";
import Api from "../../apis/apis"
import * as util from "../../common/common";
import location from "../../common/location";
let app = getApp().globalData;
const MARKER_DELAY = 100;
const LABEL_SET = ["YB00", "24XS00"];
export default {
  components: {
    customPopup,
  },
  data() {
    return {
      key: app.key,

      //经度
      longitude: 113.423135,

      //纬度
      latitude: 23.105878,

      IMAGE_BASE_URL,
      BASE_URL,
      isShow: false,
      showMode: true,
      isStoreShow: false,

      //药店类型
      classifyList: [
        {
          id: 0,
          title: "24小时",
          icon: "hours_24.png",
          category: 1,
        },
        {
          id: 1,
          title: "医保药店",
          icon: "HIS.png",
          category: 2,
        },
        {
          id: 2,
          title: "普通药店",
          icon: "primary.png",
          category: 3,
        },
      ],

      searches: {
        //是否营业中
        business: null,
        //药店类型
        category: null,
        //距离
        distance: 500,
        //经纬度
        latitude: 28.674543,
        longitude: 113.423135,
      },

      //距离区间
      distRange: [
        {
          id: 0,
          title: "500米内",
          icon: "hours_24.png",
          distance: 500,
        },
        {
          id: 1,
          title: "1.5公里",
          icon: "HIS.png",
          distance: 1500,
        },
        {
          id: 2,
          title: "3公里",
          icon: "primary.png",
          distance: 3000,
        },
      ],

      //更多
      moreList: [
        {
          id: 0,
          title: "全部",
          business: null,
        },
        {
          id: 1,
          title: "营业中",
          business: 1,
        },
      ],

      //药店分类
      drugSelected: null,

      //是否营业
      isBusSelected: 0,

      //距离单位
      distRangeScale: 0,

      //附近药店列表
      nearbyDrugList: [],

      //附近药店标记点
      markers: [],

      //当前点击药店
      curDrugStore: {
        drugId: "",
        enterpriseName: "",
        businessHours: "",
        businessHoursEnd: "",
        drugstoreLocation: "",
        distance: "",
      },

      label: "",
    };
  },
  onLoad() {
    this.setData({
      longitude: app.location.longitude,
      latitude: app.location.latitude,
    });
    this.getCuruserLocation();
  },
  methods: {
    //查看药店详情
    toDrugDetail(e) {
      let { id } = e.currentTarget.dataset;
      let { id: listId } = e.target.dataset;
      uni.navigateTo({
        url: `/pages/drugSore-detail/index?id=${id ? id : listId}`,
      });
    },

    //药店标记点事件触发
    drugStoreMarkerEvent(e) {
      let { markerId } = e.detail;
      let curDrugStore = this.nearbyDrugList.find(
        (item) => item.id === markerId
      );
      setTimeout(
        () =>
          this.setData({
            curDrugStore,
            isStoreShow: true,
          }),
        MARKER_DELAY
      );
    },

    //侧边栏Popup事件
    showFilterPanel() {
      this.setData({
        isShow: true,
      });
    },

    //侧边过滤栏 药店类型事件
    drugSelectedFun(e) {
      let { id } = e.target.dataset;
      if (id === this.drugSelected) {
        return this.setData({
          drugSelected: null,
          ["searches.category"]: null,
        });
      }
      this.setData({
        drugSelected: id,
      });
    },

    //距离切换
    handleDistRangeChange(e) {
      let { id } = e.target.dataset;
      this.setData({
        distRangeScale: id,
      });
    },

    //搜索条件过滤
    handleSearchComrirm() {
      let {
        drugSelected,
        distRangeScale,
        classifyList,
        distRange,
        isBusSelected,
        moreList,
        searches,
      } = this;
      let category =
        drugSelected !== null ? classifyList[drugSelected].category : null;
      let distance = distRange[distRangeScale].distance;
      let business = moreList[isBusSelected].business;
      searches = {
        ...searches,
        ...{
          category,
          distance,
          business,
        },
      };
      this.setData(
        {
          searches,
          isShow: false,
        },
        () => {
          this.getDrugStoreList();
        }
      );
    },

    //重置搜索条件
    handleSeacrhReset() {
      let {
        drugSelected,
        moreList,
        distRangeScale,
        isBusSelected,
        distRange,
        searches,
      } = this;
      let category = (drugSelected = null);
      distRangeScale = 0;
      let distance = distRange[distRangeScale].distance;
      isBusSelected = 0;
      let business = moreList[isBusSelected].business;
      searches = {
        ...searches,
        ...{
          category,
          distance,
          business,
        },
      };
      this.setData(
        {
          drugSelected,
          distRangeScale,
          isBusSelected,
          moreList,
          searches,
          isShow: false,
        },
        () => {
          this.getDrugStoreList();
        }
      );
    },

    //点击地图 事件
    handleTapMap(e) {
      this.setData({
        isStoreShow: false,
      });
    },

    //侧边过滤栏 药店营业时间过滤事件
    busSelected(e) {
      let { id } = e.target.dataset;
      this.setData({
        isBusSelected: id,
      });
    },

    //切换为列表显示
    showStoreList() {
      this.setData({
        showMode: !this.showMode,
        isStoreShow: false,
      });
    },

    //获取maker
    getStoreMakers() {
      //处理不同药店的point
      let markers = [];
      let nearbyDrugList = this.handleCreateFieldOfMarkser(this.nearbyDrugList);
      //处理列表不同中不同类型的point 按照列表顺序生成
      for (const storePoint of nearbyDrugList) {
        markers.push({
          ...this.handlePointType(
            {
              ...storePoint,
            },
            ["YB00", "24XS00", "latitude", "longitude", "id"]
          ),
        });
      }
      this.setData({
        markers,
        nearbyDrugList,
      });
    },

    /**
     * @description 处理标记点类型
     * @returns { Object }
     */
    handlePointType(target, typeList) {
      let initialPonit = {};
      //医保药店
      const MEDICARE_DRUG_STORE = `${IMAGE_BASE_URL}map_icons/medical.png`;
      //24小时药店
      const TWENTYHOURS_H_DRUG_STORE = `${IMAGE_BASE_URL}map_icons/24_hours.png`;
      //普通药店
      const PRIMARY_DRUG_STORE = `${IMAGE_BASE_URL}map_icons/primary.png`;
      //point size
      const ICON_SIZE = {
        width: "55",
        height: "60",
      };

      //抽取指定属性进行类型判断
      for (let v of typeList) {
        v in target ? (initialPonit[v] = target[v]) : void 0;
      }
      // 普通药店
      if (!initialPonit.YB00 && !initialPonit["24XS00"]) {
        initialPonit.iconPath = PRIMARY_DRUG_STORE;
      }

      //其他类型药店
      if (initialPonit.YB00 && initialPonit["24XS00"]) {
        initialPonit.iconPath = MEDICARE_DRUG_STORE;
      } else {
        if (initialPonit.YB00) {
          initialPonit.iconPath = MEDICARE_DRUG_STORE;
        }
        if (initialPonit["24XS00"]) {
          initialPonit.iconPath = TWENTYHOURS_H_DRUG_STORE;
        }
      }
      delete initialPonit["24XS00"];
      delete initialPonit.YB00;
      return {
        ...initialPonit,
        ...ICON_SIZE,
      };
    },

    /**
     * @description 处理药店标签生成对应字段用于icon生成
     * @param { Array } 处理列表
     * @param { Array } 处理目标数组
     * @return { Array }
     */
    handleCreateFieldOfMarkser(target, targetKey = "featureLabelCode") {
      let drugList = target;
      if (!Array.isArray(target)) {
        return;
      }
      for (let drugStoreItem of drugList) {
        // 没有标签为false
        if (!drugStoreItem[targetKey]) {
          LABEL_SET.forEach((label) => {
            drugStoreItem[label] = 0;
          });
          drugStoreItem["featureLabel"] = [];
          continue;
        }
        let labelList = drugStoreItem[targetKey].split(",");
        drugStoreItem["featureLabel"] =
          drugStoreItem["featureLabel"].split(",");

        //使用值做为字段key
        labelList.forEach((label) => {
          // 存在标签则生成对应字段
          LABEL_SET.includes(label)
            ? (drugStoreItem[label] = 1)
            : (drugStoreItem[label] = 0);
        });
      }
      return drugList;
    },

    /**
     * @description 获取附近药店列表
     * @param { Number } latitude 纬度
     * @param { Number } longitude 经度
     * @returns { Array }
     */
    getDrugStoreList() {
      let { searches } = this;
      util.Loading();
      Api.getNearbyDrugstoreList(searches)
        .then((res) => {
          util.HideLoading();
          const { code, data: nearbyDrugList } = res.data;
          if (code !== 200) {
            return util.Toast({
              title: "获取附近药店信息失败",
            });
          }
          this.setData(
            {
              nearbyDrugList: nearbyDrugList
                ? nearbyDrugList.map((drugstoreItem, index) => {
                    let {
                      id: drugId,
                      drugstoreLatitude: latitude,
                      drugstoreLongitude: longitude,
                      ...rest
                    } = drugstoreItem;
                    drugstoreItem.enterpriseImage
                      ? drugstoreItem.enterpriseImage.split(",")[0]
                      : void 0;
                    return {
                      ...rest,
                      drugId,
                      id: index + 1,
                      latitude: parseFloat(latitude),
                      longitude: parseFloat(longitude),
                    };
                  })
                : [],
            },
            () => this.getStoreMakers()
          );
        })
        .catch((err) => {
          // util.Toast({
          //   title: "请求超时失败",
          // });
        });
    },

    //获取当前下用户位置信息
    getCuruserLocation() {
      let { searches } = this;
      // console.log(navigator.geolocation.getCurrentPosition);
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(
      //     (res) => {
      //       // searches.latitude = res.latitude;
      //       // searches.longitude = res.longitude;
      //       Tip.Toast({
      //         title: JSON.stringify(res),
      //       });
      //       this.getDrugStoreList();
      //     },
      //     (err) => {
      //       console.log(err);
      //     },
      //     { timeout: 2000 }
      //   );
      // }

      // 原wx小程序获取地址逻辑;
      // 位置信息授权;
      location(
        //获取位置成功逻辑  设置经纬度获取附近药店
        (locationMessage) => {
          let { lat: latitude, lng: longitude } =
            locationMessage.result.location;
          searches.latitude = latitude;
          searches.longitude = longitude;
          this.setData(
            {
              searches,
            },
            () => {
              this.getDrugStoreList();
            }
          );
        },
        //获取位置失败逻辑
        (err) => {
          this.getDrugStoreList();
        }
      );
    },
  },
};
</script>
<style>
@import "./index.css";
</style>
