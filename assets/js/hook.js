'use strict';

/*
import {Hook} from './hook.js';
Hook.register('quit', function (args) {
    console.log(args);
});
document.addEventListener('DOMContentLoaded', function () {
    Hook.call('quit', ['All Done']);
});
*/

class Hooks {
    constructor() {
        this.hooks = [];
    }

    register(name, callback) {
        if ('undefined' == typeof (this.hooks[name])) {
            this.hooks[name] = [];
        }
        this.hooks[name].push(callback);
    }

    call(name, args) {
        if (typeof (this.hooks[name]) !== 'undefined') {
            for (let i = 0; i < this.hooks[name].length; i++) {
                this.hooks[name][i](args);
            }
        }
    }
}

export const Hook = new Hooks();
