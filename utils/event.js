/**
 * @classdesc 事件发布订阅,跨页面通信构造器
 *
 * @method on
 * @description 事件绑定
 * @for EventEmitter
 * @param { String } event 事件绑定名称
 * @param { Function } fn  事件执行函数
 * @param { Any } ctx 事件对象传递值
 * @returns { void }
 *
 * @method emit
 * @description 事件触发
 * @for EventEmitter
 * @param { String } event 事件绑定名称
 * @returns { void }
 *
 * @method off
 * @description 事件卸载
 * @for EventEmitter
 * @param { String } event 事件绑定名称
 * @param { Function } fn 卸载时执行回调
 * @returns { void }
 *
 */
class EventEmitter {
    on(event, fn, ctx) {
        if (typeof fn !== 'function') {
            console.error('listener must be a function');
            return;
        }
        this._stores = this._stores || {};
        (this._stores[event] = this._stores[event] || []).push({
            cb: fn,
            ctx: ctx
        });
    }
    emit(event) {
        this._stores = this._stores || {};
        let store = this._stores[event];
        let args;
        if (store) {
            store = store.slice(0);
            args = [].slice.call(arguments, 1);
            args[0] = {
                eventCode: event,
                data: args[0]
            };
            for (let i = 0, len = store.length; i < len; i++) {
                store[i].cb.apply(store[i].ctx, args);
            }
        }
    }
    off(event, fn) {
        this._stores = this._stores || {};

        // all
        if (!arguments.length) {
            this._stores = {};
            return;
        }

        // specific event
        const store = this._stores[event];
        if (!store) {
            return;
        }

        // remove all handlers
        if (arguments.length === 1) {
            delete this._stores[event];
            return;
        }

        // remove specific handler
        let cb;
        for (let i = 0, len = store.length; i < len; i++) {
            cb = store[i].cb;
            if (cb === fn) {
                store.splice(i, 1);
                break;
            }
        }
        return;
    }
}
module.exports = EventEmitter;
