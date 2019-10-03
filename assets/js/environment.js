'use strict';

class Environment {
    constructor() {
        console.log('env', sessionStorage.getItem('autoReload'));
        if (!sessionStorage.getItem('autoReload')) {
            sessionStorage.setItem('autoReload', 'true');
        }
    }

    isProduction() {
        return global.process.env.APP_ENV || false;
    }

    isDevelopment() {
        return global.process.env.APP_ENV && global.process.env.APP_ENV === 'dev';
    }

    reloadSamePage(seconds = 30) {
        if (this.isDevelopment()) {
            let reloadPage = window.setInterval(function () {
                if (sessionStorage.getItem('autoReload') === 'true') {
                    document.location.reload();
                }
            }, 1000 * seconds);
        }
    }
}

// const environment = new Environment();
// environment.reloadSamePage(30);

const remote = require('electron').remote;
const app = remote.app;
console.log('env userData', app.getPath('userData'));
