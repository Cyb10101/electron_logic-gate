const {app, protocol, BrowserWindow, Menu} = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Remove Content-Security-Policy warning
//process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function isDevelopment() {
    return (global.process.env.APP_ENV && global.process.env.APP_ENV === 'dev');
}

function isWindows() {
    return (process.platform === 'win32'); // Even on 64 bit
}

function mainWindowMenu() {
    const mainMenuTemplate = [{
        label: 'File',
        submenu: [{
            label: 'Quit',
            accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click() {
                app.quit();
            }
        }
        ]
    }, {
        label: 'Development',
        submenu: [{
            label: 'Developer Tools',
            role: 'toggledevtools'
        }]
    }, {
        label: 'Dashboard',
        click() {
            mainWindow.loadURL('app://index.html');
        }
    }, {
        role: 'reload',
        accelerator: process.platform === 'darwin' ? '' : 'F5',
    }];

    // If mac, ad empty object to menu
    if (process.platform === 'darwin') {
        mainMenuTemplate.unshift({});
    }

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    if (isDevelopment()) {
        Menu.setApplicationMenu(mainMenu);
    } else {
        Menu.setApplicationMenu(null);
    }
}

function mainWindowCreate() {
    mainWindow = new BrowserWindow({
        width: 700 + (isDevelopment() ? 555 : 0), // + DevTools
        height: (isDevelopment() ? 600 : 262), // Menu + Window
        frame: true,
        autoHideMenuBar: false,
        resizable: true,
        useContentSize: true,
        icon: path.join(__dirname, 'assets/images/icons/round-corner/64x64.png'),
        webPreferences: {
            nodeIntegration: true
        }
    });

    let scheme = 'app';
    mainWindow.webContents.session.protocol.registerFileProtocol(scheme, (request, callback) => {
        const url = request.url.substr(scheme.length + 3);
        callback({path: path.normalize(`${__dirname}/public/${url}`)});
    }, (error) => {
        if (error) {
            console.error('Failed to register protocol');
        }
    });

    // @todo development test
    const {screen} = require('electron');
    console.log('ScaleFactor: ', screen.getPrimaryDisplay().scaleFactor);

    if (isDevelopment()) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL('app://index.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });
}


app.on('ready', () => {
    mainWindowMenu();
    mainWindowCreate();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
