import rules from '../common/rules';
/**
 * @description
 * 表单校验器，实现基本的非空以及常见校验，
 * 可配置和自定义校验（只实现简单校验逻辑，未完善）
 */

export default class Schema {
    constructor(descriptor) {
        this.descriptor = descriptor;
    }
    /**
     * @description 验证方法
     * @param {object}  source 数据源
     * @param {function} cb 回调方法
     *
     * */
    validate(source, cb = () => {}) {
        // Schema.asyncValidate.call( this , source )
        this.asyncValidate(source)
            .then((res) => cb(res))
            .catch((err) => {
                cb(err);
            });
    }
    asyncValidate(data) {
        if (Object.prototype.toString(data) !== '[object Object]') {
            throw new Error('传入规则必需为对象');
        }
        let keys = Object.keys(data);
        let errors = [];
        return new Promise((resovle, reject) => {
            for (let key of keys) {
                const ruleList = this.descriptor[key];
                if (Object.prototype.toString.call(ruleList) !== '[object Array]' || !ruleList.length) {
                    continue;
                }
                // const val = data[key];
                for (let rule of ruleList) {
                    rule['data'] = data[key];
                    try {
                        this.handleRule(rule);
                    } catch (err) {
                        console.log('CatchClause', err);
                        console.log('CatchClause', err);
                        //TODO handle the exception
                        errors.push(err.toString());
                    }
                }
            }
            if (errors.length) {
                reject(errors);
            } else {
                resovle(null);
            }
        });
    }
    /**
     *  @description 规则校验器
     *  @param { Array } rule 	规则对象
     *
     * */
    handleRule(rule) {
        let deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField === 'object');
        if (!deep) {
            if (rule.required && rules.required(rule.data)) {
                throw rule.message;
            }
            if (rule.type && rules.types[rule.type](rule.data)) {
                throw rule.message;
            }
            if (rule.data && rule.validator) {
                if (rules.validator(rule.data, rule.validator)) {
                    throw rule.message;
                }
            }
            if ((rule.max || rule.min) && (!isNaN(rule.max) || !isNaN(rule.min))) {
                if (rule.max && rules.max(rule.data, rule.max)) {
                    throw rule.message;
                }
                if (rule.min && rules.min(rule.data, rule.min)) {
                    throw rule.message;
                }
            }
            if (rule.pattern && rules.pattern(rule.data, rule.pattern)) {
                throw rule.message;
            }
        } else {
            // .......
            // console.log(rule)
        }
    }
}
