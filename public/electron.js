// import { app, BrowserWindow } from 'electron';
// require('electron').ipcRenderer.on('ping', (event, message) => {
//     console.log(message) // Prints 'whoooooooh!'
// });

const remote = require('electron').remote;
const app = remote.app;
console.log('electron userData', app.getPath('userData'));

const Store = require('electron-store');
const store = new Store();

console.log('electron autoReload', store.get('autoReload'));
store.set('autoReload', true);
console.log('electron autoReload', store.get('autoReload'));

// Use dot-notation to access nested properties
// store.set('foo.bar', true);
// console.log(store.get('foo'));
//=> {bar: true}

// store.delete('unicorn');
// console.log(store.get('unicorn'));
//=> undefined


// console.log('eee', sessionStorage.getItem('autoReload'));
