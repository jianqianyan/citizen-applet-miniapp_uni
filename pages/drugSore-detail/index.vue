<template>
  <view>
    <!-- 顶部导航栏 -->
    <view class="custom-navbar">
      <!-- holder -->
      <!-- holder END -->
      <view class="nav-holder-style navbar-style">
        <text class="iconfont icon-jiantou nav-back" @tap="customBack"></text>
        <text class="nav-title">药店详情</text>
        <view class="nav-icon" @tap="toDrugStore">
          <image mode="aspectFill" :src="IMAGE_BASE_URL + '/profile/drug_store.png'"></image>
        </view>
      </view>
    </view>
    <!-- 顶部导航栏 END -->
    <!-- holder END -->
    <!-- 轮播 -->
    <div class="swiper-style">
    </div>
    <!-- 轮播 END -->
    <view class="drug-store-wrapper">
      <!-- 药店名称 -->
      <view class="profile-info shadow-wrapper">
        <view class="profile-title">{{ drugStoreDelInfo.enterpriseName }}</view>
        <view class="drug-store-label-wrapper filed">
          <!-- <view class="buying-register" @tap.stop.prevent="toBuyingRegister">购药登记</view> -->
        </view>
        <!-- 营业时间 -->
        <view class="filed">
          <text class="label">营业时间</text>
          <view class="filed-content">
            <block v-if="drugStoreDelInfo.businessHours && drugStoreDelInfo.businessHoursEnd">
              <view class="drug-bus-time-info">
                <text class="start-time">{{ drugStoreDelInfo.businessHours }} -</text>
                <text class="end-time">{{ drugStoreDelInfo.businessHoursEnd }}</text>
              </view>
            </block>
            <block v-else>
              <view class="drug-bus-time-info">
                <text class="start-time">暂无营业时间信息</text>
              </view>
            </block>
          </view>
          <image :src="IMAGE_BASE_URL + '/profile/location.png'" mode="aspectFill" class="icon-location" @tap="openMap">
          </image>
        </view>
        <!-- 营业时间 END -->
        <!-- 营业地址 -->
        <view class="filed">
          <text class="label">营业地址</text>
          <view class="filed-content">{{ drugStoreDelInfo.drugstoreLocation }}</view>
          <text @tap="callPhone" class="iconfont icon-dianhua"></text>
        </view>
        <!-- 营业地址 END -->
        <!-- 特色服务 -->
        <view class="filed">
          <text class="label">特色服务</text>
          <view class="filed-content">
            <block v-if="drugStoreDelInfo.featureService.length !== 0">
              <block v-for="(featureService, index) in drugStoreDelInfo.featureService" :key="index">
                <text class="service-label">{{ featureService }}</text>
              </block>
            </block>
            <block v-else>
              <text>无</text>
            </block>
          </view>
        </view>
        <!-- 特色服务 END -->
        <!-- 便民服务 -->
        <view class="filed">
          <text class="label">便民服务</text>
          <view class="filed-content">
            <block v-if="drugStoreDelInfo.handyService.length !== 0">
              <block v-for="(handyService, index) in drugStoreDelInfo.handyService" :key="index">
                <text class="service-label">{{ handyService }}</text>
              </block>
            </block>
            <block v-else>
              <text>无</text>
            </block>
          </view>
        </view>
        <!-- 便民服务 END -->
        <!-- 许可资质信息 -->
        <view class="filed" @tap.stop.prevent="toLicenseInfo" :data-id="enterpriseId">
          <text class="label">许可资质信息</text>
          <view class="filed-content more-info">
            <text class="iconfont icon-jiantou more"></text>
          </view>
        </view>
        <!-- 许可资质信息 END -->
        <!-- 执药医生信息 -->
        <view class="filed last-filed filed-column">
          <text class="label">执药医师信息</text>
          <view class="more-infos">
            <view class="filed-content reset-filed-content">
              <block v-if="onlineList.length !== 0">
                <view class="online-doctor-list" @tap.stop.prevent="handleSelectPharmacist">
                  <block v-for="(item, index) in onlineList" :key="index">
                    <view class="online-doctor-list-item">
                      <view class="doctor-avatar">
                        <block v-if="item.faceImage">
                          <image :src="item.faceImage" mode="aspectFill"></image>
                        </block>
                        <block v-else>
                          <image :src="IMAGE_BASE_URL + 'doctor.svg'" mode="aspectFill"></image>
                        </block>
                      </view>
                      <view class="doctor-profile-wrapper">
                        <text class="doctor-name">{{ item.name }}</text>
                        <view class="doctor-info-wrapper">
                          <text>资格编号:</text>
                          <text class="doctor-info-wrapper-item">
                            {{ item.qualificationCardNumber }}
                          </text>
                        </view>
                      </view>
                      <block v-if="item.isRest">
                        <view class="is-online">
                          <text>{{ item.isRest ? '休息中' : '' }}</text>
                        </view>
                      </block>
                      <view :class="'bubble-holder ' + (curSelect === item.id ? 'select-style' : '')"
                        :data-pharmacist-id="item.id" :data-pharmacist-user-id="item.userId"
                        :data-pharmacist-name="item.name" />
                    </view>
                  </block>
                </view>
              </block>
              <block v-else>
                <text>暂无执药医师信息</text>
              </block>
            </view>
          </view>
        </view>
        <!-- 执药医生信息 END -->
      </view>
      <!-- 药店名称 -->
    </view>
    <view class="drug-store-wrapper">
      <view class="profile-info shadow-wrapper">
        <view class="preferred-title">
          <view class="preferred-title-left">
            <image src="/static/images/icons/diamond.png" class="preferred-title-icon"></image>
            店内优选
          </view>
          <view class="preferred-title-right" @tap="toDrugStore">更多</view>
        </view>
        <view class="drug-list">
          <view class="drug-item" v-for="(item, index) in drugList" :key="index + ' drug-item'"
            @tap.stop.prevent="() => toRecordDetails(item)">
            <image :src="item.medicineImage || '/static/images/drug.svg'" class="drug-image"></image>
            <view class="drug-name">
              {{ item.drugGenericName }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- <block v-if="curSelect">
      <view class="button-wrapper">
        <button @tap.stop.prevent="handleConsult">我要咨询</button>
      </view>
    </block> -->
  </view>
</template>

<script>
  // pages/drug-store-detail/index.js
  import { IMAGE_BASE_URL, BASE_URL } from '../../common/config';
  import Api from "../../apis/apis"
  import * as Tip from '../../common/common';
  let app = getApp();
  export default {
    data () {
      return {
        BASE_URL,
        IMAGE_BASE_URL,
        navHeight: app.globalData.navHeight,

        onlineList: [
        ],

        drugStoreId: '',

        drugStoreDelInfo: {
          enterpriseImage: [],
          enterpriseName: '',
          featureLabel: [],
          businessHours: '',
          businessHoursEnd: '',
          drugstoreLocation: '',
          featureService: [],
          handyService: []
        },

        curSelect: '',

        formData: {
          //市民ID
          citizenId: '',
          //微信名称 / 市民名称
          citizenName: '',
          //药师名称
          pharmacistName: '',
          //药师userId
          pharmacistUserId: null
        },

        imageItem: '',
        label: '',
        featureService: '',
        handyService: '',
        enterpriseId: '',
        drugList: [
        ]
      };
    },
    async onLoad (options) {
      let { id: drugStoreId } = options;
      this.getUserProfile();
      this.setData({
        drugStoreId
      });
      await this.getDrugStoreDetails();
      await this.getPreferred()
    },
    methods: {
      getUserProfile () {
        //获取 用户userId
        this.formData.citizenId = uni.getStorageSync('userId') || '';
        this.formData.citizenName = uni.getStorageSync('nickName') || '';
      },

      async getDrugStoreDetails () {
        let res = await Api.getDrugStoreDetails(this.drugStoreId)
        let { data: drugStoreDelInfo, code } = res.data;
        if (code !== 200) {
          return Tip.Toast({
            title: '获取药店详情失败'
          });
        }
        drugStoreDelInfo.enterpriseImage = drugStoreDelInfo.enterpriseImage ? drugStoreDelInfo.enterpriseImage.split(',') : [];
        drugStoreDelInfo.featureLabel = drugStoreDelInfo.featureLabel ? drugStoreDelInfo.featureLabel.split(',') : [];
        drugStoreDelInfo.featureService = drugStoreDelInfo.featureService ? drugStoreDelInfo.featureService.split(',') : [];
        drugStoreDelInfo.handyService = drugStoreDelInfo.handyService ? drugStoreDelInfo.handyService.split(',') : [];
        drugStoreDelInfo.contactTel = drugStoreDelInfo.contactTel;
        this.setData({
          drugStoreDelInfo
        });
        let enterpriseId = this.drugStoreDelInfo.enterpriseId;
        await this.getLicensedPharmacist(enterpriseId);
        await this.handlePreferred()
      },

      customBack () {
        uni.navigateBack();
      },

      //购药登记
      toBuyingRegister () {
        let { enterpriseId } = this.drugStoreDelInfo;
        uni.navigateTo({
          url: `/pages/buying-drug-reg/index?enterpriseId=${enterpriseId}`
        });
      },

      //查看许可资质信息
      toLicenseInfo (e) {
        let enterpriseId = this.drugStoreDelInfo.enterpriseId;
        let uscid = this.drugStoreDelInfo.uscid;
        uni.navigateTo({
          url: `/pages/licence-quality-info/index?enterpriseId=${enterpriseId}&uscid=${uscid}`
        });
      },

      //查看药店商品列表
      toDrugStore () {
        let featureLabel = this.drugStoreDelInfo.featureLabel;
        let target = {};
        target.enterpriseName = this.drugStoreDelInfo.enterpriseName;
        target.enterpriseId = this.drugStoreDelInfo.enterpriseId;
        target.featureLabel = featureLabel;
        let toDrugStoreList = JSON.stringify(target);
        // let enterpriseId = this.data.drugStoreDelInfo.enterpriseId
        uni.navigateTo({
          url: `/pages/buying-drug-store/index?toDrugStoreList=${toDrugStoreList}`
        });
      },

      // 执药医师信息
      async getLicensedPharmacist (enterpriseId) {
        let res = await Api.getLicensedPharmacist({
          enterpriseId
        });
        if (res.data.code !== 200) {
          return Tip.Toast({
            title: '获取药店详情失败'
          });
        }
        this.setData({
          onlineList: res.data.data.records
        });
      },

      //选择执药医师进行咨询
      handleSelectPharmacist (event) {
        const { curSelect } = this;
        const { pharmacistId, pharmacistName, pharmacistUserId } = event.target.dataset;
        if (curSelect === pharmacistId) {
          delete this.formData.pharmacistName;
          delete this.formData.pharmacistUserId;
        } else {
          this.formData = {
            ...this.formData,
            pharmacistName,
            pharmacistUserId
          };
        }
        this.setData({
          curSelect: curSelect === pharmacistId ? '' : pharmacistId
        });
      },

      // 查询优选商品
      async handlePreferred () {
      },

      //新建咨询
      handleConsult () {
        const { citizenId } = this.formData;
        // if (!citizenId) {
        //   return Tip.Toast({
        //     title: '请先登录'
        //   });
        // }
        const { enterpriseName, enterpriseId, uscid } = this.drugStoreDelInfo;
        const params = {
          ...this.formData,
          enterpriseName,
          enterpriseId,
          uscid,
          pharmacistId: this.curSelect
        };
        Api.createConsult(params)
          .then((res) => {
            // let
            return Api.getDonsultDel(res.data.data);
          })
          .then((res) => {
            const query = encodeURIComponent(JSON.stringify(res.data.data));
            uni.redirectTo({
              url: `/pages/advice-chat/index?dosultDel=${query}`
            });
          })
          .catch((err) => {
            Tip.Toast({
              title: '操作失败'
            });
          });
      },

      callPhone () {
        if (!this.drugStoreDelInfo.contactTel) {
          Tip.Toast({
            title: '该电话已失效'
          });
          return;
        }
        uni.makePhoneCall({
          phoneNumber: this.drugStoreDelInfo.contactTel
        });
      },

      openMap () {
        ap.openLocation({
          longitude: this.drugStoreDelInfo.drugstoreLongitude,
          latitude: this.drugStoreDelInfo.drugstoreLatitude,
          name: this.drugStoreDelInfo.enterpriseName,
          address: this.drugStoreDelInfo.drugstoreLocation
        });
      },

      toRecordDetails (item) {
        uni.navigateTo({
          url: `/pages/drug-details/index?drugDel=${JSON.stringify(item)}`
        });
      },

      async getPreferred () {
        let res = await Api.getDrugPage({
          enterprisedId: this.drugStoreId,
          pageNum: 1,
          pageSize: 4
        })
        this.drugList = res.data.data.records
      }
    }
  };
</script>
<style>
@import './index.css';
</style>
