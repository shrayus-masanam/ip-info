const {
    app,
    ipcMain,
    BrowserWindow,
    nativeTheme,
    shell,
} = require('electron');
const fetch = require("node-fetch")
const fs = require('fs');
const path = require('path');
let argv = process.argv

let ip_info;
(async function() {
    if (!argv[2] || argv[2].trim() == "") return app.quit();
    let req = await fetch("https://ipwho.is/" + argv[2].trim());
    ip_info = await req.json();
    if (!ip_info.success) {
        //console.log(ip_info);
        shell.openExternal("https://whatismyipaddress.com/ip/" + argv[2]).then(() => {
            app.quit();
        });
        //process.exit(1);
    }
    let cc = ip_info.country_code.toLowerCase();
    if (!fs.existsSync(path.join(__dirname, 'cache', `${cc}.svg`))) {
        const response = await fetch(`https://countryflagsapi.com/svg/${cc}`);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.createWriteStream(path.join(__dirname, 'cache', `${cc}.svg`)).write(buffer);
    }
})();


const createMainWindow = () => {
    nativeTheme.themeSource = 'dark' // force light mode titlebar
    var mainWindow;
        mainWindow = new BrowserWindow({
            width: 500, //521
            height: 365, //365
            show: false,
            backgroundColor: "#363737",
            webPreferences: {
                nodeIntegration: true,
                nodeIntegrationInSubFrames: true,
                devTools: true, //isDev
                contextIsolation: false,
                enableRemoteModule: true,
                preload: path.join(__dirname, "preload.js"),
            },
            closable: true,
            maximizable: false,
            resizable: false
        });
    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: Object.fromEntries(Object.entries(details.responseHeaders).filter(header => !/x-frame-options/i.test(header[0])))
        });
    });

    const startURL = `file://${path.join(__dirname, 'template.html')}`;

    mainWindow.loadURL(startURL);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('close', (e) => {
        app.exit();
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
        app.exit();
    });

    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        require('electron').shell.openExternal(url);
    });
};

ipcMain.handle('getIPInfo', () => {
    return ip_info;
});

app.whenReady().then(() => {
    createMainWindow();
    app.on('activate', () => {
        if (!BrowserWindow.getAllWindows().length) {
            createMainWindow();
        }
    });
});