<template>
    <view>
        <image mode="aspectFill" class="img-block" :src="BASE_URL + '/upload/about.png '" />
    </view>
</template>

<script>
import { BASE_URL } from '../../common/config';
export default {
    data() {
        return {
            BASE_URL: BASE_URL
        };
    },
    onLoad: function (options) {
        console.log('base url', BASE_URL);
    },
    methods: {}
};
</script>
<style>
@import './about.css';
</style>
