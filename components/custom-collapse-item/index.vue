<template>
    <view class="collapse-item-wrapper">
        <view class="filed" @tap.stop.prevent="showMore">
            <text class="label">{{ title }}</text>
            <view class="filed-content"></view>
            <text :class="'iconfont icon-jiantou  ' + (active ? 'translate' : '')"></text>
        </view>
        <view :class="'slot-content ' + (active ? 'show' : 'hide')">
            <slot></slot>
        </view>
    </view>
</template>

<script>
// components/custom-collapse-item/index.js
export default {
    unicomGroup: ['custom-collapse'],
    data() {
        return {
            active: false
        };
    },
    relations: {
        'custom-collapse': {
            type: 'parent',
            // 关联的目标节点应为父节点
            linked: function (target) {}
        }
    },
    props: {
        title: String
    },
    methods: {
        attached: function () {},

        showMore() {
            this.setData({
                active: !this.active
            });
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    destroyed: function () {
        // 在组件实例被从页面节点树移除时执行
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
