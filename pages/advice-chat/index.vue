<template>
    <view class="container">
        <view class="advice-chat-wrapper">
            <!-- 聊天记录 -->
            <scroll-view
                class="chat-record"
                :scroll-y="true"
                :style="'height:calc( 100% - ' + (keyboardHeight + panelHeight) + 'px );'"
                :scroll-into-view="'chat_' + newMessage"
                @scrolltolower="handldeLoadHistory"
                :scroll-top="scrollTop"
                scroll-anchoring
            >
                <view class="chat-history-list" @touchstart="handleMove">
                    <block v-for="(item, index) in chatHistoryList" :key="index">
                        <view class="chat-history-list-item" :id="'chat_' + index">
                            <!-- 发送时间 -->
                            <view class="chat-send-time" v-if="item.sendTime">
                                <text>{{ format.timeFormat(item.sendTime, true) }}</text>
                            </view>
                            <!-- 发送时间 END -->

                            <view :class="'chat-message-wrapper ' + (item.launchType === 1 ? 'myself' : 'other')">
                                <!-- 消息关联用户 -->
                                <view class="user-info">
                                    <block v-if="item.launchType === 0">
                                        <view class="user-avatar">
                                            <image mode="aspectFill" :src="item.faceImage"></image>
                                        </view>
                                        <text class="user-name">{{ item.pharmacistName }}</text>
                                    </block>
                                    <block v-else>
                                        <view class="user-avatar">
                                            <open-data class="" type="userAvatarUrl"></open-data>
                                            <text class="user-name">
                                                <open-data class="" type="userNickName"></open-data>
                                            </text>
                                        </view>
                                    </block>
                                </view>
                                <!-- 消息关联用户 END -->

                                <!-- 消息内容 -->
                                <block v-if="item.informationType === 0">
                                    <!-- 为文本时 -->
                                    <view class="review-info">{{ item.writtenWords }}</view>
                                </block>
                                <block v-if="item.informationType === 1">
                                    <!-- 为图片时 -->
                                    <view class="review-info">
                                        <image class="send-image-wrapper" :src="BASE_URL + item.picturePath" mode="aspectFill"></image>
                                    </view>
                                </block>
                                <!-- 消息内容 END -->

                                <block v-if="item.loading && item.launchType === 1">
                                    <view class="loading-wrapper">
                                        <view class="loading"></view>
                                    </view>
                                </block>
                                <block v-if="item.isError && item.launchType === 1">
                                    <icon class="icon-box-img" type="warn" size="35"></icon>
                                </block>
                            </view>
                        </view>
                    </block>
                </view>
            </scroll-view>
            <!-- 聊天记录 END -->

            <!-- 底部操作栏 -->
            <view class="chat-review-wrapper" :style="'height:' + (keyboardHeight + panelHeight) + 'px;'">
                <view class="chat-flex">
                    <view class="input-wrapper">
                        <input
                            type="text"
                            placeholder="输入问题 来问我吧......"
                            confirm-type="send"
                            :adjust-position="false"
                            hold-keyboard
                            @blur="handleBlur"
                            @focus="handleFocus"
                            confirm-hold
                            @confirm="handleSend"
                            v-model="writtenWords"
                            :value="writtenWords"
                            @keyboardheightchange="handleChangeHeight"
                        />
                    </view>
                    <view class="more-panel" @tap.stop.prevent="handlePanel">
                        <image mode="aspectFill" src="/static/images/chat/panel.png"></image>
                    </view>
                </view>
                <view class="panel-list">
                    <view class="panel-list-item" @tap.stop.prevent="handleSendUploadImage" data-upload-type="camera">
                        <view class="panel-list-iten-image">
                            <image mode="aspectFill" src="/static/images/chat/camera.png"></image>
                        </view>
                        <text class="">拍照</text>
                        <view class="bubble-holder"></view>
                    </view>
                    <view class="panel-list-item" @tap.stop.prevent="handleSendUploadImage" data-upload-type="album">
                        <view class="panel-list-iten-image">
                            <image mode="aspectFill" src="/static/images/chat/album.png"></image>
                        </view>
                        <text class="">相册</text>
                        <view class="bubble-holder"></view>
                    </view>
                </view>
            </view>
            <!-- 底部操作栏 END -->
        </view>
    </view>
