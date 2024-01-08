/**
 * @description 气泡
 * @param {*}
 */
export const Toast = function ({ title, duration = 2000 } = {}) {
    return new Promise((resovle, reject) => {
        uni.showToast({
            title,
            icon: 'none',
            duration,
            mask: true,
            success: (res) => resovle(res),
            fail: (err) => reject(err)
        });
    });
};
/**
 * @description 对话框
 * @param {*}
 */
export const Dialog = function ({ title = '', content = '', showCancel = true } = {}) {
    return new Promise((resovle, reject) => {
        uni.showModal({
            title,
            content,
            showCancel,
            success: (res) => resovle(res),
            fail: (err) => reject(err)
        });
    });
};
export const Loading = function ({ title = '' } = {}) {
    return new Promise((resovle, reject) => {
        uni.showLoading({
            title,
            mask: true,
            success: (res) => resovle(res),
            fail: (err) => reject(err)
        });
    });
};
export const HideLoading = function () {
    return new Promise((resovle, reject) => {
        uni.hideLoading({
            success: (res) => resovle(res),
            fail: (err) => reject(err)
        });
    });
};
