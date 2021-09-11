'use strict';

const {ipcRenderer} = require('electron');

class About {
    constructor() {
        this.writeInformation();
    }

    writeInformation() {
        let aboutInfo = document.querySelector('.about-information');
        if (aboutInfo) {
            ipcRenderer.invoke('config', ['userData']).then((userData) => {
                let html = '<h4>Information</h4>';
                html += '<table class="table table-striped">';
                html += '<thead><tr><th scope="col">Key</th><th scope="col">Value</th></tr></thead>';
                html += '<tbody>';
                html += '<tr><td>Node</td><td>' + global.process.versions.node + '</td></tr>';
                html += '<tr><td>Electron</td><td>' + global.process.versions.electron + '</td></tr>';
                html += '<tr><td>Chrome</td><td>' + global.process.versions.chrome + '</td></tr>';
                html += '<tr><td>User data</td><td>' + userData + '</td></tr>';
                html += '</tbody>';
                html += '</table>';

                let div = document.createElement('div');
                div.innerHTML = html;
                aboutInfo.appendChild(div);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const about = new About();
});
