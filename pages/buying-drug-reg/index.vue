<template>
    <view>
        <view class="buyingDrug-reg-wrapper">
            <!-- 背景占位 -->
            <view class="background-holder"></view>
            <!-- 背景占位 -->

            <form @submit="buyingRegister" v-if="isNotRegion">
                <view class="profile-cotent-wrapper">
                    <!-- 药品信息 -->
                    <view class="profile-info shadow-wrapper" v-for="(drug, drugIndex) in drugInfoGroups" :key="drugIndex">
                        <view class="profile-title-wrapper">
                            <view class="profile-title">药品信息</view>
                            <view class="profile-panel-button-group">
                                <text v-if="drug.id != -1" class="remove-button" @tap.stop.prevent="handleRemoveDrugInfo" :data-remove-id="drug.id">删除</text>
                                <text class="add-button" @tap.stop.prevent="handleAddDrugInfo">添加更多</text>
                            </view>
                        </view>

                        <!-- 新冠抗疫药品类别 -->

                        <view class="filed clear-border">
                            <text class="required">*</text>
                            <text class="label">药品类别</text>
                            <view class="filed-content">
                                <picker :range="drugType" range-key="epidemicSituationDrugCategoryName" @change="changeDrugType" :data-select-index="drugIndex">
                                    <view class="selected max-selected">
                                        <text>{{ drugType[drug.selectedDrug].epidemicSituationDrugCategoryName }}</text>
                                        <text class="iconfont icon-jiantou"></text>
                                    </view>
                                </picker>
                            </view>
                        </view>

                        <!-- 新冠抗疫药品类别 END -->

                        <!-- 药品名称 -->

                        <view class="filed clear-border">
                            <text class="required">*</text>
                            <text class="label">药品名称</text>
                            <view class="filed-content">
                                <view class="input-filed">
                                    <input
                                        type="text"
                                        data-prop="drugGenericName"
                                        :data-index="drugIndex"
                                        placeholder="请输入药品名称"
                                        @input="handleInputOfDrug"
                                        :value="drug.drugGenericName"
                                    />
                                    <!-- <text class="iconfont icon-saoma" catch:tap="handleScanCode" data-drug-index="{{ drugIndex }}"></text> -->
                                </view>
                            </view>
                        </view>

                        <!-- 药品名称 END -->

                        <!-- 购买数量 -->

                        <view class="filed clear-border">
                            <text class="required">*</text>
                            <text class="label">购买数量</text>
                            <view class="filed-content">
                                <view class="input-filed">
                                    <input type="number" data-prop="purchaseQuantity" :data-index="drugIndex" placeholder="输入购买数量" @input="handleInputOfDrug" />
                                </view>
                            </view>
                        </view>

                        <!-- 购买数量 END -->

                        <!-- 生产厂家 -->

                        <!-- <view class="filed clear-border">
                    <text class="label">生产厂家</text>
                    <view class="filed-content"></view>
                </view>               -->

                        <!-- 生产厂家 END -->

                        <!-- 批准文号 -->

                        <!-- <view class="filed clear-border">
                    <text class="label">批准文号</text>
                    <view class="filed-content"></view>
                </view>  -->

                        <!-- 批准文号 END -->

                        <!-- 药品类别 -->

                        <!-- <view class="filed clear-border">
                    <text class="label">药品类别</text>
                    <view class="filed-content"></view>
                </view>  -->

                        <!-- 药品类别 END -->
                    </view>
                    <!-- 药品信息 END -->

                    <!-- 购药者信息 -->
                    <view class="profile-info shadow-wrapper">
                        <view class="profile-title">购药者信息</view>
                        <!-- 姓名 -->
                        <view class="filed">
                            <text class="required">*</text>
                            <text class="label">购药者信息</text>
                            <view class="filed-content">
                                <input type="text" data-prop="name" placeholder="请输入姓名" @input="handleInput" :value="formList.name" />
                            </view>
                        </view>
                        <!-- 姓名 END -->

                        <!-- 年龄 -->
                        <view class="filed">
                            <text class="required">*</text>
                            <text class="label">年龄</text>
                            <view class="filed-content">
                                <input type="number" data-prop="age" placeholder="请输入年龄" @input="handleInput" :value="formList.age" />
                            </view>
                        </view>
                        <!-- 年龄 END -->

                        <!-- 身份证 -->
                        <view class="filed">
                            <text class="required">*</text>
                            <text class="label">身份证号</text>
                            <view class="filed-content">
                                <input type="idcard" data-prop="idNumber" placeholder="请输入身份证号" @input="handleInput" :value="formList.idNumber" />
                            </view>
                        </view>
                        <!-- 身份证 END -->

                        <!-- 症状 -->
                        <!-- <view class="filed">
                    <text class="label">症状</text>
                    <view class="filed-content">
                        <input type="idcard" placeholder="请输入症状" />
                    </view>
                </view>   -->
                        <!-- 症状 END -->

                        <!-- 手机号 -->
                        <view class="filed">
                            <text class="required">*</text>
                            <text class="label">联系电话</text>
                            <view class="filed-content">
                                <input type="number" data-prop="contactinformation" placeholder="请输入联系电话" @input="handleInput" :value="formList.contactinformation" />
                            </view>
                        </view>
                        <!-- 手机号 END -->

                        <!-- 紧急联系人 -->
                        <view class="filed">
                            <text class="label">紧急联系电话</text>
                            <view class="filed-content">
                                <input type="number" data-prop="emergencyContact" placeholder="可选填" @input="handleInput" :value="formList.emergencyContact" />
                            </view>
                        </view>
                        <!-- 紧急联系人 END -->

                        <!-- 购买数量 -->
                        <!-- <view class="filed">
                    <text class="label">购买数量</text>
                    <view class="filed-content">
                        <input type="number" placeholder="请输入购买数量" />
                    </view>
                </view>   -->
                        <!-- 购买数量 END -->

                        <!-- 请输入体温 -->
                        <view class="filed">
                            <text class="required">*</text>
                            <text class="label">体温</text>
                            <view class="filed-content">
                                <input :class="isDanger ? 'danger-style' : ''" type="digit" data-prop="temperature" placeholder="请输入体温" @input="handleInput" />
                            </view>
                        </view>
                        <!-- 请输入体温 END -->

                        <!-- 地址 -->
                        <view class="filed">
                            <text class="required">*</text>
                            <text class="label">住址</text>
                            <view class="filed-content">
                                <input type="text" data-prop="address" placeholder="请输入住址" @input="handleInput" :value="formList.address" />
                            </view>
                        </view>
                        <!-- 地址 END -->

                        <!-- 症状 -->
                        <view class="filed">
                            <text class="label">症状</text>
                            <view class="filed-content">
                                <input type="text" data-prop="symptom" placeholder="请填写症状" @input="handleInput" :value="formList.symptom" />
                            </view>
                        </view>
                        <!-- 症状 END -->

                        <!-- 备注 -->
                        <view class="filed">
                            <text class="label">备注</text>
                            <view class="filed-content">
                                <input type="text" data-prop="remarks" placeholder="请填写备注" @input="handleInput" :value="formList.remarks" />
                            </view>
                        </view>
                        <!-- 备注 END -->

                        <!-- 是否从疫区返回 -->
                        <view class="filed">
                            <text class="label">是否从疫区返回</text>
                            <view class="filed-content">
                                <picker :range="isAreaBack" range-key="title" @change="changeIsAreaBack">
                                    <view class="selected">
                                        <text>{{ isAreaBack[isAreaBackIndex].title }}</text>
                                        <text class="iconfont icon-jiantou"></text>
                                    </view>
                                </picker>
                            </view>
                        </view>
                        <!-- 是否从疫区返回 END -->

                        <!-- 是否从疫区返回 -->
                        <view class="filed">
                            <text class="label">是否与疫区返回人员或发热症状人员接触</text>
                            <view class="filed-content">
                                <picker :range="isAreaContact" range-key="title" @change="changeIsAreaContact">
                                    <view class="selected">
                                        <text>{{ isAreaContact[isAreaContactIndex].title }}</text>
                                        <text class="iconfont icon-jiantou"></text>
                                    </view>
                                </picker>
                            </view>
                        </view>
                        <!-- 是否从疫区返回 END -->
                    </view>
                    <!-- 购药者信息 END -->

                    <!-- 表单提交 -->
                    <view class="button-wrapper">
                        <button form-type="submit">提交</button>
                    </view>
                    <!-- 表单提交 END -->
                </view>
            </form>
            <view class="profile-cotent-wrapper" v-if="!isNotRegion">
                <view class="profile-info shadow-wrapper">
                    <view class="filed">
                        <text class="label">所在区域</text>
                        <view class="filed-content" @tap="handleTab">{{ regionHolder }}</view>
                    </view>
                </view>
                <view class="button-wrapper">
                    <button @tap="handleUpdate">提交</button>
                </view>
            </view>
        </view>

        <!-- picker -->
        <custom-popup position="bottom" :isShow="isShow" width="100%" height="500rpx">
            <custom-area-picker @comfirm="handleComfirm($event, { tagId: 'picker' })" @reset="handleReset($event, { tagId: 'picker' })" id="picker" />
        </custom-popup>
        <!-- picker END -->
    </view>
