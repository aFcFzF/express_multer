/**
*@file: mvvm.js
*@author: afcfzf (9301462@qq.com)
*/
import {observer} from './observer.js';
import Watcher from './watcher.js';
import Emitter from './event.js';

export default class Vue extends Emitter {
    constructor(options) {
        super();
        this._init(options);
    }

    _init(options) {
        const vm = this;
        options.methods && Object.entries(options.methods).forEach(([k, v]) => vm[k] = v.bind(this));
        vm._data = options.data.call(vm);
        observer(vm._data);
        Object.keys(vm._data).keys().forEach(k => proxy(vm, '_data', k));
        Object.entries(options.watcher).forEach(([k, v]) => {
            new Watcher(vm, () => k.split('.').reduce((a, b) => a[b], vm), v);
        });
    }
}

export function proxy(target, sourceKey, key) {
    const sharedPrpertyDefinition = {
        enumerable: true,
        configurable: true,
        get() {
            return this[sourceKey][key]; // 此时this是target
        },
        set(val) {
            this[sourceKey][key] = val;
        }
    };
    Object.defineProperty(target, key, sharedPrpertyDefinition);
}
