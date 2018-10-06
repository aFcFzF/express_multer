/**
*@file: observer.js
*@author: afcfzf (9301462@qq.com)
*/

export class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(watcher) {
        this.subs.push(watcher);
    }

    remove(watcher) {
        const idx = this.subs.indexOf(watcher);
        this.subs.splice(idx, 1);
    }

    notify() {
        this.subs.forEach(wat => wat.update());
    }
}

Dep.target = null;

const defineReactive = (o, k, v) => {
    const dep = new Dep();
    observer(v);
    Reflect.defineProperty(o, k, {
        configurable: false,
        enumerable: true,
        get() {
            if (Dep.target) {
                dep.addSub(Dep.target);
                Dep.target.addDep(dep);
            }
            return v;
        },
        set(newVal) {
            if (v !== newVal) {
                v = newVal;
                dep.notify();
            }
        }

    });
};


class Observer {
    constructor(val) {
        this.val = val;
        Array.isArray(val) ? this.observeArray(val) : this.walk(val);
        Reflect.defineProperty(val, '__ob__', {
            enumerable: false,
            value: this
        });
    }

    walk(val) {
        Object.entries(val).forEach(([k, v]) => defineReactive(val, k, v));
    }
}

export function observer(val) {
    if (typeof val !== 'object') {
        return null;
    }
    if (val.hasOwnProperty('__ob__') && val.__ob__ instanceof Observer) {
        return val.__ob__;
    }
    return new Observer(val);
}
