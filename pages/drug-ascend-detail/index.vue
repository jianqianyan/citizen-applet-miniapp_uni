<template>
    <view class="drug-ascend-wrapper">
        <!-- 背景占位 -->
        <view class="background-holder"></view>
        <!-- 背景占位 -->

        <!-- profile -->
        <view class="profile-cotent-wrapper">
            <view class="profile-info shadow-wrapper">
                <!-- 药品名称 -->
                <view class="filed">
                    <text class="label">药品名称</text>
                    <view class="filed-content">{{ dtcProfile.drugGenericName }}</view>
                </view>
                <!-- 药品名称 END -->

                <!-- 批准文号 -->
                <view class="filed">
                    <text class="label">批准文号</text>
                    <view class="filed-content">{{ dtcProfile.approvalNo }}</view>
                </view>
                <!-- 批准文号 END -->

                <!-- 批准文号有效期 -->
                <view class="filed">
                    <text class="label">批准文号有效期</text>
                    <view class="filed-content">
                        <text class="date">{{ dtcProfile.approvalValidDate }}</text>
                        <!-- <text class="time">00:00:00</text> -->
                    </view>
                </view>
                <!-- 批准文号有效期 END -->

                <custom-collapse>
                    <custom-collapse-item title="基本信息">
                        <view class="filed">
                            <text class="label">药品通用名称</text>
                            <view class="filed-content">{{ dtcProfile.drugGenericName }}</view>
                        </view>
                        <view class="filed">
                            <text class="label">药品商品名称</text>
                            <view class="filed-content">{{ dtcProfile.drugTradeName }}</view>
                        </view>
                        <view class="filed">
                            <text class="label">国家药品标识码</text>
                            <view class="filed-content">{{ dtcProfile.cndc }}</view>
                        </view>
                        <view class="filed">
                            <text class="label">药品本位码</text>
                            <view class="filed-content">{{ dtcProfile.drugStandardCode }}</view>
                        </view>
                        <view class="filed">
                            <text class="label">剂型</text>
                            <view class="filed-content">{{ dtcProfile.dosageForm }}</view>
                        </view>
                        <view class="filed">
                            <text class="label">药剂规格</text>
                            <view class="filed-content">{{ dtcProfile.strength }}</view>
                        </view>
                        <view class="filed">
                            <text class="label">包装规格</text>
                            <view class="filed-content">{{ dtcProfile.packageSize }}</view>
                        </view>
                        <view class="filed">
                            <text class="label">包装转换比</text>
                            <view class="filed-content">{{ dtcProfile.pkgConversionRatio }}</view>
                        </view>
                        <view class="filed">
                            <text class="label">药品有效期</text>
                            <view class="filed-content">{{ dtcProfile.shelfLife + dtcProfile.unitOfShelfLife }}</view>
                        </view>
                    </custom-collapse-item>
                    <custom-collapse-item title="厂商信息">
                        <view class="filed">
                            <text class="label">上市许可持有人名称</text>
                            <view class="filed-content">{{ dtcProfile.domesticDrugMAHName }}</view>
                        </view>
                        <view class="filed">
                            <text class="label">统一社会信用代码</text>
                            <view class="filed-content">{{ dtcProfile.domesticDrugMAHUSCID }}</view>
                        </view>
                        <view class="filed">
                            <text class="label">生产企业/生产厂名称</text>
                            <view class="filed-content">{{ dtcProfile.domesticDrugManufacturerName }}</view>
                        </view>
                        <view class="filed">
                            <text class="label">统一社会信用代码（境内药品上市许可持有人名称）</text>
                            <view class="filed-content">{{ dtcProfile.domesticDrugManufacturerUSCID }}</view>
                        </view>
                    </custom-collapse-item>
                </custom-collapse>
            </view>
            <!-- 追溯明细 -->
            <view class="profile-info shadow-wrapper ascend-step">
                <view class="profile-title">追溯明细</view>
                <view class="step-wrapper">
                    <view class="step-item">
                        <view class="step-cicrle">
                            <view class="step-cicrle-inner"></view>
                        </view>
                        <view class="step-matter">
                            <view class="step-title">生产信息</view>
                            <view class="step-content">
                                <view class="step-content-item">
                                    <text class="step-label">生产厂家</text>
                                    <text class="step-details">{{ dtcProfile.domesticDrugManufacturerName }}</text>
                                </view>
                                <view class="step-content-item">
                                    <text class="step-label">生产日期</text>
                                    <text class="step-details">{{ dtcProfile.productionDate }}</text>
                                </view>
                                <view class="step-content-item">
                                    <text class="step-label">药品生产批号</text>
                                    <text class="step-details">{{ dtcProfile.batch }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="step-item last-step">
                        <view class="step-cicrle finish">
                            <view class="step-cicrle-inner"></view>
                        </view>
                        <view class="step-matter last-step-matter">
                            <!-- 药品有效期 -->
                            <view class="step-content">
                                <view class="step-content-item">
                                    <text class="step-label">{{ dtcProfile.deliveryTime ? dtcProfile.deliveryTime : '' }}</text>
                                    <text class="step-details">{{ dtcProfile.drugStoreName ? dtcProfile.drugStoreName : '' }}</text>
                                </view>
                                <view class="step-content-item">
                                    <text class="step-label">药品有效期至</text>
                                    <text class="step-details">{{ dtcProfile.expirationDate }}</text>
                                </view>
                            </view>
                            <!-- 药品有效期 END -->
                        </view>
                    </view>
                </view>
            </view>
            <!-- 追溯明细 END -->
        </view>
        <!-- profile END -->
    </view>
</template>

<script>
import customCollapse from '../../components/custom-collapse/index';
import customCollapseItem from '../../components/custom-collapse-item/index';
// pages/drug-ascend-detail/index.js
import Api from "../../apis/apis"
import * as util from '../../common/common';
export default {
    components: {
        customCollapse,
        customCollapseItem
    },
    data() {
        return {
            // 药品追溯码
            tcCode: '',
            dtcProfile: {
                drugGenericName: '',
                approvalNo: '',
                approvalValidDate: '',
                drugTradeName: '',
                cndc: '',
                drugStandardCode: '',
                dosageForm: '',
                strength: '',
                packageSize: '',
                pkgConversionRatio: '',
                shelfLife: '',
                unitOfShelfLife: '',
                domesticDrugMAHName: '',
                domesticDrugMAHUSCID: '',
                domesticDrugManufacturerName: '',
                domesticDrugManufacturerUSCID: '',
                productionDate: '',
                batch: '',
                deliveryTime: false,
                drugStoreName: false,
                expirationDate: ''
            }
        };
    },
    onLoad(options) {
        let { dtcProfile } = options;
        this.setData({
            dtcProfile: JSON.parse(decodeURIComponent(dtcProfile))
        });
    },
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