</template>

<script>
import customPopup from '../../components/custom-popup/index';
import customAreaPicker from '../../components/custom-area-picker/index';
import Schema from '../../utils/validator';
import { Toast, Loading, Dialog, HideLoading } from '../../common/common';
import { addRegister, getCOVID_19DrugTypeList, getLastRegInfo, getInfoByEnterprise, updateTownship, getDrugName, getRegion } from '../../apis/apis';
import { _debounce } from '../../utils/util';

//座机 REG_PHONE = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
const REG_TELE_PHONE = /^(1[3|4|5|6|7|8|9])\d{9}$|^0\d{2,3}-?\d{7,8}$/;
const //手机   ^1(3\d|4[5-8]|5[0-35-9]|6[567]|7[01345-8]|8\d|9[025-9])\d{8}$
    CODE = 'DRUG_COVID_19_DRUG_CATEGORY';
const DELAY = 1500;
const DANGER_LINE = 37.3;
const DURG_SIZE = 10;
let app = getApp().globalData;

//自定义校验规则
function isPhoneNumber(v) {
    return REG_TELE_PHONE.test(v.trim());
}

//生成uuid
function getuuid(length) {
    var str = '0123456789abcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = length; i > 0; --i) {
        result += str[Math.floor(Math.random() * str.length)];
    }
    return result;
}
export default {
    components: {
        customPopup,
        customAreaPicker
    },
    data() {
        return {
            //是否从疫区返回
            isAreaBack: [
                {
                    type: 2,
                    title: '否'
                },
                {
                    type: 1,
                    title: '是'
                }
            ],

            //是否与疫区返回人员或发热症状人员接触
            isAreaContact: [
                {
                    type: 2,
                    title: '否'
                },
                {
                    type: 1,
                    title: '是'
                }
            ],

            drugInfoGroups: [
                {
                    //当前选中药品类别
                    selectedDrug: 0,
                    //药品名称
                    drugGenericName: '',
                    //购买数量
                    purchaseQuantity: '',
                    epidemicSituationDrugCategory: 1,
                    epidemicSituationDrugCategoryName: '',
                    id: '-1',
                    //药品信息校验规则，一个药品信息对应一个校验规则（因为现在没时间实现formItem的封装）
                    rules: {
                        drugGenericName: [
                            {
                                required: true,
                                message: '请输入药品名称'
                            }
                        ],
                        purchaseQuantity: [
                            {
                                required: true,
                                message: '请输入购买数量'
                            },
                            {
                                type: 'number',
                                message: '购买数量必须为数字'
                            },
                            {
                                min: 1,
                                message: '购买数量不能为0'
                            }
                        ]
                    }
                }
            ],

            //新冠抗疫药品类别
            drugType: [],

            //校验规则
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入姓名'
                    }
                ],
                age: [
                    {
                        required: true,
                        message: '请输入年龄'
                    },
                    {
                        type: 'number',
                        message: '年龄必须为数字'
                    }
                ],
                idNumber: [
                    {
                        required: true,
                        message: '请输入身份证'
                    },
                    {
                        type: 'ID',
                        message: '请输入格式正确的身份证号码'
                    }
                ],
                contactinformation: [
                    {
                        required: true,
                        message: '请输入联系方式'
                    },
                    {
                        validator: isPhoneNumber,
                        message: '请输入正确的联系方式！'
                    }
                ],
                emergencyContact: [
                    {
                        validator: isPhoneNumber,
                        message: '请输入正确的联系方式！'
                    }
                ],
                temperature: [
                    {
                        required: true,
                        message: '请输入体温'
                    },
                    {
                        type: 'number',
                        message: '请输入正确体温'
                    },
                    {
                        max: 42,
                        min: 35,
                        message: '请输入正常范围内的体温'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '请输入地址'
                    }
                ]
            },

            //表单
            formList: {
                // // 药品商品名称
                // drugGenericName:'',
                // // 购买数量
                // purchaseQuantity:'',
                // 购药者信息
                name: '',
                // 年龄
                age: '',
                // 身份证
                idNumber: '',
                // 联系方式
                contactinformation: '',
                //紧急联系人
                emergencyContact: '',
                // 体温
                temperature: '',
                //住址
                address: '',
                // 是否与疫区返回人员或发热症状人员接触
                contactWithFebrilePersonnel: 2,
                // 药店id
                enterpriseId: app.enterpriseId || '',
                // 是否疫区返回
                epidemicAreaReturns: 2,
                //市民ID
                citizenUserId: '',
                //区域码信息
                regionCode: '',
                //症状
                symptom: '',
                //备注
                remarks: ''
            },

            selectedDrug: 0,
            isAreaContactIndex: 0,
            isAreaBackIndex: 0,
            isShow: false,
            regionHolder: '请选择当前药店所在区域',
            township: null,

            //区域信息码
            regionCode: '',

            //药店ID
            durgId: '',

            isNotRegion: true,

            //体温警告
            isDanger: false,

            drugId: '',
            drugIndex: 0,

            drug: {
                id: '',
                selectedDrug: '',
                drugGenericName: ''
            },

            epidemicSituationDrugCategoryName: '',
            title: ''
        };
    },
    onLoad(options) {
        let { enterpriseId } = options;
        this.setData(
            {
                ['formList.citizenUserId']: uni.getStorageSync('userId') || '',
                ['formList.enterpriseId']: app.enterpriseId || enterpriseId
            },
            () => {
                this.getInfoByEnterprise();
                this.getCOVID_19DrugTypeList();
                this.getLastRegInfo();
            }
        );
    },
    methods: {
        /* picker event */
        changeIsAreaBack(e) {
            this.setData({
                isAreaBackIndex: e.detail.value,
                ['formList.epidemicAreaReturns']: this.isAreaContact[e.detail.value].type
            });
        },

        /* picker event */
        changeIsAreaContact(e) {
            this.setData({
                isAreaContactIndex: e.detail.value,
                ['formList.contactWithFebrilePersonnel']: this.isAreaContact[e.detail.value].type
            });
        },

        /* picker event  */
        changeDrugType(e) {
            console.log(e);
            let { drugInfoGroups, drugType } = this;
            let sign = +e.detail.value;
            let { selectIndex } = e.target.dataset;
            drugInfoGroups[selectIndex].selectedDrug = sign;
            drugInfoGroups[selectIndex].epidemicSituationDrugCategory = drugType[sign].epidemicSituationDrugCategory;
            drugInfoGroups[selectIndex].epidemicSituationDrugCategoryName = drugType[sign].epidemicSituationDrugCategoryName;
            this.setData({
                drugInfoGroups
            });
        },

        /* inputEvent field bind */
        handleInput(e) {
            let { isDanger } = this;
            let formList = this.formList;
            let { value } = e.detail;
            let { prop } = e.currentTarget.dataset;
            // formList[ prop ] = prop === 'purchaseQuantity' ? +value : value;
            formList[prop] = prop === 'age' ? parseInt(value) : value;
            formList[prop] = prop === 'temperature' ? +value : value;

            //设置体温警戒样式
            if (prop === 'temperature') {
                if (value >= DANGER_LINE) {
                    isDanger = true;
                } else {
                    isDanger = false;
                }
            }
            console.log('formList', this.formList);
            this.setData({
                formList,
                isDanger
            });
        },

        handleInputOfDrug(e) {
            let { drugInfoGroups } = this;
            let { value } = e.detail;
            let { prop, index } = e.currentTarget.dataset;
            drugInfoGroups[index][prop] = prop === 'purchaseQuantity' ? +value : value;
            this.setData({
                drugInfoGroups
            });
        },

        /* hide & show popup */
        handleTab() {
            this.setData({
                isShow: true
            });
        },

        /* comFirm event */
        handleComfirm(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let { isShow, regionCode, regionHolder } = e.detail;
            console.log(e.detail);
            this.setData({
                isShow,
                ['formList.regionCode']: regionCode,
                regionCode,
                regionHolder
            });
        },

        /* reset event */
        handleReset(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            let { isShow, regionCode } = e.detail;
            this.setData({
                isShow,
                regionCode,
                ['formList.regionCode']: regionCode,
                regionHolder: '请选择当前药店所在区域'
            });
        },

        /* 更新药店区域信息 */
        handleUpdate() {
            let { regionCode, regionHolder, drugId } = this;
            if (regionHolder === '请选择当前药店所在区域') {
                return Toast({
                    title: '请完善药店区域信息'
                });
            }
            updateTownship({
                township: regionCode,
                id: drugId
            }).then((res) => {
                if (res.statusCode === 200) {
                    return this.setData({
                        township: regionCode,
                        ['formList.regionCode']: regionCode,
                        isNotRegion: true
                    });
                }
            });
        },

        /* 扫码获取药品详情 */
        handleScanCode(e) {
            // 获取当前扫码对应药品信息的临时ID
            let { drugIndex } = e.target.dataset;
            uni.scanCode({
                success: (res) => this.getDrugName(res.result, drugIndex)
            });
        },

        /* 添加购药登记药品信息 */
        handleAddDrugInfo() {
            let { drugInfoGroups, drugType } = this;
            let [frist] = drugType;
            let newTarget = {
                //当前选中药品类别
                selectedDrug: 0,
                //药品名称
                drugGenericName: '',
                //购买数量
                purchaseQuantity: '',
                //新冠药品类别
                epidemicSituationDrugCategory: frist.epidemicSituationDrugCategory,
                //新冠药品类别名称
                epidemicSituationDrugCategoryName: frist.epidemicSituationDrugCategoryName,
                //临时ID
                id: getuuid(32),
                //药品信息校验规则，一个药品信息对应一个校验规则（因为现在没时间实现formItem的封装）

                rules: {
                    drugGenericName: [
                        {
                            required: true,
                            message: '请输入药品名称'
                        }
                    ],
                    purchaseQuantity: [
                        {
                            required: true,
                            message: '请输入购买数量'
                        },
                        {
                            type: 'number',
                            message: '购买数量必须为数字'
                        }
                    ]
                }
            };
            this.setData({
                drugInfoGroups: [...drugInfoGroups, newTarget]
            });
        },

        /* 移除购药登记药品信息 */
        handleRemoveDrugInfo(e) {
            let { removeId } = e.target.dataset;
            if (removeId == -1) {
                return Toast({
                    title: '至少填写一项药品信息'
                });
            }
            let { drugInfoGroups } = this;
            Dialog({
                title: '提示',
                content: '确定要删除当前填写的药品信息吗？'
            }).then((res) => {
                //移除删除项
                if (res.confirm) {
                    const result = drugInfoGroups.filter((drug) => drug.id !== removeId);
                    this.setData({
                        drugInfoGroups: result
                    });
                }
            });
        },

        /**
         * @description 表单提交，提交防抖
         */
        buyingRegister: _debounce(
            function () {
                let { drugInfoGroups, formList } = this;
                console.log('drugInfogroups', drugInfoGroups);
                console.log('');
                //promise容器
                let promiseGroups = [];

                //将添加的药品信息列表处理为promise集合
                for (let drugInfoitem of drugInfoGroups) {
                    console.log('drugInfoitem', drugInfoitem);
                    promiseGroups.push(
                        new Promise((resolve, reject) => {
                            const validator = new Schema(drugInfoitem.rules);
                            validator.validate(drugInfoitem, (errors) => {
                                if (errors) {
                                    reject(errors);
                                } else {
                                    resolve();
                                }
                            });
                        })
                    );
                }

                // 个人信息
                const infomation = new Promise((resolve, reject) => {
                    const validator = new Schema(this.rules);
                    console.log('this.data.formList', this.formList);
                    validator.validate(this.formList, (errors) => {
                        if (errors) {
                            reject(errors);
                        } else {
                            resolve();
                        }
                    });
                });

                //通过promise校验集合
                Promise.all([...promiseGroups, infomation])
                    .then(async (res) => {
                        //购药登记药品数 超过10后提醒后进行购药登记
                        if (drugInfoGroups.some((drug) => drug.purchaseQuantity >= DURG_SIZE)) {
                            Dialog({
                                content: '请确认药品数无误，确定进行登记'
                            }).then((res) => {
                                if (res.confirm) {
                                    this.addRegister();
                                }
                            });
                        } else {
                            this.addRegister();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        Toast({
                            title: err[0]
                        });
                    });
            },
            1000,
            true
        ),

        /**
         * 购药登记
         */
        addRegister() {
            const { drugInfoGroups, formList } = this;
            // 接口请求
            let drugInfoList = drugInfoGroups.map((drug) => {
                return {
                    drugGenericName: drug.drugGenericName,
                    purchaseQuantity: drug.purchaseQuantity,
                    epidemicSituationDrugCategory: drug.epidemicSituationDrugCategory,
                    epidemicSituationDrugCategoryName: drug.epidemicSituationDrugCategoryName
                };
            });
            addRegister({
                ...formList,
                drugInfoList
            })
                .then((res) => {
                    if (res.data.code === 200) {
                        Toast({
                            title: '登记成功'
                        }).then(() =>
                            setTimeout(() => {
                                uni.navigateBack();
                            }, DELAY)
                        );
                    } else {
                        console.log(res.data.code);
                        Toast({
                            title: res.data.msg ? res.data.msg : '请求失败，后台正在修复'
                        });
                    }
                })
                .catch((err) => {
                    Toast({
                        title: '请求超时,登记失败'
                    });
                });
        },

        /* 根据扫码结果获取药品名称 */
        getDrugName(code, drugIndex) {
            let { drugType, selectedDrug, drugInfoGroups } = this;
            Loading({
                title: '查询中'
            });
            getDrugName(code).then((res) => {
                HideLoading();
                let { data: scanCodeRes, code } = res.data;
                if (code !== 200) {
                    return Toast({
                        title: '请求错误，获取药品信息失败'
                    });
                }
                if (!scanCodeRes) {
                    return Toast({
                        title: '没有查询到该药品的信息，请手动输入'
                    });
                }
                let { drugGenericName, covidAntiviralDrug, classificationOfCovidDrugsPlague, drugRegistrationClassficationName } = scanCodeRes;
                if (covidAntiviralDrug) {
                    let scancodeSelectIndex = drugType.findIndex((item) => item.epidemicSituationDrugCategory === classificationOfCovidDrugsPlague);
                    drugInfoGroups[drugIndex].selectedDrug = scancodeSelectIndex;
                    drugInfoGroups[drugIndex].epidemicSituationDrugCategory = classificationOfCovidDrugsPlague;
                    drugInfoGroups[drugIndex].epidemicSituationDrugCategoryName = drugRegistrationClassficationName;
                }
                drugInfoGroups[drugIndex].drugGenericName = drugGenericName;
                this.setData({
                    drugInfoGroups
                });
                // this.setData({
                //   ['formList.drugGenericName']:drugGenericName
                // })
            });
            console.log(this.drugInfoGroups);
        },

        /* 获取新冠抗疫药品类别 */
        getCOVID_19DrugTypeList() {
            console.log('getCOVID_19DrugTypeList');
            let curIndex = this.selectedDrug;
            let { drugInfoGroups, drugType } = this;
            getCOVID_19DrugTypeList({
                code: CODE
            }).then((res) => {
                let [frist] = drugInfoGroups;
                frist.epidemicSituationDrugCategory = res.data.data[frist.selectedDrug].code;
                frist.epidemicSituationDrugCategoryName = res.data.data[frist.selectedDrug].name;
                this.setData({
                    drugType: res.data.data.map((drug) => {
                        return {
                            epidemicSituationDrugCategory: drug.code,
                            epidemicSituationDrugCategoryName: drug.name
                        };
                    }),
                    drugInfoGroups
                });
            });
            console.log(this.drugInfoGroups);
        },

        /* 获取上一次用户填写的信息 */
        getLastRegInfo() {
            console.log('getLastRegInfo');
            getLastRegInfo({
                citizenUserId: this.formList.citizenUserId
            }).then((res) => {
                if (res.data.data) {
                    let { name, age, idNumber, contactinformation, address } = res.data.data;
                    let lastRegRecord = {
                        name,
                        age,
                        idNumber,
                        contactinformation,
                        address
                    };
                    this.setData({
                        formList: {
                            ...this.formList,
                            ...lastRegRecord
                        }
                    });
                }
            });
        },

        //根据企业ID获取 企业、药店信息
        async getInfoByEnterprise() {
            console.log('getInfoByEnterprise');
            let { isNotRegion } = this;
            let { enterpriseId } = this.formList;
            if (enterpriseId) {
                try {
                    let {
                        data: { data: drugStoreDel }
                    } = await getInfoByEnterprise({
                        enterpriseId
                    });
                    let { township, regionCode, id } = drugStoreDel;
                    uni.$global.topLevelRegionCode = regionCode;
                    let {
                        data: { data: areList }
                    } = await getRegion({
                        regionCode
                    });

                    //是否需要显示区域信息栏选择
                    if (!township) {
                        if (!regionCode || areList.length <= 0) {
                            isNotRegion = true;
                            //级别为乡镇时更新
                            if (regionCode) {
                                updateTownship({
                                    township: regionCode,
                                    id
                                }).then((res) => {
                                    if (res.statusCode === 200) {
                                        return this.setData({
                                            township: regionCode,
                                            ['formList.regionCode']: regionCode
                                        });
                                    }
                                });
                            }
                        } else {
                            isNotRegion = false;
                            this.zpSelectComponent('#picker').hanldeRegion(regionCode);
                        }
                    } else {
                        isNotRegion = true;
                    }
                    this.setData({
                        isNotRegion,
                        township,
                        drugId: id,
                        ['formList.regionCode']: township ? township : regionCode
                    });
                    console.log(this.formList);
                } catch (error) {
                    console.log('CatchClause', error);
                    console.log('CatchClause', error);
                    Toast({
                        title: '获取药店信息失败'
                    });
                }
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
