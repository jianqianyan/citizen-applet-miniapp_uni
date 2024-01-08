<template>
  <view class="inquire-container">
    <view class="inquire-wrapper">
      <view class="search-wrapper shadow-wrapper">
        <text class="icon-search iconfont search-icon"></text>
        <input
          type="text"
          placeholder-class="input-holder"
          :placeholder="searchHolder"
          @blur="handleFocusEvent"
          @focus="handleFocusEvent"
          @input="handleInputEvent"
          @confirm="handleComfirm"
          confirm-type="search"
          :value="keyWord"
          hold-keyboard
        />
      </view>
      <view
        class="search-cancel"
        v-if="isInput"
        @tap.stop.prevent="handleCancelEvent"
        >取消</view
      >
    </view>

    <!-- tab栏切换 -->
    <view class="search-tab" v-if="!keyWord && !searchKeyword">
      <view class="tab-list-wrapper">
        <block v-for="(item, index) in tabList" :key="index">
          <view
            :class="
              'tab-list-item ' + (selected === item.sign ? 'selected' : '')
            "
            @tap.stop.prevent="handleSelected"
            :data-sign="item.sign"
          >
            {{ item.title }}
          </view>
        </block>
      </view>
    </view>
    <!-- tab栏切换 END -->
    <!-- 背景占位 -->
    <!-- 背景占位 -->
    <!-- 顶部搜索栏占位 -->
    <!-- 顶部搜索栏占位 END -->

    <!-- 搜索结果 -->
    <view class="profile-cotent-wrapper">
      <!-- 药品信息 -->
      <view
        v-if="selected === 0 && searchResOfDurgList.length !== 0"
        @tap.stop.prevent="toDurgDel"
      >
        <view
          class="profile-info shadow-wrapper"
          v-for="(drugItem, index) in searchResOfDurgList"
          :key="index"
        >
          <view class="drug-wrapper">
            <!-- 药品缩略图 -->
            <view class="drug-thumb">
              <image
                :src="
                  drugItem.medicineImage
                    ? drugItem.medicineImage
                    : '/static/images/drug.svg'
                "
                mode="aspectFill"
              >
              </image>
            </view>
            <!-- 药品缩略图 END -->
            <!-- 药品简略信息 -->
            <view class="drug-info-wrapper">
              <view class="drug-name">{{
                drugItem.drugGenericName ? drugItem.drugGenericName : "无"
              }}</view>
              <!-- 批准文号 -->
              <view class="line-info-wrapper">
                <text class="label">批准文号:</text>
                <text class="content">{{
                  drugItem.approvalNo ? drugItem.approvalNo : "无"
                }}</text>
              </view>
              <!-- 批准文号 END -->
              <view class="line-info-wrapper">
                <text class="label">生产厂家:</text>
                <text class="content">{{
                  drugItem.domesticProduceEnterpriseName
                    ? drugItem.domesticProduceEnterpriseName
                    : "无"
                }}</text>
              </view>
              <view class="line-info-wrapper">
                <text class="label">规格:</text>
                <text class="content">{{
                  drugItem.packageSize ? drugItem.packageSize : ""
                }}</text>
              </view>
            </view>
            <!-- 药品简略信息 END -->
            <view class="bubble-holder" :data-drug-item="drugItem"></view>
          </view>
        </view>
        <!-- 药品信息 END -->
      </view>
      <!-- 药店信息 -->
      <view
        v-if="selected === 1 && searchResOfDurgStoreList.length !== 0"
        @tap.stop.prevent="toDrugstoreDel"
      >
        <view
          class="profile-info shadow-wrapper"
          v-for="(drugstoreItem, index) in searchResOfDurgStoreList"
          :key="index"
        >
          <view class="cur-sold-item">
            <block v-if="drugstoreItem.enterpriseImage">
              <view class="drug-store-pic">
                <image
                  :src="BASE_URL + drugstoreItem.enterpriseImage"
                  mode="aspectFill"
                ></image>
              </view>
            </block>

            <!-- 无图片显示临时图片 -->
            <block v-else>
              <view class="drug-store-pic">
                <image
                  :src="`/static/images/icons/drugIcon.png`"
                  mode="aspectFill"
                ></image>
              </view>
            </block>
            <view class="drug-store-info">
              <!-- 详细地址及图片信息 -->
              <view class="drug-store-address">
                <text class="text-overflow address-text-style">{{
                  drugstoreItem.enterpriseName
                }}</text>
                <text class="iconfont icon-jiantou"></text>
              </view>
              <!-- 详细地址及图片信息 END -->
              <!-- 标签 -->
              <view class="drug-label-wrapper">
                <block
                  v-for="(tag, tagIndex) in drugstoreItem.featureLabel"
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
                    <block
                      v-if="
                        drugstoreItem.businessHours &&
                        drugstoreItem.businessHoursEnd
                      "
                    >
                      <text class="start-time"
                        >{{ drugstoreItem.businessHours }} -</text
                      >
                      <text class="end-time">{{
                        drugstoreItem.businessHoursEnd
                      }}</text>
                    </block>
                    <block v-else>
                      <text class="">无营业时间信息</text>
                    </block>
                  </view>
                  <view class="drug-bus-address">
                    <text
                      class="icon-jiantouarrow591 iconfont drug-bus-time-icon"
                    ></text>
                    <text class="drug-bus-address-info">{{
                      drugstoreItem.drugstoreLocation
                    }}</text>
                  </view>
                </view>
                <!-- 左侧信息 END -->
                <!-- 右侧信息 -->
                <block v-if="drugstoreItem.distance">
                  <view class="drug-other-right">
                    <view class="drug-dist"
                      >{{
                        drugstoreItem.distance &&
                        format.locationFormat(drugstoreItem.distance)
                      }}
                    </view>
                  </view>
                </block>
                <!-- 右侧信息 END -->
              </view>
              <!-- 药店其他信息 END -->
            </view>
            <view class="bubble-holder" :data-id="drugstoreItem.id"></view>
          </view>
        </view>
      </view>
      <!-- 药店信息 END -->
    </view>
    <!-- 搜索结果 END -->

    <!-- 药品标签 -->
    <view class="scroll-style" v-if="selected === 0 && !keyWord">
      <scroll-view scroll-y>
        <!-- 历史查询 -->
        <view class="label-wrapper">
          <view class="label-title-wrapper">
            <text class="search-label-title">历史查询</text>
            <text
              class="iconfont icon-lajitongshanchu"
              @tap.stop.prevent="handleClearCache"
            ></text>
          </view>
          <block v-if="historySearchSet.length !== 0">
            <view class="label-filed" @tap.stop.prevent="handleHistoryCache">
              <block v-for="(label, index) in historySearchSet" :key="index">
                <text class="label-style" :data-drug-name="label.name">{{
                  label.name
                }}</text>
              </block>
            </view>
          </block>
          <block v-else>
            <view class="label-filed">
              <text class="history-hint">暂无搜索记录</text>
            </view>
          </block>
        </view>
        <!-- 历史查询 END -->
        <!-- 热门查询 -->
        <view class="label-wrapper">
          <view class="label-title-wrapper">
            <text class="search-label-title">热门查询</text>
          </view>
          <view class="label-filed" @tap.stop.prevent="handleSearchOfHot">
            <block v-for="(label, index) in hotMedicineSet" :key="index">
              <text
                class="label-style"
                :data-drug-name="label.drugGenericName"
                >{{ label.drugGenericName }}</text
              >
            </block>
          </view>
        </view>
        <!-- 热门查询 END -->
        <!-- 常用分类 -->
        <!-- <view class="label-wrapper">
                <view class="label-title-wrapper">
                    <text class="search-label-title">常用分类</text>
                </view>
                <view class="tag-filed">
                    <view class="tag-filed-item">
                        <text class="tag-style">保健药品</text>
                    </view>
                    <view class="tag-filed-item">
                        <text class="tag-style">保健药品</text>
                    </view>
                    <view class="tag-filed-item">
                        <text class="tag-style">保健药品</text>
                    </view>
                    <view class="tag-filed-item">
                        <text class="tag-style">保健药品</text>
                    </view>
                    <view class="tag-filed-item">
                        <text class="tag-style">保健药品</text>
                    </view>
                    <view class="tag-filed-item">
                        <text class="tag-style">保健药品</text>
                    </view>
                </view>                
            </view> -->
        <!-- 常用分类 END -->
      </scroll-view>
    </view>
    <!-- 药品标签 END -->

    <!-- 药店标签 -->
    <view class="scroll-style" v-if="selected === 1 && !keyWord">
      <scroll-view scroll-y>
        <!-- <view class="label-wrapper">
                <view class="label-title-wrapper">
                    <text class="search-label-title">历史查询</text>
                    <text class="iconfont icon-lajitongshanchu"></text>
                </view>
                <view class="label-filed">
                    <text class="label-style">糠酸莫米松乳膏</text>
                    <text class="label-style">糠酸莫米松乳膏</text>
                    <text class="label-style">糠酸莫米</text>
                    <text class="label-style">【安博维厄贝沙坦片】厄贝沙坦片</text>
                </view>
            </view> -->
        <!-- 特色标签 -->
        <view
          class="label-wrapper"
          @tap.stop.prevent="handleSearchFeatureLabel"
        >
          <view class="label-title-wrapper">
            <text class="search-label-title">特色标签</text>
          </view>
          <view class="label-filed">
            <block v-for="(label, index) in featureLabelSet" :key="index">
              <text
                class="label-style"
                :data-code="label.code"
                :data-name="label.name"
                >{{ label.name }}</text
              >
            </block>
          </view>
        </view>
        <!-- 特色标签 END -->
        <!-- 特色服务 -->
        <view
          class="label-wrapper"
          @tap.stop.prevent="handleSearchFeatureService"
        >
          <view class="label-title-wrapper">
            <text class="search-label-title">特色服务</text>
          </view>
          <view class="label-filed">
            <block v-for="(label, index) in featureServiceSet" :key="index">
              <text
                class="label-style"
                :data-code="label.code"
                :data-name="label.name"
                >{{ label.name }}</text
              >
            </block>
          </view>
        </view>
        <!-- 特色服务 END -->

        <!-- 便民服务 -->
        <view
          class="label-wrapper"
          @tap.stop.prevent="handleSearchHandyService"
        >
          <view class="label-title-wrapper">
            <text class="search-label-title">便民服务</text>
          </view>
          <view class="tag-filed">
            <block v-for="(label, index) in handyServiceSet" :key="index">
              <view class="tag-filed-item">
                <text
                  class="tag-style"
                  :data-code="label.code"
                  :data-name="label.name"
                  >{{ label.name }}</text
                >
              </view>
            </block>
          </view>
        </view>
        <!-- 常用分类 END -->
      </scroll-view>
    </view>
    <!-- 药店标签 END -->

    <!-- 搜索结果为空 -->
    <view
      v-if="
        searchResOfDurgList.length === 0 &&
        searchResOfDurgStoreList.length === 0
      "
      class="empty-wrapper"
    >
      <view class="empty-icon">
        <image :src="IMAGE_BASE_URL + 'empty.svg'" mode="aspectFill"></image>
        <text class="empty-hint">没有搜索到结果</text>
      </view>
    </view>
    <!-- 搜索结果为空 END -->
  </view>
