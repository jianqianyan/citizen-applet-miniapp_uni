<template>
  <view class="container">
    <!-- 背景占位 -->
    <!-- 背景占位 -->
    <view class="background-placeholder"></view>
    <view class="profile-cotent-wrapper">
      <view class="profile-info shadow-wrapper">
        <view class="drug-store-pic">
          <block
            v-if="
              drugStoreDelInfo.enterpriseImage &&
              drugStoreDelInfo.enterpriseImage.length > 0
            "
          >
            <image
              :src="IMAGE_URL + drugStoreDelInfo.enterpriseImage"
              mode="aspectFill"
              :lazy-load="true"
            ></image>
          </block>
          <block v-else>
            <image
              src="/static/images/icons/drugIcon.png"
              mode="aspectFill"
              :lazy-load="true"
            ></image>
          </block>
        </view>
        <view class="drug-store-info">
          <view class="profile-title">{{
            toDrugStoreList.enterpriseName
          }}</view>
          <view class="label-list-wrapper">
            <block
              v-for="(item, index) in toDrugStoreList.featureLabel"
              :key="index"
            >
              <view class="medicare-label">{{ item }}</view>
            </block>
          </view>
          <view class="drug-bus-time-info">
            <text class="icon-shizhong iconfont drug-bus-time-icon"></text>
            <block
              v-if="
                drugStoreDelInfo.businessHours &&
                drugStoreDelInfo.businessHoursEnd
              "
            >
              <text class="start-time"
                >{{ drugStoreDelInfo.businessHours }} -</text
              >
              <text class="end-time">{{
                drugStoreDelInfo.businessHoursEnd
              }}</text>
            </block>
            <block v-else>
              <text class="">无营业时间信息</text>
            </block>
          </view>
        </view>
      </view>
    </view>
    <!-- 内容栏 -->
    <scroll-view class="scroll-style" scroll-y @scrolltolower="scrollToLower">
      <custromTabPanel
        :tabList="tabList"
        :tabHeight="96"
        rangKey="title"
        @changeTab="handleChangetab"
      ></custromTabPanel>
      <view class="drug-shop-list" v-if="showTab === 0">
        <block v-for="(item, index) in sidebarList" :key="index">
          <!-- 药品信息 -->

          <view
            class="drug-list-item"
            @tap.stop.prevent="() => toRecordDetails(item)"
          >
            <view class="drug-wrapper">
              <!-- 药品缩略图 -->
              <view class="drug-thumb">
                <image
                  :src="item.medicineImage"
                  mode="aspectFill"
                  v-if="item.medicineImage"
                ></image>
                <image
                  :src="IMAGE_BASE_URL + 'drug.svg'"
                  mode="aspectFill"
                  v-else
                ></image>
              </view>
              <!-- 药品缩略图 END -->

              <!-- 药品简略信息 -->
              <view class="drug-info-wrapper">
                <view class="drug-name">{{ item.drugGenericName }}</view>
                <!-- 批准文号 -->
                <view class="line-info-wrapper">
                  <text class="label">批准文号:</text>
                  <text class="content">{{ item.approvalNo }}</text>
                </view>
                <!-- 批准文号 END -->
                <view class="line-info-wrapper">
                  <text class="label">生产厂家:</text>
                  <text class="content">{{
                    item.domesticProduceEnterpriseName
                      ? item.domesticProduceEnterpriseName
                      : "无"
                  }}</text>
                </view>
                <view class="line-info-wrapper">
                  <text class="label">规格:</text>
                  <text class="content">{{ item.packageSize }}</text>
                </view>
                <view class="line-info-wrapper">
                  <text class="label">库存数量:</text>
                  <text class="content">{{ item.quantityInStock }}</text>
                </view>
              </view>
              <!-- 药品简略信息 END -->
            </view>
          </view>

          <!-- 药品信息 END -->
        </block>
      </view>
      <view v-else-if="showTab === 1">
        <view class="drug-message">
          <view class="drug-address-box">
            <view class="drug-address-box-text">
              {{ drugStoreDelInfo.drugstoreLocation }}
            </view>
            <view class="drug-address-box-button">
              <image
                src="/static/images/icons/navigation.png"
                class="drug-address-box-icon"
                @tap="openMap"
              ></image>
              <image
                src="/static/images/icons/phone.png"
                class="drug-address-box-icon"
                @tap="callPhone"
              ></image>
            </view>
          </view>
          <view class="title-box">
            <view class="title-icon"></view>
            许可证资质信息
          </view>
          <view
            class="filed filed-column"
            v-for="(item, index) in licenceMessage"
            :key="index"
          >
            <text class="filed-label">{{ item.certificateName }}</text>
            <view class="filed-content">{{ item.certificateNumber }}</view>
          </view>
          <view class="title-box">
            <view class="title-icon"></view>
            执药医师信息
          </view>
          <view class="online-doctor-list">
            <block v-for="(item, index) in onlineList" :key="index">
              <view class="online-doctor-list-item">
                <view class="doctor-avatar">
                  <block v-if="item.faceImage">
                    <image :src="item.faceImage" mode="aspectFill"></image>
                  </block>
                  <block v-else>
                    <image
                      :src="IMAGE_BASE_URL + 'doctor.svg'"
                      mode="aspectFill"
                    ></image>
                  </block>
                </view>
                <view class="doctor-profile-wrapper">
                  <view class="doctor-name">{{ item.name }}</view>
                  <view class="doctor-info-wrapper">
                    <text class="doctor-info-wrapper-text"
                      >资格编号:{{ item.qualificationCardNumber }}</text
                    >
                  </view>
                </view>
              </view>
            </block>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 内容栏 END -->
  </view>
