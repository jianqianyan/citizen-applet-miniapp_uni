/**
 * @description 防抖
 * @param { funciton } 执行函数
 * @param { number } 延时时间 ms
 * @param { boolean } 首次是否执行
 */
export const _debounce = function (fn, time = 1000, triggleNow = false) {
    var timer = null;
    return function () {
        var that = this;
        var args = arguments; //n秒持续调用时清除定时器
        if (timer) {
            clearTimeout(timer);
        }
        //首次立即执行
        if (triggleNow) {
            //n秒内调用方法 timer为定时器ID
            var exec = !timer;
            //重新设置定时器
            timer = setTimeout(function () {
                timer = null;
            }, time);
            if (exec) {
                fn.apply(that, args);
            }
        } else {
            timer = setTimeout(function () {
                fn.apply(that, args);
                clearTimeout(timer);
            }, time);
        }
    };
};

/**
 * @description 图片上传
 *
 *
 */
export const uploadImage = function ({ url = '', count = 1, type } = {}) {
    //图片选择
    return new Promise((resolve, reject) => {
        try {
            uni.chooseImage({
                count,
                sourceType: [type],
                success: (res) => {
                    res.tempFiles.forEach(async (file) => {
                        resolve(await handleUpload(file.path));
                    });
                },
                fail: (err) => {
                    console.log(err);
                    reject(err);
                }
            });
        } catch (error) {
            console.log('CatchClause', error);
            console.log('CatchClause', error);
            reject(error);
        }
    });

    //图片上传
    function handleUpload(filePath) {
        return new Promise((resolve, reject) => {
            const upTask = uni.uploadFile({
                url,
                filePath,
                name: 'file',
                formData: {
                    access_token: uni.getStorageSync('access_token') || ''
                },
                success: (res) => resolve(res),
                fail: (err) => reject(err)
            });
        });
    }
};

export function generateRandomString() {  
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';  
  let result = '';  
  for (let i = 0; i < 11; i++) {  
      const randomIndex = Math.floor(Math.random() * chars.length);  
      result += chars[randomIndex];  
  }  
  return result;  
} 

// export const _observe = function (target = {}) {
//     if (Object.keys(target).length === 0) {
//         return
//     } else {
//         for (let [key, value] in Object.entries(target)) {
//             Object.defineProperty(target, key, {
//                 configurable: true,
//                 enumerable: true,
//                 get() {
//                     return value
//                 },
//                 set(newVal) {
//                     if (newValue === value) return
//                     isObject(newValue)
//                     value = newValue;
//                 }
//             })
//         }
//     }

//     function isObject(data) {
//         if (typeof data !== 'object' || data == null) return

//         return _observe(data)
//     }
// }