</template>
<script module="format" lang="wxs" src="@/wxsFormat/format.wxs"></script>
<script>
import Api from "../../apis/apis";
import * as util from "../../common/common";
import { _debounce } from "../../utils/util";
import { IMAGE_BASE_URL, BASE_URL } from "../../common/config";
let app = getApp().globalData;
export default {
  data() {
    return {
      IMAGE_BASE_URL,
      BASE_URL,

      // 是否正在输入
      isInput: false,

      // cur tab-item
      selected: 0,

      // tab过滤栏
      tabList: [
        {
          title: "药品查询",
          sign: 0,
        },
        {
          title: "药店查询",
          sign: 1,
        },
      ],

      // search holder
      searchHolder: "查药品",

      keyWord: "",
      searchKeyword: "",

      //药店分页器
      drugStoreSearches: {
        pageSize: 10,
        pageNum: 1,
        handyServiceCode: null,
        featureServiceCode: null,
        featureLabelCode: null,
        name: "",
        latitude: app.location.latitude,
        longitude: app.location.longitude,
        regionCode: uni.$global.curRegion.regionCode,
        level: uni.$global.curRegion.level,
      },

      //药店搜索条件
      drugSearches: {
        pageSize: 10,
        pageNum: 1,
      },

      //药品列表总数
      drugTotal: 0,

      //药店列表总数
      drugstoreTotal: 0,

      // 搜索药品列表
      searchResOfDurgList: [],

      //搜索药店列表
      searchResOfDurgStoreList: [],

      // 特色标签
      featureLabelSet: [],

      // 特色服务
      featureServiceSet: [],

      // 便民服务
      handyServiceSet: [],

      //热门药品
      hotMedicineSet: [],

      isEmpty: false,

      // 语音播报检索控制条件
      voiceStatus: 0,

      //历史查询
      historySearchSet: [],

      drugItem: {
        medicineImage: false,
        drugGenericName: false,
        approvaNo: false,
        domesticProduceEnterpriseName: false,
        packageSize: false,
      },

      drugstoreItem: {
        enterpriseImage: "",
        enterpriseName: "",
        featureLabel: [],
        businessHours: "",
        businessHoursEnd: "",
        drugstoreLocation: "",
        distance: "",
        id: "",
      },

      tagIndex: 0,
      tag: "",

      label: {
        name: "",
        drugGenericName: "",
        code: "",
      },
    };
  },
  onLoad(options) {
    let { type, state } = options;
    let cache = uni.getStorageSync("his_search_drug");
    if (type) {
      this.setData({
        selected: +type,
        voiceStatus: state,
        searchHolder: type === 0 ? "查药品" : "查药店",
        historySearchSet: cache ? JSON.parse(cache) : [],
      });
    }
    this.getSystemConfig();
  },
  //触底加载
  onReachBottom() {
    let {
      selected,
      drugStoreSearches,
      drugSearches,
      drugTotal,
      drugstoreTotal,
    } = this;
    // 为药品时
    if (selected === 0) {
      if (drugSearches.pageSize * drugSearches.pageNum < drugTotal) {
        drugSearches.pageNum++;
        this.setData(
          {
            drugSearches,
          },
          () => {
            this.getDrugList();
          }
        );
      }
    } else {
      if (
        drugStoreSearches.pageSize * drugStoreSearches.pageNum <
        drugstoreTotal
      ) {
        drugStoreSearches.pageNum++;
        this.setData(
          {
            drugStoreSearches,
          },
          () => {
            this.getDrugstoreList();
          }
        );
      }
    }
  },
  methods: {
    // tab event
    handleSelected(e) {
      let { sign } = e.currentTarget.dataset;
      this.setData({
        selected: sign,
        searchHolder: sign ? "查药店" : "查药品",
      });
    },

    //blur focus
    handleFocusEvent(e) {
      this.setData({
        isInput: !this.isInput,
      });
    },

    // cancel event
    handleCancelEvent() {
      uni.hideKeyboard();
      this.setData({
        keyWord: "",
        isEmpty: false,
        searchResOfDurgList: [],
        searchResOfDurgStoreList: [],
      });
    },

    // input event(接入防抖)
    handleInputEvent: _debounce(function (e) {
      console.log("yo");
      let { searchResOfDurgList, searchResOfDurgStoreList, drugStoreSearches } =
        this;
      let { value } = e.detail;

      //输入框为空时 清除重置数据\信息
      if (!value.trim()) {
        drugStoreSearches.handyServiceCode = null;
        drugStoreSearches.featureServiceCode = null;
        drugStoreSearches.featureLabelCode = null;
        searchResOfDurgList = [];
        searchResOfDurgStoreList = [];
        return this.setData({
          searchKeyword: "",
          keyWord: "",
          searchResOfDurgList,
          searchResOfDurgStoreList,
          drugStoreSearches,
        });
      }

      //搜索结果为空时重置信息
      // if( searchResOfDurgList.length !== 0 || searchResOfDurgStoreList.length !== 0 ) {
      //   searchResOfDurgList = [];
      //   searchResOfDurgStoreList = [];

      //   this.setData({
      //     searchResOfDurgList,
      //     searchResOfDurgStoreList
      //   })
      // }
    }, 500),

    handleComfirm(e) {
      let { value } = e.detail;
      if (!value) {
        return;
      }
      this.searchResOfDurgStoreList = [];
      this.selected === 0
        ? this.handleSearchDrug(value)
        : this.handleSearchDrugStore(value);
    },

    // 搜药品
    handleSearchDrug(keyWord) {
      this.setData(
        {
          keyWord,
        },
        () => {
          let { keyWord } = this;
          this.getDrugList();
        }
      );
    },

    //搜药店
    handleSearchDrugStore(keyWord) {
      this.setData(
        {
          keyWord,
        },
        () => {
          this.getDrugstoreList();
        }
      );
    },

    //热门查询
    handleSearchOfHot(event) {
      let { drugName: keyWord } = event.target.dataset;
      this.setData(
        {
          keyWord,
        },
        () => {
          this.getDrugList();
        }
      );
    },

    //药品缓存查询
    handleHistoryCache(event) {
      let { drugName: keyWord } = event.target.dataset;
      this.setData(
        {
          keyWord,
        },
        () => {
          this.getDrugList();
        }
      );
    },

    //特色标签查询
    handleSearchFeatureLabel(event) {
      let { drugStoreSearches } = this;
      let { code, name: searchKeyword } = event.target.dataset;
      drugStoreSearches.featureLabelCode = code;
      if (code) {
        this.setData(
          {
            searchKeyword,
            drugStoreSearches,
          },
          () => {
            this.getDrugstoreList();
          }
        );
      }
    },

    //特色服务查询
    handleSearchFeatureService(event) {
      let { drugStoreSearches } = this;
      let { code, name: searchKeyword } = event.target.dataset;
      drugStoreSearches.featureServiceCode = code;
      if (code) {
        this.setData(
          {
            searchKeyword,
            drugStoreSearches,
          },
          () => {
            this.getDrugstoreList();
          }
        );
      }
    },

    //便民服务查询
    handleSearchHandyService(event) {
      let { drugStoreSearches } = this;
      let { code, name: searchKeyword } = event.target.dataset;
      drugStoreSearches.handyServiceCode = code;
      if (code) {
        this.setData(
          {
            searchKeyword,
            drugStoreSearches,
          },
          () => {
            this.getDrugstoreList();
          }
        );
      }
    },

    //搜索缓存
    handleSearchCache(keyword) {
      let cache = uni.getStorageSync("his_search_drug")
        ? JSON.parse(uni.getStorageSync("his_search_drug"))
        : [];
      if (cache.length === 0) {
        cache = [
          {
            name: keyword,
          },
        ];
        uni.setStorageSync("his_search_drug", JSON.stringify(cache));
      } else {
        if (!cache.some((item) => item.name === keyword)) {
          console.log("yo", cache);
          cache = [
            ...cache,
            {
              name: keyword,
            },
          ];
          uni.setStorageSync("his_search_drug", JSON.stringify(cache));
        }
      }
      this.setData({
        historySearchSet: cache,
      });
    },

    //清除缓存
    handleClearCache() {
      util
        .Dialog({
          title: "提示",
          content: "确认要清除历史搜索记录",
        })
        .then((res) => {
          if (res.confirm) {
            uni.removeStorageSync("his_search_drug");
            this.setData({
              historySearchSet: [],
            });
          }
        });
    },

    //查询药店信息
    getDrugstoreList() {
      let { searchKeyword, keyWord, drugStoreSearches, isEmpty } = this;
      util.Loading();
      Api.getDrugStoreList({
        ...drugStoreSearches,
        ...{
          name: keyWord ? (searchKeyword = keyWord) : void 0,
        },
      })
        .then((res) => {
          if (res.data.code !== 200) {
            return util
              .Toast({
                title: "请求失败，获取搜索结果失败",
              })
              .then(() => {
                if (isEmpty) {
                  this.setData({
                    isEmpty: false,
                  });
                }
              });
          }
          util.HideLoading();
          let {
            data: { records: searchResOfDurgStoreList, total: drugstoreTotal },
          } = res.data;
          searchResOfDurgStoreList = searchResOfDurgStoreList.map(
            (drugItem) => {
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
            }
          );
          //

          this.setData({
            searchResOfDurgStoreList: [
              ...this.searchResOfDurgStoreList,
              ...searchResOfDurgStoreList,
            ],
            drugstoreTotal,
            keyWord: searchKeyword,
            isEmpty: searchResOfDurgStoreList.length !== 0 ? true : false,
          });
        })
        .catch((err) => {
          util
            .Toast({
              title: "请求失败，获取搜索结果失败",
            })
            .then((res) => {
              if (isEmpty) {
                this.setData({
                  isEmpty: false,
                });
              }
            });
        });
    },

    //查询药品信息
    //查询药品信息
    getDrugList() {
      let { keyWord, drugSearches, isEmpty } = this;
      let params = {
        ...drugSearches,
        keyWord,
      };
      if (this.voiceStatus) {
        this.getToDescList(params, isEmpty, keyWord);
      } else {
        this.getList(params, isEmpty, keyWord);
      }
    },

    // 获取直接查询的药品信息
    getList(params, isEmpty, keyWord) {
      util.Loading();
      Api.getDrugList(params)
        .then((res) => {
          if (res.data.code !== 200) {
            return util
              .Toast({
                title: "请求失败，获取搜索结果失败",
              })
              .then(() => {
                if (isEmpty) {
                  this.setData({
                    isEmpty: false,
                  });
                }
              });
          }

          //设置缓存
          this.handleSearchCache(keyWord);
          util.HideLoading();
          let {
            data: { records: searchResOfDurgList, total: drugTotal },
          } = res.data;
          this.setData({
            searchResOfDurgList: [
              ...this.searchResOfDurgList,
              ...searchResOfDurgList,
            ],
            drugTotal,
            isEmpty: searchResOfDurgList.length !== 0 ? true : false,
          });
        })
        .catch((err) => {
          console.log(err);
          util
            .Toast({
              title: "请求失败，获取搜索结果失败",
            })
            .then((res) => {
              if (isEmpty) {
                this.setData({
                  isEmpty: false,
                });
              }
            });
        });
    },

    // 获取可以语音播报的药品信息
    getToDescList(params, isEmpty, keyWord) {
      util.Loading();
      Api.getDrugToDescList(params)
        .then((res) => {
          if (res.data.code !== 200) {
            return util
              .Toast({
                title: "请求失败，获取搜索结果失败",
              })
              .then(() => {
                if (isEmpty) {
                  this.setData({
                    isEmpty: false,
                  });
                }
              });
          }

          //设置缓存
          this.handleSearchCache(keyWord);
          util.HideLoading();
          let {
            data: { records: searchResOfDurgList, total: drugTotal },
          } = res.data;
          this.setData({
            searchResOfDurgList: [
              ...this.searchResOfDurgList,
              ...searchResOfDurgList,
            ],
            drugTotal,
            isEmpty: searchResOfDurgList.length !== 0 ? true : false,
          });
        })
        .catch((err) => {
          console.log(err);
          util
            .Toast({
              title: "请求失败，获取搜索结果失败",
            })
            .then((res) => {
              if (isEmpty) {
                this.setData({
                  isEmpty: false,
                });
              }
            });
        });
    },

    //获取标签栏
    getSystemConfig() {
      //获取标签栏信息
      Promise.all([
        Api.getDrugFeatureLabel(),
        Api.getDrugFeatureService(),
        Api.getDurgHandyService(),
        Api.getHotMedicine(),
      ])
        .then((labels) => {
          let [
            featureLabelSet,
            featureServiceSet,
            handyServiceSet,
            hotMedicineSet,
          ] = labels;
          this.setData({
            featureLabelSet: featureLabelSet.data.data,
            featureServiceSet: featureServiceSet.data.data,
            handyServiceSet: handyServiceSet.data.data,
            hotMedicineSet: hotMedicineSet.data.data,
          });
        })
        .catch((err) => {
          util.Toast({
            title: "获取标签失败",
          });
        });
    },

    //前往药品详情
    toDurgDel(event) {
      let { drugItem } = event.target.dataset;
      if (this.voiceStatus) {
        uni.navigateTo({
          url: `/pages/drug-illustrate/index?drugDel=${drugItem.instructionsId}`,
        });
      } else {
        uni.navigateTo({
          url: `/pages/drug-details/index?drugDel=${JSON.stringify(drugItem)}`,
        });
      }
    },

    //前往药店详情
    toDrugstoreDel(event) {
      let { id } = event.target.dataset;
      uni.navigateTo({
        url: `/pages/drugSore-detail/index?id=${id}`,
      });
    },
  },
};
</script>
<style>
@import "./index.css";
</style>
