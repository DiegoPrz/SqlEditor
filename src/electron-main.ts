import { BrowserWindow } from 'electron';
import * as path from 'path';

export default class Main {
    private static application: Electron.App;
    private static browserWindow: typeof BrowserWindow;
    private static mainWindow: Electron.BrowserWindow;

    public static main(application: Electron.App, browserWindow: typeof BrowserWindow) {
        Main.browserWindow = browserWindow;
        Main.application = application;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onReady() {
        Main.mainWindow = new Main.browserWindow({
            height: 600,
            webPreferences: {
                nodeIntegration: true,
            },
            width: 800,
        });

        Main.mainWindow.loadFile(path.join(__dirname, '../index.html'));
        Main.mainWindow.on('closed', Main.onClosed);
    }

    private static onClosed() {
        Main.mainWindow = null;
    }
}
