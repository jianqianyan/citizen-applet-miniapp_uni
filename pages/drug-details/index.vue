<template>
  <view class="drug-detail-wrapper">
    <!-- 背景占位 -->
    <view class="background-placeholder"></view>
    <view class="profile-cotent-wrapper">
      <!-- 药品信息总览 -->
      <view class="profile-info shadow-wrapper">
        <!-- 药品缩略图 -->
        <view class="drug-thumb">
          <image
            mode="aspectFill"
            :src="
              drugDel.medicineImage
                ? drugDel.medicineImage
                : '/static/images/drug.svg'
            "
          >
          </image>
        </view>
        <!-- 药品缩略图 END -->

        <!-- 药品名称 -->
        <view class="filed filed-column">
          <view class="label">{{ drugDel.drugGenericName }}</view>
          <!-- <view class="filed-content drug-title-reset">
            <text class="medicare-label">医保</text>
          </view> -->
        </view>
        <!-- 药品名称 END -->

        <!-- 批准文号 -->
        <view class="filed">
          <view class="label">批准文号</view>
          <view class="filed-content">{{ drugDel.approvalNo }}</view>
        </view>
        <!-- 批准文号 END -->

        <!-- 生产厂家 -->
        <view class="filed">
          <view class="label">生产厂家</view>
          <view class="filed-content">{{
            drugDel.domesticProduceEnterpriseName
              ? drugDel.domesticProduceEnterpriseName
              : "无"
          }}</view>
        </view>
        <!-- 生产厂家 END -->

        <!-- 规格 -->
        <view class="filed last-filed">
          <view class="label">规格</view>
          <view class="filed-content">{{ drugDel.packageSize }}</view>
        </view>
        <!-- 规格 END -->

        <!-- 用药提示 -->
        <!-- <view class="filed last-filed">
                <view class="label label-link">用药提示</view>
                <view class="filed-content"></view>
                <text class="iconfont icon-jiantou"></text>
            </view>             -->
        <!-- 用药提示 END -->
      </view>
      <!-- 药品信息总览 END -->

      <!-- 在售列表 -->
      <view class="cur-sold-wrapper shadow-wrapper">
        <view class="cur-sold-title">
          <view class="title-icon"></view>
          当前在售列表
        </view>
        <view class="cur-sold-list">
          <block
            v-for="(drugstoreItem, index) in onsaleDrugstoreLis"
            :key="index"
          >
            <view
              class="cur-sold-item"
              @tap="() => toDrugStoreDetl(drugstoreItem)"
            >
              <view class="cur-sold-item-body">
                <block v-if="drugstoreItem.enterpriseImage">
                  <view class="drug-store-pic">
                    <block v-if="drugstoreItem.enterpriseImage">
                      <image
                        :src="BASE_URL + drugstoreItem.enterpriseImage"
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
                </block>

                <!-- 无图片显示临时图片 -->
                <block v-else>
                  <view class="drug-store-pic">
                    <image
                      :src="IMAGE_BASE_URL + 'icons/drugIcon.png'"
                      mode="aspectFill"
                    ></image>
                  </view>
                </block>

                <view class="drug-store-info">
                  <!-- 详细地址及图片信息 -->
                  <view class="drug-store-address">
                    <text class="text-overflow address-text-style">{{
                      drugstoreItem.companyName
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
                    <view class="drug-other-left">
                      <view class="drug-bus-time">
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
                          <text>无营业时间信息</text>
                        </block>
                      </view>
                    </view>
                    <view class="drug-other-right">
                      <text>库存{{ drugstoreItem.quantityInStock }}件</text>
                    </view>
                  </view>
                  <!-- 药店其他信息 END -->
                </view>
              </view>
              <view class="drug-bus-address">
                <text class="drug-bus-address-info">{{
                  drugstoreItem.drugstoreLocation
                }}</text>
                <view class="drug-dist">{{
                  format.locationFormat(drugstoreItem.distance)
                }}</view>
              </view>
            </view>
          </block>
          <block>
            <!-- 搜索结果为空 -->
            <view v-if="onsaleDrugstoreLis.length === 0" class="empty-wrapper">
              <view class="empty-icon">
                <image
                  :src="IMAGE_BASE_URL + 'empty.svg'"
                  mode="aspectFill"
                ></image>
                <text class="empty-hint">没有搜索到结果</text>
              </view>
            </view>
            <!-- 搜索结果为空 END -->
          </block>
        </view>
      </view>
      <!-- 在售列表 END -->
    </view>
  </view>
</template>
<script module="format" lang="wxs" src="@/wxsFormat/format.wxs"></script>
<script>
import Api from "../../apis/apis";
import * as util from "../../common/common";
import { IMAGE_BASE_URL, BASE_URL } from "../../common/config";
let app = getApp().globalData;
export default {
  data() {
    return {
      IMAGE_BASE_URL,
      BASE_URL,

      //药品详情
      drugDel: {
        medicineImage: false,
        drugGenericName: "",
        approvalNo: "",
        domesticProduceEnterpriseName: false,
        packageSize: "",
      },

      //位置信息
      location: {},

      //页码器
      pagiNation: {
        pageSize: 10,
        pageNum: 1,
      },

      //在售列表
      onsaleDrugstoreLis: [],

      //在售列表总条数
      total: 0,

      drugstoreItem: {
        enterpriseImage: "",
        enterpriseName: "",
        featureLabel: [],
        businessHours: "",
        businessHoursEnd: "",
        drugstoreLocation: "",
      },

      tagIndex: 0,
      tag: "",
    };
  },
  onLoad(options) {
    let { drugDel } = options;
    let { location } = app;
    this.setData({
      drugDel: JSON.parse(drugDel),
      location,
    });
    this.getOnsaleDrugstoreList();
  },
  onReachBottom() {
    let { pagiNation, total } = this;
    console.log(pagiNation, total);
    if (pagiNation.pageNum * pagiNation.pageSize < total) {
      pagiNation.pageNum++;
      this.setData(
        {
          pagiNation,
        },
        () => {
          this.getOnsaleDrugstoreList();
        }
      );
    }
  },
  methods: {
    //获取药品关联的在售药店列表
    getOnsaleDrugstoreList() {
      let {
        pagiNation,
        location,
        drugDel: { id: medicineId },
      } = this;
      const regionCode = uni.getStorageSync("regionCode");
      const params = {
        ...pagiNation,
        latitude: uni.getStorageSync("latitude"),
        longitude: uni.getStorageSync("longitude"),
        regionLevels: uni.getStorageSync("level"),
        regionCode,
        drugGenericName: this.drugDel.drugGenericName,
      };
      Api.getStorePage(params)
        .then((res) => {
          if (res.data.code !== 200) {
            return util.Toast({
              title: "请求列表数据失败",
            });
          }
          console.log(res);
          let {
            data: { records: onsaleDrugstoreLis, total },
          } = res.data;
          onsaleDrugstoreLis = onsaleDrugstoreLis.map((drugItem) => {
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
          });
          this.setData({
            onsaleDrugstoreLis: [
              ...this.onsaleDrugstoreLis,
              ...onsaleDrugstoreLis,
            ],
            total,
          });
        })
        .catch((err) => {
          util.Toast({
            title: "请求列表数据失败",
          });
        });
    },
    //查看药店详情
    toDrugStoreDetl(item) {
      let { companyId } = item;
      uni.navigateTo({
        url: `/pages/drugSore-detail/index?id=${companyId}`,
      });
    },
  },
};
</script>
<style>
@import "./index.css";
</style>
