export const handlerTokenTime = function () {
    let expiresIn = uni.getStorageSync('expires_in');
    if (!expiresIn) {
        return;
    }
    let long = parseInt(expiresIn); //token的有效秒数

    let current = parseInt(new Date().getTime() / 1000); //当前时间

    let tokenTime = uni.getStorageSync('tokenTime'); //过期时间

    console.log('tokenTime  - current', tokenTime - current - 86400); //剩余时间 提前一天

    let isClear = tokenTime - current - 86400 < 0; //提前一天过期

    if (isClear) {
        uni.clearStorageSync();
    }
};
export const saveLoginTime = function (expiresIn) {
    let s = parseInt(new Date().getTime() / 1000);
    let long = expiresIn;
    let tokenTime = s + long; //七天后的秒数

    //console.log('s', s, tokenTime)
    uni.setStorageSync('tokenTime', tokenTime);
};
