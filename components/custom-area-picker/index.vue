<template>
    <view class="container">
        <view class="panel-wrapper">
            <view class="panel-cancel" @tap="reset">重置</view>
            <view class="cur-area" @tap="resetCurArea">{{ lastArea.regionName }}</view>
            <view class="panel-confirm" @tap="comfirm">确定</view>
        </view>
        <picker-view :value="pickerArea" @change="handlePicker" class="picker-wrapper" indicator-style="height: 50px;">
            <picker-view-column class="col">
                <view v-for="(item, index) in areaList" :key="index">
                    {{ item.regionName }}
                </view>
            </picker-view-column>
        </picker-view>
    </view>
</template>

<script>
// components/custom-area-picker/index.js
import { getRegion } from '../../apis/apis';
import { HideLoading, Loading, Toast } from '../../common/common';
let app = getApp().globalData;
export default {
    data() {
        return {
            //区域集合
            areaList: [],
            pickerArea: [],
            //当前区域下标
            areaIndex: 0,
            //上一次选择的上一级区域
            lastArea: {
                regionName: ''
            }
        };
    },
    props: {},
    methods: {
        attached() {},

        handlePicker(e) {
            console.log(e.detail.value);
            let [first] = e.detail.value;
            let areaIndex = first;
            this.areaIndex = areaIndex;
        },

        comfirm() {
            let { areaList, areaIndex } = this;
            console.log(areaList);
            // 只到第五级数据
            if (areaList[areaIndex].levels < 5) {
                // 调用请求下一级接口
                this.setData({
                    lastArea: areaList[areaIndex]
                });
                this.hanldeRegion(areaList[areaIndex].regionCode);
            } else {
                //隐藏并返回数据
                let params = {
                    isShow: false,
                    regionCode: areaList[areaIndex].regionCode,
                    regionHolder: areaList[areaIndex].regionName
                };
                this.$emit('comfirm', {
                    detail: {
                        ...params
                    }
                });
            }
        },

        reset() {
            this.setData(
                {
                    lastArea: {}
                },
                () => {
                    getRegion({
                        regionCode: uni.$global.topLevelRegionCode
                    })
                        .then((res) => {
                            this.setData({
                                areaList: res.data.data
                            });
                            this.$emit('reset', {
                                detail: {
                                    isShow: false,
                                    regionCode: uni.$global.topLevelRegionCode
                                }
                            });
                        })
                        .catch((err) => {
                            Toast({
                                title: '重置失败'
                            });
                        });
                }
            );
        },

        //获取区域信息
        hanldeRegion(regionCode) {
            let { areaList, areaIndex } = this;
            if (areaList.length !== 0 && this.hint(areaList[areaIndex].levels)) {
                Toast({
                    title: this.hint(areaList[areaIndex].levels)
                });
            }
            Loading();
            getRegion({
                regionCode
            }).then((res) => {
                HideLoading();
                //无区域信息
                if (res.data.data.length === 0) {
                    let params = {
                        isShow: false,
                        regionCode: areaList[areaIndex].regionCode,
                        regionHolder: areaList[areaIndex].regionName
                    };
                    this.$emit('comfirm', {
                        detail: {
                            ...params
                        }
                    });
                } else {
                    this.setData({
                        areaList: res.data.data
                    });
                }
            });
        },

        //点击上一次选择区域，返回上一级区域选择
        resetCurArea() {
            console.log(this.lastArea);
            // getRegion({ regionCode }).then(res => {
            //   this.setData({
            //     areaList: res.data.data
            //   });
            // })
        },

        hint(levels) {
            let hint = '';
            switch (levels) {
                case 3:
                    hint = '请选择区县';
                    break;
                case 4:
                    hint = '请选择街道乡镇';
                    break;
                case 5:
                    break;
                default:
                    break;
            }
            return hint;
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
