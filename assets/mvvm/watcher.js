/**
* @file: watcher.js
* @author: afcfzf (9301462@qq.com)
*/

import {Dep} from './observer.js';

export default class Watcher {
    constructor(obj, getter, cb) {
        Object.assign(this, {
            obj,
            getter,
            cb,
            deps: []
        });
        this.val = this.get();
    }

    get() {
        Dep.target = this;
        const val = this.getter.call(this.obj);
        Dep.target = null;
        return val;
    }

    addDep(dep) {
        this.deps.push(dep);
    }

    teardown() {
        this.deps.forEach(dep => dep.remove(this));
    }

    update() {
        const [newVal, val] = [this.getter.call(this.obj), this.val];
        this.val = newVal;
        this.cb(newVal, val);
    }
}
