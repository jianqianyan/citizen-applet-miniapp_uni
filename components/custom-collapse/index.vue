<template>
    <view class="custom-collapse-wrapper">
        <slot></slot>
    </view>
</template>

<script>
// components/custom-collapse/index.js
export default {
    unicomGroup: ['custom-collapse-item'],
    data() {
        return {};
    },
    relations: {
        'custom-collapse-item': {
            type: 'child',
            linked: function (target) {}
        }
    },
    props: {
        // active:{
        //   type:Number,
        //   value:0,
        //   optionalTypes:[String,Number]
        // }
    },
    methods: {
        ready: function () {},
        attached: function () {}
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
        // 处理小程序 ready 生命周期
        this.$nextTick(() => this.ready());
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
