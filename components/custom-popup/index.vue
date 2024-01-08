<template>
    <view>
        <!-- 遮罩 -->
        <view :class="'popup-shadow ' + (isShowClone ? 'shadow-show' : 'shadow-hide') + ' '" @touchmove.stop.prevent="trueFun" @tap.stop.prevent="hide"></view>
        <!-- 遮罩 END -->
        <view
            :class="'popup-wrapper ' + (radius ? 'radius-style' : '') + ' ' + initialStyle + ' animate'"
            :style="'height:' + height + ';width:' + width + '; ' + (positionClone === 'center' ? utils.scale(scale) : utils.translate(offsetX, offsetY))"
            @touchmove.stop.prevent="handleTouch"
        >
            <scroll-view :scroll-y="true" class="scroll-style">
                <block v-if="title || close">
                    <view class="panel-wrapper">
                        <block v-if="title || close">
                            <view class="popup-panel">
                                <block v-if="title">
                                    <view class="popup-title">{{ title }}</view>
                                </block>
                                <block v-if="close">
                                    <text class="iconfont icon-guanbi" @tap.stop.prevent="hide"></text>
                                </block>
                            </view>
                        </block>
                    </view>
                </block>

                <view class="popup-content">
                    <slot></slot>
                </view>
            </scroll-view>
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="@/components/custom-popup/utils.wxs"></script>
<script>
// components/custom-popup/custom-popup.js
let offsetX;
let offsetY;
let scale;
export default {
    data() {
        return {
            type: '',
            scale: 0,
            initialStyle: '',
            postion: '',
            offsetX: 0,
            offsetY: 0,
            isShowClone: false,
            positionClone: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        //显示隐藏
        isShow: {
            type: Boolean
        },
        // 弹出层高度
        height: {
            type: String,
            default: '450rpx'
        },
        width: {
            type: String,
            default: '450rpx'
        },
        /**
         * @description 弹出层位置 center right left top bottom
         * @default bottom
         */
        position: {
            type: String
        },
        //是否圆角
        radius: {
            type: Boolean,
            default: false
        },
        //标题栏
        title: {
            type: String
        },
        //是否显示关闭按钮
        close: {
            type: Boolean,
            default: false
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        hide() {
            this.setData({
                isShowClone: false
            });
        },

        handleTouch() {
            return true;
        },

        handleShow() {
            if (this.isShow) {
                offsetX = 0;
                offsetY = 0;
                scale = 1;
            } else {
                switch (this.position) {
                    case 'bottom':
                        offsetY = 100;
                        offsetX = 0;
                        break;
                    case 'top':
                        offsetY = -100;
                        offsetX = 0;
                        break;
                    case 'left':
                        offsetX = -100;
                        offsetY = 0;
                        break;
                    case 'right':
                        offsetX = 100;
                        offsetY = 0;
                        break;
                    case 'center':
                        scale = 0;
                        break;
                }
            }
            this.setData({
                offsetX,
                offsetY,
                scale
            });
        },

        handlePostion(postion) {
            let styleEnum = '';
            let offsetX;
            let offsetY;
            switch (postion) {
                case 'bottom':
                    styleEnum = 'bottom';
                    offsetY = 100;
                    break;
                case 'top':
                    styleEnum = 'top';
                    offsetY = -100;
                    break;
                case 'left':
                    styleEnum = 'left';
                    offsetX = -100;
                    break;
                case 'right':
                    styleEnum = 'right';
                    offsetX = 100;
                    break;
                case 'center':
                    styleEnum = 'center';
                    break;
            }
            this.setData({
                initialStyle: styleEnum,
                offsetX,
                offsetY
            });
        },

        trueFun() {
            console.log('占位：函数 true 未声明');
        }
    },
    created: function () {},
    watch: {
        isShow: {
            handler: function (newVal, oldVal) {
                this.isShowClone = this.clone(this.isShow);
                if (newVal) {
                    this.$emit('show');
                } else {
                    this.$emit('hide');
                }
                this.setData({
                    isShowClone: newVal
                });
                this.handleShow(newVal);
            },

            immediate: true
        },

        position: {
            handler: function (newval) {
                this.positionClone = this.clone(this.position);
                this.handlePostion(newval);
                this.setData({
                    positionClone: newval
                });
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