</template>
<script module="format" lang="wxs" src="@/wxsFormat/format.wxs"></script>
<script>
import Api from "../../apis/apis"
import * as Tip from '../../common/common';
import { uploadImage, _debounce } from '../../utils/util';
import { BASE_URL } from '../../common/config';
let keyboard_height = 0;
const UPLOAD_COUNT = 1;
const UPLOAD_URL = '/sys/file/special-upload/consul';
const DEBOUNCE_DELAY = 1000;
export default {
    data() {
        return {
            BASE_URL,

            // 键盘高度
            keyboardHeight: 0,

            //操作面板显示
            isPanelShow: false,

            //操作面板高度
            panelHeight: 75,

            //聊天历史记录
            chatHistoryList: [],

            //输入框文字
            writtenWords: '',

            //最新一条消息
            newMessage: 0,

            scrollTop: 0,

            //页码器
            pagiNation: {
                pageNum: 1,
                pageSize: 10
            },

            //总条数
            total: 0,

            //咨询详情
            dosultDel: {},

            screenTop: 0
        };
    },
    onLoad(options) {
        let { dosultDel } = options;
        this.dosultDel = JSON.parse(decodeURIComponent(dosultDel));
        this.getChattingRecordsOfCosult();
    },
    methods: {
        handlePanel() {
            if (keyboard_height) {
                return uni.hideKeyboard({
                    success: (res) => {
                        this.setData({
                            isPanelShow: true,
                            panelHeight: 175
                        });
                    }
                });
            }
            this.setData({
                isPanelShow: true,
                panelHeight: 175
            });
        },

        handleMove(e) {
            if (keyboard_height) {
                uni.hideKeyboard();
            }
            this.setData({
                isPanelShow: false,
                panelHeight: 75
            });
        },

        handleChangeHeight(e) {
            keyboard_height = e.detail.height;
            this.setData({
                keyboardHeight: keyboard_height,
                panelHeight: 75
            });
        },

        handleFocus() {
            this.setData({
                scrollTop: 0
            });
        },

        //处理发送的新消息
        handleNewMessage(newMessage) {
            let { chatHistoryList, writtenWords } = this;
            writtenWords = '';
            const target = {
                ...newMessage,
                donsultId: createTempId(12)
            };
            this.setData({
                writtenWords,
                chatHistoryList: [target, ...chatHistoryList],
                screenTop: 0
            });
            return Promise.resolve(target.donsultId);

            /**
             * @description 创建临时ID
             */
            function createTempId(length) {
                var str = '0123456789abcdefghijklmnopqrstuvwxyz';
                var result = '';
                for (var i = length; i > 0; --i) {
                    result += str[Math.floor(Math.random() * str.length)];
                }
                return result;
            }
        },

        //发送图片
        async handleSendUploadImage(event) {
            const { uploadType } = event.currentTarget.dataset;
            try {
                const res = await uploadImage({
                    url: `${BASE_URL}${UPLOAD_URL}`,
                    count: UPLOAD_COUNT,
                    type: uploadType
                });
                const { fileId: picture, path: filePath } = JSON.parse(res.data).data;
                this.sendMessageOfConsult({
                    informationType: 1,
                    filePath,
                    picture
                });
            } catch (error) {
                Tip.Toast({
                    title: '选取图片失败'
                });
            }
        },

        //发送文字
        handleSend() {
            this.sendMessageOfConsult({
                informationType: 0
            });
        },

        /**
         * @description 发送
         * @param { Numebr } informationType 发送类型 0 为 文字 1 为 图片
         * @param { String } filePath 图片路径
         * @param { String } picture  图片Id
         *
         */
        async sendMessageOfConsult({ informationType, filePath = '', picture = '' } = {}) {
            const launchType = 1;
            let { writtenWords } = this;
            if (!writtenWords && informationType === 0) {
                return;
            }

            //获取临时ID用于查询已发送的消息
            const messageId = await this.handleNewMessage({
                writtenWords,
                loading: true,
                isError: false,
                launchType: 1,
                informationType,
                picturePath: filePath,
                userName: uni.getStorageSync('nickName')
            });
            const { id, citizenId, citizenName, pharmacistName, pharmacistUserId } = this.dosultDel;

            //获取已经发送的消息数据临时id
            const sign = this.chatHistoryList.findIndex((chat) => chat.donsultId === messageId);
            Api.sendMessageOfConsult({
                donsultId: id,
                informationType,
                launchType,
                writtenWords,
                citizenId,
                citizenName,
                filePath: filePath ? filePath : null,
                picture: picture ? picture : null,
                pharmacistId: pharmacistUserId,
                pharmacistName,
                userId: uni.getStorageSync('userId'),
                userName: uni.getStorageSync('nickName')
            })
                .then((res) => {
                    if (res.data.code === 200) {
                        this.setData({
                            [`chatHistoryList[${sign}].loading`]: false
                        });
                    } else {
                        this.setData({
                            [`chatHistoryList[${sign}].loading`]: false,
                            [`chatHistoryList[${sign}].isError`]: true
                        });
                    }
                })
                .catch((err) => {
                    this.setData({
                        [`chatHistoryList[${sign}].loading`]: false,
                        [`chatHistoryList[${sign}].isError`]: true
                    });
                });
        },

        //上滑加载历史聊天记录
        handldeLoadHistory: _debounce(
            function () {
                if (this.pagiNation.pageNum * this.pagiNation.pageSize < this.total) {
                    this.pagiNation.pageNum++;
                    this.getChattingRecordsOfCosult();
                } else {
                    // Tip.Toast({
                    //   title:'暂无更多历史信息'
                    // })
                }
            },
            DEBOUNCE_DELAY,
            800
        ),

        //获取咨询聊天记录
        getChattingRecordsOfCosult() {
            Tip.Loading();
            const { chatHistoryList } = this;
            const params = {
                ...this.pagiNation,
                donsultId: this.dosultDel.id
            };
            Api.getChattingRecordsOfCosult(params).then(async (res) => {
                Tip.HideLoading();
                const { records, total } = res.data.data;
                this.total = total;
                this.setData({
                    chatHistoryList: [...chatHistoryList, ...records]
                });
            });
        },

        handleBlur() {
            console.log('占位：函数 handleBlur 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
