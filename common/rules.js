/**
 * @description 校验正则
 * */
const REG_EMOJI = /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]/g;
const REG_PHONE = /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/;
const REG_TELE_PHONE = /0\d{2,3}-\d{7,8}/;
const REG_EMAIL = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
const REG_ID_NUMBER = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
const REG_NUMBER = /^[1-9]+[0-9]*]*$/;

export default {
    data() {
        return {};
    },
    required(v) {
        v = v || '';
        return !v.toString().replace(/\s+ | [\r\n]/g, '');
    },
    types: {
        phone: (v) => !REG_PHONE.test(v),
        telephone: (v) => !REG_TELE_PHONE.test(v),
        emoji: (v) => !REG_EMOJI.test(v),
        email: (v) => !REG_EMAIL.test(v),
        ID: (v) => !REG_ID_NUMBER.test(v),
        number: (v) => !REG_NUMBER.test(v) && isNaN(v)
        // array : v => Object.prototype.toString.call( v ) !== '[object Array]',
        // object : v => Object.prototype.toString.call( v ) !== '[object Object]'
    },
    max(v, len) {
        if (typeof v === 'number') {
            return v > len;
        }
        if (typeof v === 'string' || Array.isArray(v)) {
            return v.length > len;
        }
    },
    min(v, len) {
        if (typeof v === 'number') {
            return v < len;
        }
        if (typeof v === 'string' || Array.isArray(v)) {
            return v.length < len;
        }
    },
    //自定义正则
    pattern(v, reg) {
        return !new RegExp(reg).test(v);
    },
    //自定义规则
    validator(v, cb) {
        if (v) {
            return !cb(v);
        }
    }
};