</template>

<script>
// pages/buying-drug-store/index.js
import Api from "../../apis/apis"
import { IMAGE_BASE_URL, IMAGE_URL } from "../../common/config";
import custromTabPanel from "../../components/custom-tab-panel/index.vue";
export default {
  data() {
    return {
      active: 0,
      sidebarList: [],
      IMAGE_BASE_URL,
      IMAGE_URL,
      searc: {
        pageNum: 1,
        pageSize: 10,
      },
      toDrugStoreList: {
        enterpriseName: "",
        featureLabel: [],
      },
      tabList: [
        {
          id: 0,
          title: "药品",
          pageSize: 10,
          pageNum: 1,
          list: [],
          total: 0,
        },
        {
          id: 1,
          title: "药店",
          pageSize: 10,
          pageNum: 1,
          list: [],
          total: 0,
        },
      ],
      showTab: 0,
      drugStoreDelInfo: {},
      onlineList: [],
      licenceMessage: [],
    };
  },
  async onLoad(option) {
    // 药店详情传过来的json字符串转对象
    let toDrugStoreList = JSON.parse(option.toDrugStoreList);
    // 调用列表接口传入id
    this.getDrugstoreGoods(toDrugStoreList.enterpriseId);
    // 转换key值
    let keyMap = {
      0: "a",
      1: "b",
    };
    Object.keys(toDrugStoreList).map((item) => {
      let newKey = keyMap[item];
      if (newKey) {
        toDrugStoreList[newKey] = toDrugStoreList[item];
        delete toDrugStoreList[item];
      }
    });
    this.setData({
      toDrugStoreList,
    });
    await this.getDrugStoreDetails(toDrugStoreList.enterpriseId);
    await this.getlicenceMessage({
      enterpriseId: this.drugStoreDelInfo.enterpriseId,
      uscid: this.drugStoreDelInfo.uscid,
    });
  },
  methods: {
    handleSelected(e) {
      let { id } = e.target.dataset;
      this.setData({
        active: id,
      });
    },

    // 触底加载
    scrollToLower() {
      this.setData({
        ["searc.pageNum"]: (this.searc.pageNum += 1), // 页码+1
      });
      this.getDrugstoreGoods(this.toDrugStoreList.enterpriseId); // 调用接口
    },

    // 列表接口
    async getDrugstoreGoods(enterpriseId) {
      let param = {
        enterpriseId,
        ...this.searc,
      };
      let res = await Api.getDrugPage(param);
      this.sidebarList.push(...res.data.data.records);
      this.setData({
        sidebarList: this.sidebarList,
      });
    },

    handleChangetab(event) {
      this.showTab = event.detail;
    },
    async getDrugStoreDetails(drugStoreId) {
      let res = await Api.getDrugStoreDetails(drugStoreId);
      let { data: drugStoreDelInfo, code } = res.data;
      if (code !== 200) {
        return Tip.Toast({
          title: "获取药店详情失败",
        });
      }
      drugStoreDelInfo.enterpriseImage = drugStoreDelInfo.enterpriseImage
        ? drugStoreDelInfo.enterpriseImage.split(",")
        : [];
      drugStoreDelInfo.featureLabel = drugStoreDelInfo.featureLabel
        ? drugStoreDelInfo.featureLabel.split(",")
        : [];
      drugStoreDelInfo.featureService = drugStoreDelInfo.featureService
        ? drugStoreDelInfo.featureService.split(",")
        : [];
      drugStoreDelInfo.handyService = drugStoreDelInfo.handyService
        ? drugStoreDelInfo.handyService.split(",")
        : [];
      drugStoreDelInfo.contactTel = drugStoreDelInfo.contactTel;
      this.setData({
        drugStoreDelInfo,
      });
      let enterpriseId = this.drugStoreDelInfo.enterpriseId;
      await this.getLicensedPharmacist(enterpriseId);
    },
    // 执药医师信息
    async getLicensedPharmacist(enterpriseId) {
      let res = await Api.getLicensedPharmacist({
        enterpriseId,
      });
      if (res.data.code !== 200) {
        return Tip.Toast({
          title: "获取药店详情失败",
        });
      }
      this.setData({
        onlineList: res.data.data.records,
      });
    },
    // 获取许可资质证明
    async getlicenceMessage(options) {
      let res = await Api.getlicenceMessage(options);
      if (res.data.code !== 200) {
        return Toast({
          title: "许可证请求失败",
        });
      }
      this.setData({
        licenceMessage: res.data.data,
      });
    },
    callPhone() {
      if (!this.drugStoreDelInfo.contactTel) {
        Tip.Toast({
          title: "该电话已失效",
        });
        return;
      }
      uni.makePhoneCall({
        phoneNumber: this.drugStoreDelInfo.contactTel,
      });
    },

    openMap() {
      ap.openLocation({
        longitude: this.drugStoreDelInfo.drugstoreLongitude,
        latitude: this.drugStoreDelInfo.drugstoreLatitude,
        name: this.drugStoreDelInfo.enterpriseName,
        address: this.drugStoreDelInfo.drugstoreLocation,
      });
    },
    
    toRecordDetails(item) {
      uni.navigateTo({
        url: `/pages/drug-details/index?drugDel=${JSON.stringify(item)}`,
      });
    },
  },
  components: {
    custromTabPanel,
  },
};
</script>
<style>
@import "./index.css";
</style>
