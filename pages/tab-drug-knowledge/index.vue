<template>
  <view class="contaniner">
    <!-- 背景占位 -->
    <view class="background-holder reset"></view>
    <!-- 背景占位 END -->

    <!-- tab -->
    <view class="tab-menu-list">
      <custom-tab-panel :tabList="tabList" :tabHeight="124" rangKey="title" @changeTab="changeTabClick" />
      <!-- <block wx:for="{{ tabList }}" wx:key="id">
            <view class="tab-menu-item" data-id="{{ item.id }}">{{ item.title }}</view>
        </block>     -->
    </view>
    <!-- tab -->

    <!-- 内容占位 -->
    <view class="content-holder"></view>
    <!-- 内容占位 END -->

    <!-- 文章列表 -->
    <view class="profile-cotent-wrapper">
      <block v-for="(item, index) in goods[num].list" :key="index">
        <view class="profile-info shadow-wrapper" @tap.stop.prevent="toKnowLedgeDetail" :data-id="item.id">
          <view class="profile-title-wrapper">
            <text class="iconfont icon-star"></text>
            <view class="profile-title">{{ item.title }}</view>
          </view>
          <!-- 文章缩略 -->
          <!-- <text class="word-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptates earum accusamus consequuntur neque? Sit excepturi vitae ipsam est. Consectetur placeat praesentium aliquid ratione dolorem. Nisi error aperiam minima nam?Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptates earum accusamus consequuntur neque? Sit excepturi vitae ipsam est. Consectetur placeat praesentium aliquid ratione dolorem. Nisi error aperiam minima nam?</text> -->

          <!-- 文章缩略 END -->
          <view class="other-info">
            <text>{{ item.issueTime }}</text>
            <text>阅读 {{ item.reading }}</text>
          </view>
        </view>
      </block>
      <!-- <view class="loading" hidden="{{ isShow }}">加载中。。。</view> -->
    </view>
    <!-- 文章列表 -->
    <MyFooter></MyFooter>
  </view>
</template>

<script>
  import customTabPanel from '../../components/custom-tab-panel/index';
  import MyFooter from "../../components/MyFooter/fixedIndex.vue"
  import Api from "../../apis/apis"
  import { Toast } from '../../common/common';
  export default {
    components: {
      customTabPanel,
      MyFooter
    },
    data () {
      return {
        tabList: [
          // {id:0,title:'全部'},
          {
            id: 0,
            title: '安全公告'
          },
          {
            id: 1,
            title: '使用知识'
          },
          {
            id: 2,
            title: '新闻动态'
          },
          {
            id: 3,
            title: '法律法规'
          }
        ],

        goods: {
          '0001': {
            pageNum: 0,
            pageSize: 20,
            list: []
          },
          '0002': {
            pageNum: 0,
            pageSize: 20,
            list: []
          },
          '0003': {
            pageNum: 0,
            pageSize: 20,
            list: []
          },
          '0004': {
            pageNum: 0,
            pageSize: 20,
            list: []
          }
        },

        num: '0001',
        list: []
      };
    },
    /* ------------------ 生命周期区 ---------------------------*/

    onLoad (options) {
      this.getDrugKnowledgeService();
      this.getDrugKnowledgeList('0001');
      this.getDrugKnowledgeList('0002');
      this.getDrugKnowledgeList('0003');
      this.getDrugKnowledgeList('0004');
      // 发布者，根据详情返回该条数据的id来匹配修改阅读数量
      uni.$emitter.on('READING', (event) => {
        this.goods[this.num].list.forEach((item) => {
          if (item.id == event.data) {
            item.reading += 1;
            this.setData({
              goods: this.goods
            });
          }
        });
      });
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      uni.$emitter.off();
    },
    // 监听触底事件
    onReachBottom () {
      this.getDrugKnowledgeList(this.num);
    },
    methods: {
      /* ------------------ 监听事件区（点击、触底） ---------------------------*/

      // 监听tab栏点击
      changeTabClick (e) {
        this.setData({
          num: e.detail
        });
      },

      // 监听点击跳转详情
      toKnowLedgeDetail (e) {
        let id = e.currentTarget.dataset.id;
        uni.navigateTo({
          url: `/pages/drug-knowledge/index?id=${id}`
        });
      },

      /* ------------------ 接口请求封装区 ---------------------------*/

      // 药品知识获取顶部导航标签字典
      async getDrugKnowledgeService () {
        try {
          const res = await Api.getDrugKnowledgeService();
          let { code, data: drugKnowledgeLabel } = res.data;
          if (code !== 200) {
            return Toast({
              title: '获取上导航标签失败'
            });
          }
          let tabList = drugKnowledgeLabel.map((item) => {
            return {
              title: item.name,
              id: item.code
            };
          });
          this.setData({
            tabList
          });
        } catch (error) {
          console.log('CatchClause', error);
          console.log('CatchClause', error);
          Toast({
            title: '获取上导航标签失败'
          });
        }
      },

      // 药品知识获取列表
      async getDrugKnowledgeList (type) {
        // 页码 +1
        const pageNum = this.goods[type].pageNum + 1;
        // 处理参数
        let param = {
          publishTypeCode: type,
          pageNum,
          pageSize: 20
        };
        // 发起请求
        const res = await Api.getDrugKnowledgeList(param);
        if (res.data.code !== 200) {
          return Toast({
            title: '获取列表失败'
          });
        }
        // 保存数据
        this.goods[type].list.push(...res.data.data.records);
        this.setData({
          goods: this.goods
        });
        // 页码 +1
        this.goods[type].pageNum += 1;
      }
    }
  };
</script>
<style>
@import './index.css';
</style>
