'use strict';

class About {
    constructor(selector) {
        this.rootDiv = document.querySelector(selector);
        this.bindModeButtons();
    }

    bindModeButtons() {
        let html = '';
        html += '<b>Chrome:</b> ' + global.process.versions.chrome + '<br>';
        html += '<b>Node:</b> ' + global.process.versions.node + '<br>';
        html += '<b>Electron:</b> ' + global.process.versions.electron + '<br>';
        html += '<b>window.devicePixelRatio:</b> ' + window.devicePixelRatio + '<br>';
        html += '<b>localStorage:</b> ' + ('localStorage' in window) + '<br>';
        html += '<b>sessionStorage:</b> ' + ('sessionStorage' in window) + '<br>';
        this.rootDiv.querySelector('.data').innerHTML = html;
        console.log('about', sessionStorage.getItem('autoReload'));
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.page-about')) {
        console.log(global.process);
        console.log(global.process.env);
        const about = new About('.page-about');
    }
});
