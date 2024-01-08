/**
 * @description
 * 请求封装
 * 配置请求以及相应拦截器
 * 以及根据注册状态进行的token无感刷新
 * 可配置有权限以及无权限的http请求（逻辑不完善，但可配置）
 *
 */
import * as util from '../common/common';
import { saveLoginTime } from '../common/permission';
const config = Symbol('config');
const requestBefore = Symbol('requestBefore');
const requestAfter = Symbol('requestAfter');
const DEFAULT_HEAD = {
    'content-type': 'application/x-www-form-urlencoded'
};
let temp_request = [];
let isReFresh = false;
export default class MyRequest {
    [config] = {
        baseURL: '',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET'
    };
    //拦截器
    interceptors = {
        request: (func) => {
            if (func) {
                MyRequest[requestBefore] = func;
            } else {
                MyRequest[requestBefore] = (request) => request;
            }
        },
        response: (func) => {
            if (func) {
                MyRequest[requestAfter] = func;
            } else {
                MyRequest[requestAfter] = (response) => response;
            }
        }
    };
    static [requestBefore](config) {
        return config;
    }
    static [requestAfter](response) {
        return response;
    }
    setConfig(func) {
        this[config] = func(this[config]);
    }

    // 空参过滤
    _filterParams(data) {
        if (!data || Object.keys(data).length === 0) {
            return {};
        }
        let filter = {};
        if (Object.prototype.toString.call(data) === '[object Object]') {
            for (let key in data) {
                if (data[key] !== undefined && data[key] !== null) {
                    filter[key] = data[key];
                }
            }
        }
        return filter;
    }
    reflesh() {
        // wx.removeStorageSync('access_token');
        // wx.removeStorageSync('expires_in');
        uni.clearStorageSync();
        isReFresh = true;
        let params = {
            client_id: '1',
            client_secret: '1',
            scope: 1,
            grant_type: 'wx_code'
        };
        uni.login({
            success: (res) => {
                console.log('token');
                this.post('/oauth/token', {
                    ...params,
                    code: res.code
                })
                    .then((res) => {
                        // 已注册 重新请求失效请求
                        if (res.data.userId) {
                            util.HideLoading();
                            uni.setStorageSync('openId', res.data.openid);
                            uni.setStorageSync('userId', res.data.userId);
                            uni.setStorageSync('access_token', res.data.access_token);
                            uni.setStorageSync('expires_in', res.data['expires_in']);
                            saveLoginTime(res.data['expires_in']);
                            temp_request.forEach((cb) => cb());
                            temp_request = [];
                            isReFresh = false;
                        } else {
                            //未注册

                            util.Toast({
                                title: '请先注册登录'
                            }).then((res) => {
                                temp_request = [];
                                isReFresh = false;
                            });
                        }
                    })
                    .catch((err) => {
                        util.Toast({
                            title: '请求失败'
                        }).then(() => {
                            isReFresh = false;
                            temp_request = [];
                        });
                    });
            }
        });
    }
    request(options = {}) {
        let optionsRecored = {};
        return new Promise((resolve, reject) => {
            // options.baseURL = options.baseURL || this[config].baseURL
            options.url = options.url.indexOf('http') === -1 ? this[config].baseURL + options.url : options.url;
            // options.url = this[config].baseURL + options.url
            options.data = this._filterParams(options.data);
            options.header = {
                ...this[config].header,
                ...options.header
            };
            options.method = options.method || this.config.method;

            //拦截options
            options = {
                ...options,
                ...MyRequest[requestBefore](options)
            };

            //记录失效请求信息
            optionsRecored = {
                ...options
            };
            delete options.isAuth;
            options.success = (res) => {
                switch (res.statusCode) {
                    case 200:
                        resolve(MyRequest[requestAfter](res));
                        // console.log( options.url , res )
                        break;

                    //授权过期
                    case 401:
                        // resolve( MyRequest[requestAfter](res) )
                        if (!isReFresh) {
                            util.Loading();
                            //刷新token
                            this.reflesh();
                        }
                        resolve(
                            new Promise((resolve) => {
                                temp_request.push(() => {
                                    resolve(this.request(optionsRecored));
                                });
                            })
                        );
                        break;
                    case 403:
                        util.Toast({
                            title: '异常错误,后台正在修复'
                        });
                        break;
                    case 500:
                        util.Toast({
                            title: '异常错误,后台正在修复'
                        });
                        break;
                    case 503:
                        util.Toast({
                            title: '异常错误,后台正在修复'
                        });
                        break;
                    default:
                        resolve(MyRequest[requestAfter](res));
                        break;
                }
            };
            options.fail = (err) => {
                util.Toast({
                    title: '异常错误'
                });
                reject(MyRequest[requestAfter](err));
            };

            //请求
            uni.request({
                ...options
            });
        });
    }
    /**
     * @description
     * get post put delete 方法参数
     *
     * @param { String } url 请求路径
     * @param { Any } data 携带请求参数
     * @param { Boolean } isAuth 接口请求是否需要权限
     * @param { Object } header 请求头配置
     * @param { Any } options 额外参数
     * @returns { Promise }
     */
    get(url, data, isAuth = false, header = DEFAULT_HEAD, options = {}) {
        options.url = url;
        options.data = data;
        options.method = 'GET';
        options.header = header;
        options.isAuth = isAuth;
        return this.request(options);
    }
    post(url, data, isAuth = false, header = DEFAULT_HEAD, options = {}) {
        options.url = url;
        options.data = data;
        options.method = 'POST';
        options.header = header;
        options.isAuth = isAuth;
        return this.request(options);
    }
    put(url, data, isAuth = false, header = DEFAULT_HEAD, options = {}) {
        options.url = url;
        options.data = data;
        options.method = 'PUT';
        options.header = header;
        options.isAuth = isAuth;
        return this.request(options);
    }
    delete(url, data, isAuth = false, header = DEFAULT_HEAD, options = {}) {
        options.url = url;
        options.data = data;
        options.method = 'DELETE';
        options.header = header;
        options.isAuth = isAuth;
        return this.request(options);
    }
}
