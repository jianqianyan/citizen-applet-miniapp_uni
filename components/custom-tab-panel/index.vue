<template>
  <view class="tab-menu-list shadow-wrapper" :style="'height:' + tabHeight + 'rpx'">
    <block v-for="(item, index) in tabListClone" :key="index">
      <view :class="'tab-menu-item ' + (curIndex === item.id ? 'select' : '')" @tap="selected" :data-id="item.id">{{
        item[rangKey] }}</view>
    </block>
    <view class="select-line" :style="'left:' + lineLeft + 'px; width:' + lineWidth + 'px;'"></view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        //tab下划线宽度
        lineWidth: 0,

        //当前下标
        curIndex: 0,

        //左侧距离
        lineLeft: 0,

        tabListClone: [],
        tabListClone: []
      };
    },

    props: {
      //tabList
      tabList: {
        type: Array,
        default: () => [],
        Observer: function (newVal) {
          this.tabList = newVal;
          this.setData({
            tabListClone: tabList
          });
        }
      },
      rangKey: {
        type: String
      },
      //initialIndex
      initial: {
        type: Number,
        default: 0
      },
      //height
      tabHeight: {
        type: Number
      }
    },

    methods: {
      ready () {
        let [frist] = this.tabList;
        this.setData({
          curIndex: frist.id
        });
        this.setData({
          curIndex: this.initial
        });
        this.computedLineLeft();
        this.computedTabInitialTop();
      },

      //点击切换
      selected (e) {
        let { id } = e.currentTarget.dataset;
        this.$emit('changeTab', {
          detail: id
        });
        this.setData(
          {
            curIndex: id
          },
          () =>
            setTimeout(() => {
              this.computedLineLeft();
            })
        );
      },

      //计算下划线距离
      computedLineLeft () {
        uni.createSelectorQuery()
          .in(this)
          .select('.select')
          .boundingClientRect()
          .select('.tab-menu-list')
          .boundingClientRect()
          .exec((res) => {
            let { left, width } = res[0];
            this.setData({
              lineWidth: width,
              lineLeft: left - res[1].left
            });
          });
      },

      computedTabInitialTop () {
        uni.createSelectorQuery()
          .in(this)
          .select('.tab-menu-list')
          .boundingClientRect()
          .exec((res) => {
            let { top } = res[0];
            let scrollTop = null;
            if (!scrollTop) {
              scrollTop = top;
              this.$emit('getScrollH', {
                detail: top
              });
            }
          });
      }
    },

    mounted () {
      // 处理小程序 ready 生命周期
      this.$nextTick(() => this.ready());
    },

    watch: {
      tabList: function () { },

      tabList: {
        handler: function (newVal, oldVal) {
          this.tabListClone = newVal;
        },

        immediate: true,
        deep: true
      }
    },

    created: function () { }
  };
</script>
<style>
@import './index.css';
</style>
