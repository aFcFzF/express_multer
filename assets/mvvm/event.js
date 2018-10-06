/**
*@file: event.js
*@author: afcfzf (9301462@qq.com)
*/

export default class {
    constructor() {
        this._evts = {};
    }

    $on(name, fn) {
        Array.isArray(name)
        ? name.forEach(e => this.on(e, fn))
        : (this._evts[name] || (this._evts[name] = [])).push(fn);
        return this;
    }

    /**
     * 1. 清除全部事件
     * 2. 清除多个事件
     * 3. 清除单个事件
     *
     * @param {Array|string} name 要移除的事件
     * @param {Function=} fn 对应的触发事件
     * @return {Object} this 是挡圈Event的实例
    */
    $off(name, fn) {
        if (!arguments.length) {
            this._evts = Object.create(null);
            return this;
        }
        if (Array.isArray(name)) {
            return name.forEach(e => this.off(e, fn));
        }

        const cbs = this._evts[name];
        if (fn) {
            const cbs = this._evts[name];
            if (!cbs) {
                return false;
            }
            let idx = cbs.indexOf(fn);
            while (idx > -1) {
                cbs.splice(idx, 1);
                idx = cbs.indexOf(fn);
            }
            return this;
        }
        while (cbs.length > 0) {
            cbs.pop();
        }
        this._evts[name] && (this._evts[name] = null);
        return this;
    }

    $once(name, fn) {
        const self = this;
        const tmp = function () {
            self.off(name, fn);
            fn();
        };
        self.on(name, tmp);
        return self;
    }

    $emit(name, ...args) {
        const queue = this._evts[name];
        queue && queue.forEach(e => e.apply(this, args));
        return this;
    }
}
